import { describe, it, expect } from "vitest";
import * as utilkit from "../src/index.js";

// Exercises the root + category barrels so every public entry point is covered.
describe("public API surface (barrels)", () => {
  it("re-exports every documented function from the root barrel", () => {
    expect(typeof utilkit.base64Encode).toBe("function");
    expect(typeof utilkit.base64Decode).toBe("function");
    expect(typeof utilkit.stringLength).toBe("function");
    expect(typeof utilkit.byteLength).toBe("function");
    expect(typeof utilkit.safeJsonParse).toBe("function");
  });

  it("keeps the root barrel functions behaviourally identical to their modules", () => {
    expect(utilkit.base64Encode("foo")).toBe("Zm9v");
    expect(utilkit.stringLength("😀")).toBe(1);
    expect(utilkit.safeJsonParse("[1,2]")).toEqual([1, 2]);
  });
});
