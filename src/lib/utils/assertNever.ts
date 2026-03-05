/**
 * Exhaustive switch helper.
 * TypeScript will error at compile time if a switch/case doesn't cover all union members.
 *
 * @example
 * ```ts
 * type Color = 'red' | 'blue'
 * switch (color) {
 *   case 'red': return '#f00'
 *   case 'blue': return '#00f'
 *   default: return assertNever(color) // compile error if 'green' is added
 * }
 * ```
 */
export const assertNever = (x: never): never => {
  throw new Error(`Unexpected value: ${x}`)
}
