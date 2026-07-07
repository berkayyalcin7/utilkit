import { describe, it, expect } from "vitest";
import { stringLength, byteLength } from "../../src/text/length.js";

describe("stringLength", () => {
  it("counts ASCII characters same as native .length", () => {
    expect(stringLength("hello")).toBe(5);
    expect("hello".length).toBe(5);
  });

  it("counts an empty string as 0", () => {
    expect(stringLength("")).toBe(0);
  });

  it("counts a single emoji as 1 visual character, unlike native .length", () => {
    expect(stringLength("😀")).toBe(1);
    expect("😀".length).toBe(2); // UTF-16 surrogate pair — this is the bug stringLength fixes
  });

  it("counts a ZWJ-joined family emoji as 1 grapheme", () => {
    expect(stringLength("👨‍👩‍👧‍👦")).toBe(1);
  });

  it("counts Turkish characters correctly", () => {
    expect(stringLength("çöğüşı")).toBe(6);
  });
});

describe("byteLength", () => {
  it("matches character count for pure ASCII", () => {
    expect(byteLength("hello")).toBe(5);
  });

  it("counts an empty string as 0", () => {
    expect(byteLength("")).toBe(0);
  });

  it("counts a 2-byte UTF-8 character correctly", () => {
    expect(byteLength("ğ")).toBe(2);
  });

  it("counts a 4-byte UTF-8 emoji correctly, differing from stringLength", () => {
    expect(byteLength("😀")).toBe(4);
    expect(stringLength("😀")).toBe(1);
  });
});

describe("stringLength fallback (no Intl.Segmenter)", () => {
  it("falls back to code-point counting when Intl.Segmenter is unavailable", () => {
    const original = Intl.Segmenter;
    // @ts-expect-error simulate an older runtime without Intl.Segmenter
    delete Intl.Segmenter;

    expect(stringLength("hello")).toBe(5);
    expect(stringLength("😀")).toBe(1); // single code point, still correct via Array.from

    // @ts-expect-error restore the property removed above
    Intl.Segmenter = original;
  });
});
