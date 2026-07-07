import { describe, it, expect } from "vitest";
import { base64Encode, base64Decode } from "../../src/encoding/base64.js";

// RFC 4648 §10 test vectors — known-correct, not implementation-derived.
describe("base64Encode", () => {
  it("encodes an empty string", () => {
    expect(base64Encode("")).toBe("");
  });

  it("encodes RFC 4648 test vectors", () => {
    expect(base64Encode("f")).toBe("Zg==");
    expect(base64Encode("fo")).toBe("Zm8=");
    expect(base64Encode("foo")).toBe("Zm9v");
    expect(base64Encode("foob")).toBe("Zm9vYg==");
    expect(base64Encode("fooba")).toBe("Zm9vYmE=");
    expect(base64Encode("foobar")).toBe("Zm9vYmFy");
  });
});

describe("base64Decode", () => {
  it("decodes an empty string", () => {
    expect(base64Decode("")).toBe("");
  });

  it("decodes RFC 4648 test vectors", () => {
    expect(base64Decode("Zg==")).toBe("f");
    expect(base64Decode("Zm8=")).toBe("fo");
    expect(base64Decode("Zm9v")).toBe("foo");
    expect(base64Decode("Zm9vYg==")).toBe("foob");
    expect(base64Decode("Zm9vYmE=")).toBe("fooba");
    expect(base64Decode("Zm9vYmFy")).toBe("foobar");
  });

  it("returns null for input whose length is not a multiple of 4", () => {
    expect(base64Decode("abc")).toBeNull();
  });

  it("returns null for input with invalid characters", () => {
    expect(base64Decode("not valid base64!!")).toBeNull();
  });

  it("returns null for an invalid character when length is a multiple of 4", () => {
    expect(base64Decode("ab@=")).toBeNull();
  });

  it("returns null when the decoded bytes are not valid UTF-8", () => {
    // "gA==" decodes to the single byte 0x80 — a lone continuation byte,
    // which is invalid UTF-8, so the fatal TextDecoder throws and we get null.
    expect(base64Decode("gA==")).toBeNull();
  });

  it("round-trips Turkish characters", () => {
    const input = "Türkçe İstanbul Boğazı'nda yürüyüş — ğüşıöç";
    expect(base64Decode(base64Encode(input))).toBe(input);
  });

  it("round-trips emoji", () => {
    const input = "Merhaba 😀 dünya 👨‍👩‍👧‍👦";
    expect(base64Decode(base64Encode(input))).toBe(input);
  });
});
