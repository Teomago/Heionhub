const VIDEO_MIME_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
  'video/x-msvideo',
]
const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
  'image/tiff',
  'image/bmp',
]
const AUDIO_MIME_TYPES = [
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
  'audio/webm',
  'audio/aac',
  'audio/flac',
]
const DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
]

/** Check if a MIME type is a video */
export const isVideo = (mimeType?: string | null): boolean =>
  Boolean(mimeType && VIDEO_MIME_TYPES.includes(mimeType))

/** Check if a MIME type is an image */
export const isImage = (mimeType?: string | null): boolean =>
  Boolean(mimeType && IMAGE_MIME_TYPES.includes(mimeType))

/** Check if a MIME type is audio */
export const isAudio = (mimeType?: string | null): boolean =>
  Boolean(mimeType && AUDIO_MIME_TYPES.includes(mimeType))

/** Check if a MIME type is a document */
export const isDocument = (mimeType?: string | null): boolean =>
  Boolean(mimeType && DOCUMENT_MIME_TYPES.includes(mimeType))

/**
 * Format file size in human-readable format.
 *
 * @example formatFileSize(1024) // '1 KB'
 * @example formatFileSize(1048576) // '1 MB'
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`
}

/**
 * Get file extension from filename or URL.
 *
 * @example getFileExtension('photo.jpg') // 'jpg'
 * @example getFileExtension('archive.tar.gz') // 'gz'
 */
export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop()! : ''
}
