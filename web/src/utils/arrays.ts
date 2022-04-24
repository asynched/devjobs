export function cloneMany<T>(source: T[], many: number): T[] {
  if (source.length === 0) {
    return []
  }

  if (many <= 0) {
    return []
  }

  let cloned = []
  let max = source.length
  let current = 0

  while (many--) {
    cloned.push(source[current++])

    if (current >= max) {
      current = 0
    }
  }

  return cloned
}
