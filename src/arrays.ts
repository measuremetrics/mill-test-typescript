/**
 * Split an array into chunks of the given size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) throw new Error("Chunk size must be positive");
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Return unique elements from an array, preserving order.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Group array elements by a key function.
 */
export function groupBy<T>(
  arr: T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

/**
 * Flatten nested arrays to the specified depth.
 */
export function flatten<T>(arr: unknown[], depth: number = 1): T[] {
  if (depth <= 0) return arr as T[];
  return arr.reduce<T[]>((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flatten<T>(item, depth - 1));
    } else {
      acc.push(item as T);
    }
    return acc;
  }, []);
}

/**
 * Return a new array with elements in random order (Fisher-Yates shuffle).
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
