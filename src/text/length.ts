/**
 * Visual-character-accurate length. Native `.length` counts UTF-16 code
 * units, which over-counts emoji and other supplementary-plane characters
 * (e.g. `"😀".length === 2`). Uses `Intl.Segmenter` (grapheme granularity)
 * when available, falling back to Unicode code-point counting otherwise —
 * still more accurate than native `.length` on older runtimes.
 */
export function stringLength(input: string): number {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return [...segmenter.segment(input)].length;
  }
  return [...input].length;
}

/**
 * UTF-8 byte length — useful for storage/column-size limits, distinct from
 * `stringLength` (visual character count). A single emoji is 1 character
 * but up to 4 bytes.
 */
export function byteLength(input: string): number {
  return new TextEncoder().encode(input).length;
}
