/**
 * Responsive breakpoint system for component props.
 *
 * Allows components to accept values that change at different breakpoints.
 * Used with Tailwind CSS responsive prefixes.
 */

/** Available responsive breakpoints matching Tailwind defaults */
export type ResponsiveBreakpoint = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/** A value that can vary by breakpoint */
export type ResponsiveValue<T> = T | Partial<Record<ResponsiveBreakpoint, T>>

/** Tailwind prefix map for each breakpoint */
const BREAKPOINT_PREFIX: Record<ResponsiveBreakpoint, string> = {
  base: '',
  xs: 'xs:',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
}

/**
 * Get the base (non-responsive) value from a responsive value.
 * If the value is a plain value, returns it directly.
 * If it's a breakpoint map, returns the 'base' key.
 *
 * @example
 * getBaseValue('red') // 'red'
 * getBaseValue({ base: 'red', md: 'blue' }) // 'red'
 * getBaseValue({ md: 'blue' }) // undefined
 */
export function getBaseValue<T>(value: ResponsiveValue<T>): T | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return value as T
  }

  return (value as Partial<Record<ResponsiveBreakpoint, T>>).base
}

/**
 * Generate responsive Tailwind classes from a breakpoint→class mapping function.
 *
 * @example
 * ```ts
 * const value: ResponsiveValue<'sm' | 'lg'> = { base: 'sm', md: 'lg' }
 * const classMap = { sm: 'text-sm', lg: 'text-lg' }
 * getResponsiveClasses(value, (v) => classMap[v])
 * // Returns: ['text-sm', 'md:text-lg']
 * ```
 */
export function getResponsiveClasses<T>(
  value: ResponsiveValue<T> | undefined | null,
  getClass: (v: T) => string | undefined,
): string[] {
  if (value === undefined || value === null) return []

  // Plain value — no responsive prefix
  if (typeof value !== 'object' || Array.isArray(value)) {
    const cls = getClass(value as T)
    return cls ? [cls] : []
  }

  const classes: string[] = []
  const breakpointMap = value as Partial<Record<ResponsiveBreakpoint, T>>

  for (const [breakpoint, v] of Object.entries(breakpointMap) as [ResponsiveBreakpoint, T][]) {
    if (v === undefined) continue
    const cls = getClass(v)
    if (!cls) continue

    const prefix = BREAKPOINT_PREFIX[breakpoint] || ''
    classes.push(`${prefix}${cls}`)
  }

  return classes
}
