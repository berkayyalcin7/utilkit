import { describe, it, expect } from "vitest";
import { safeJsonParse } from "../../src/data/json.js";

describe("safeJsonParse", () => {
  it("parses a valid JSON object", () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
  });

  it("parses a valid JSON array", () => {
    expect(safeJsonParse("[1,2,3]")).toEqual([1, 2, 3]);
  });

  it("parses a valid JSON primitive", () => {
    expect(safeJsonParse("42")).toBe(42);
  });

  it("returns null for invalid JSON with no fallback", () => {
    expect(safeJsonParse("not json")).toBeNull();
  });

  it("returns the fallback for invalid JSON when one is provided", () => {
    expect(safeJsonParse("not json", { empty: true })).toEqual({ empty: true });
  });

  it("returns null for an empty string", () => {
    expect(safeJsonParse("")).toBeNull();
  });

  it("infers the generic type parameter for valid input", () => {
    const result = safeJsonParse<{ a: number }>('{"a":1}');
    expect(result?.a).toBe(1);
  });
});
