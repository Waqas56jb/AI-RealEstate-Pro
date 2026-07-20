/**
 * Tiny classname joiner. Filters out falsy values so conditional classes
 * can be written inline without ternary noise.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
