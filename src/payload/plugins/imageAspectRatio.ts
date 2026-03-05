import type { CollectionBeforeOperationHook, FileData, Plugin, UploadCollectionSlug } from 'payload'

type AspectRatioValue = number | string

type AspectRatios = Record<string, AspectRatioValue>

type Collections = Partial<Record<UploadCollectionSlug, AspectRatios | true>>

interface ImageAspectRatiosPluginArgs {
  collections: Collections
  enable?: boolean
}

const normalizeAspectRatio = (value: AspectRatioValue): number => {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    // Handle ratio formats like "16:9", "4:3"
    if (value.includes(':')) {
      const [width, height] = value.split(':').map(Number)
      if (width && height) {
        return width / height
      }
    }

    // Handle fraction formats like "16/9", "3/4"
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/').map(Number)
      if (numerator && denominator) {
        return numerator / denominator
      }
    }

    // Handle direct number strings
    const parsed = parseFloat(value)
    if (!isNaN(parsed)) {
      return parsed
    }
  }

  throw new Error(`Invalid aspect ratio value: ${value}`)
}

type Dimensions = {
  height: number
  width: number
}

const createBeforeOperationHook = (config: AspectRatios | true) => {
  const beforeOperationHook: CollectionBeforeOperationHook = async ({
    req,
    args,
    collection,
    operation,
  }) => {
    if (operation == 'update' || operation == 'create') {
      let originalDimensions: Dimensions | undefined = undefined
      if (req.file) {
        // Skip processing for non-image files (videos, documents, etc.)
        if (!req.file.mimetype.startsWith('image')) {
          return args
        }

        const sharp = req.payload.config.sharp
        const metadata = await sharp(req.file.data).metadata()
        if (metadata.width && metadata.height) {
          originalDimensions = {
            width: metadata.width,
            height: metadata.height,
          }
        }
      } else {
        const duplicateFromID: string | number | undefined = (args as any).duplicateFromID
        if (duplicateFromID) {
          const data = await req.payload.findByID({
            collection: collection.slug as UploadCollectionSlug,
            id: duplicateFromID,
            select: {
              width: true,
              height: true,
            },
          })
          originalDimensions = {
            width: data.width!,
            height: data.height!,
          }
        } else {
          const data = args.data as FileData
          originalDimensions = {
            width: data.width,
            height: data.height,
          }
        }
      }
      if (originalDimensions) {
        const originalWidth = originalDimensions.width
        const originalHeight = originalDimensions.height
        const originalAspectRatio = originalWidth / originalHeight

        // Determine aspect ratios source
        const aspectRatios: Record<string, number> =
          config === true
            ? collection.admin?.custom?.aspectRatios || {}
            : Object.fromEntries(
                Object.entries(config).map(([key, value]) => [key, normalizeAspectRatio(value)]),
              )

        collection.upload.imageSizes = (collection.upload.imageSizes || []).map((size) => {
          if (size.name in aspectRatios) {
            const desiredAspectRatio = aspectRatios[size.name]!
            const dimensions =
              desiredAspectRatio > originalAspectRatio
                ? {
                    width: originalWidth,
                    height: Math.round(originalWidth / desiredAspectRatio),
                  }
                : {
                    width: Math.round(originalHeight * desiredAspectRatio),
                    height: originalHeight,
                  }
            return {
              ...size,
              ...dimensions,
            }
          }
          return size
        })
      }
    }

    return args
  }

  return beforeOperationHook
}

const imageAspectRatiosPlugin = ({
  collections,
  enable = true,
}: ImageAspectRatiosPluginArgs): Plugin => {
  return (config) => {
    if (!enable) {
      return config
    }
    const uploadCollections = collections
    const uploadCollectionSlugs = Object.keys(collections)
    config.collections = (config.collections || []).map((c) => {
      const slug = c.slug as UploadCollectionSlug
      if (uploadCollectionSlugs.includes(c.slug) && slug in uploadCollections) {
        const collectionConfig = uploadCollections[slug]!

        // Validate configuration conflicts
        if (collectionConfig !== true && c.admin?.custom?.aspectRatios) {
          throw new Error(
            `Collection "${slug}": Aspect ratios have been provided at the plugin initialization level. ` +
              `The admin.custom.aspectRatios configuration will be ignored. Please use either ` +
              `plugin-level configuration OR set collections.${slug} to true to use admin.custom.aspectRatios.`,
          )
        }

        return {
          ...c,
          hooks: {
            ...(c.hooks || {}),
            beforeOperation: [
              createBeforeOperationHook(collectionConfig),
              ...(c.hooks?.beforeOperation || []),
            ],
          },
        }
      } else {
        return c
      }
    })

    return config
  }
}

export const imageAspectRatio = imageAspectRatiosPlugin({
  enable: true,
  collections: {
    media: true,
  },
})
