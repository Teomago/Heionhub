/**
 * Curated list of popular Google Fonts for the typography selector.
 * These are loaded dynamically via the Google Fonts CSS API in the frontend layout.
 */
export const GOOGLE_FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Raleway',
  'Nunito',
  'Playfair Display',
  'Merriweather',
  'Source Sans 3',
  'PT Sans',
  'Noto Sans',
  'Ubuntu',
  'Rubik',
  'Work Sans',
  'DM Sans',
  'Libre Baskerville',
  'Crimson Text',
  'IBM Plex Sans',
  'IBM Plex Serif',
  'IBM Plex Mono',
  'Fira Sans',
  'Outfit',
  'Space Grotesk',
  'Manrope',
  'Plus Jakarta Sans',
  'Geist',
  'Geist Mono',
  'JetBrains Mono',
] as const

export type GoogleFont = (typeof GOOGLE_FONTS)[number]

/** Select options for Payload admin panel */
export const GOOGLE_FONT_OPTIONS = GOOGLE_FONTS.map((font) => ({
  label: font,
  value: font,
}))

/**
 * Convert a font name to its Google Fonts CSS URL parameter format.
 * e.g. "Plus Jakarta Sans" → "Plus+Jakarta+Sans"
 */
export function toGoogleFontsParam(font: string): string {
  return font.replace(/ /g, '+')
}

/**
 * Generate a Google Fonts CSS import URL for the given fonts.
 * Includes display=swap for performance.
 */
export function getGoogleFontsUrl(fonts: string[]): string {
  const uniqueFonts = [...new Set(fonts.filter(Boolean))]
  if (uniqueFonts.length === 0) return ''

  const families = uniqueFonts
    .map((font) => `family=${toGoogleFontsParam(font)}:wght@300;400;500;600;700`)
    .join('&')

  return `https://fonts.googleapis.com/css2?${families}&display=swap`
}
