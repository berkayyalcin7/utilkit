const BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function bytesToBase64(bytes: Uint8Array): string {
  let result = "";
  let i = 0;

  for (; i + 2 < bytes.length; i += 3) {
    const chunk = (bytes[i]! << 16) | (bytes[i + 1]! << 8) | bytes[i + 2]!;
    result += BASE64_ALPHABET[(chunk >> 18) & 63];
    result += BASE64_ALPHABET[(chunk >> 12) & 63];
    result += BASE64_ALPHABET[(chunk >> 6) & 63];
    result += BASE64_ALPHABET[chunk & 63];
  }

  const remaining = bytes.length - i;
  if (remaining === 1) {
    const chunk = bytes[i]! << 16;
    result += BASE64_ALPHABET[(chunk >> 18) & 63];
    result += BASE64_ALPHABET[(chunk >> 12) & 63];
    result += "==";
  } else if (remaining === 2) {
    const chunk = (bytes[i]! << 16) | (bytes[i + 1]! << 8);
    result += BASE64_ALPHABET[(chunk >> 18) & 63];
    result += BASE64_ALPHABET[(chunk >> 12) & 63];
    result += BASE64_ALPHABET[(chunk >> 6) & 63];
    result += "=";
  }

  return result;
}

/**
 * UTF-8-safe Base64 encode. Unlike native `btoa`, this does not corrupt or
 * throw on non-Latin1 input (e.g. Turkish or emoji characters) and does not
 * depend on Node-only `Buffer`, so behavior is identical across runtimes.
 */
export function base64Encode(input: string): string {
  const bytes = new TextEncoder().encode(input);
  return bytesToBase64(bytes);
}

const BASE64_LOOKUP: Record<string, number> = Object.fromEntries(
  [...BASE64_ALPHABET].map((char, index) => [char, index])
);

function base64ToBytes(input: string): Uint8Array | null {
  if (input.length === 0) return new Uint8Array(0);
  if (input.length % 4 !== 0) return null;

  const clean = input.replace(/=+$/, "");

  const bytes: number[] = [];
  let buffer = 0;
  let bits = 0;

  for (const char of clean) {
    const value = BASE64_LOOKUP[char];
    if (value === undefined) return null;
    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }

  return new Uint8Array(bytes);
}

/**
 * Base64 decode. Does not throw on invalid Base64 input or on a decoded byte
 * sequence that isn't valid UTF-8 — returns `null` in both cases instead,
 * so callers never need to wrap this in try/catch.
 */
export function base64Decode(input: string): string | null {
  const bytes = base64ToBytes(input);
  if (bytes === null) return null;

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}
