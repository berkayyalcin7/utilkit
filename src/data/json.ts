/**
 * `JSON.parse` wrapped in try/catch. Returns `fallback` (or `null` if no
 * fallback is given) on invalid input instead of throwing, so callers never
 * need their own try/catch for the common "might not be JSON" case.
 */
export function safeJsonParse<T = unknown>(input: string, fallback?: T): T | null {
  try {
    return JSON.parse(input) as T;
  } catch {
    return fallback ?? null;
  }
}
