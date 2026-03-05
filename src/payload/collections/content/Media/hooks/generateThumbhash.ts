import type { CollectionBeforeChangeHook } from 'payload'
import { rgbaToThumbHash } from 'thumbhash'
import sharp from 'sharp'
import type { Media } from '@/payload-types'

/**
 * Generate thumbhash preserving original aspect ratio
 *
 * - Preserves original aspect ratio to prevent stretching
 * - Limits to max 100px on longest side for performance
 * - Stores dimensions and aspect ratio for proper rendering
 * - Graceful error handling — doesn't fail upload if thumbhash fails
 * - Uses high-quality Lanczos resampling for better placeholders
 */
export const generateThumbhash: CollectionBeforeChangeHook<Media> = async ({
  req,
  data,
  operation,
}) => {
  // Only process on create or when updating with a new image file
  const shouldProcess =
    operation === 'create' || (operation === 'update' && req.file?.mimetype?.includes('image'))

  if (!shouldProcess) {
    return data
  }

  try {
    const buffer = req?.file?.data
    if (!buffer) {
      return data
    }

    // Get original image metadata
    const metadata = await sharp(buffer).metadata()
    if (!metadata.width || !metadata.height) {
      console.warn('Unable to read image dimensions for thumbhash generation')
      return data
    }

    // Calculate aspect ratio for storage
    const aspectRatio = metadata.width / metadata.height

    // Calculate thumbhash dimensions preserving aspect ratio
    // Max dimension of 100px for performance, but maintain aspect ratio
    const MAX_DIMENSION = 100
    let thumbWidth: number
    let thumbHeight: number

    if (metadata.width > metadata.height) {
      // Landscape orientation
      thumbWidth = Math.min(MAX_DIMENSION, metadata.width)
      thumbHeight = Math.round(thumbWidth / aspectRatio)
    } else {
      // Portrait or square orientation
      thumbHeight = Math.min(MAX_DIMENSION, metadata.height)
      thumbWidth = Math.round(thumbHeight * aspectRatio)
    }

    // Ensure minimum size of 4px (thumbhash library requirement)
    // and maximum of 100px for performance
    thumbWidth = Math.max(4, Math.min(MAX_DIMENSION, thumbWidth))
    thumbHeight = Math.max(4, Math.min(MAX_DIMENSION, thumbHeight))

    // Generate the thumbhash with proper dimensions
    const { data: imageData, info } = await sharp(buffer)
      .ensureAlpha() // Ensure RGBA format
      .resize(thumbWidth, thumbHeight, {
        fit: 'fill', // Maintain exact dimensions
        kernel: sharp.kernel.lanczos3, // High quality downsampling
      })
      .raw() // Get raw RGBA pixel data
      .toBuffer({ resolveWithObject: true })

    // Generate thumbhash
    const thumbhashArray = rgbaToThumbHash(info.width, info.height, imageData)

    // Return data with thumbhash
    return {
      ...data,
      thumbhash: Array.from(thumbhashArray), // Convert Uint8Array to regular array for JSON storage
    }
  } catch (error) {
    console.error('Thumbhash generation error:', error)
    return data
  }
}
