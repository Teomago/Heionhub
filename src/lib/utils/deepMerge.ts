import { isObject } from './isObject'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Recursively merges two objects, including nested properties.
 * Replaces arrays instead of merging them.
 */
export function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T
export function deepMerge<T extends object, S extends object>(target: T, source: S): T & S
export function deepMerge<T extends object, S extends object>(target: T, source: S): T | (T & S) {
  const output = { ...target } as any

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key as keyof S]
      const targetValue = target[key as keyof T]

      if (sourceValue !== undefined) {
        if (Array.isArray(sourceValue)) {
          output[key] = sourceValue
        } else if (isObject(sourceValue)) {
          if (isObject(targetValue)) {
            output[key] = deepMerge(
              targetValue as Record<string, unknown>,
              sourceValue as Record<string, unknown>,
            )
          } else {
            output[key] = sourceValue
          }
        } else {
          output[key] = sourceValue
        }
      }
    })
  }

  return output
}
