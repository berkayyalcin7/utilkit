# utilkit

Zero-dependency devkit for everyday JavaScript/TypeScript utilities. Pure functions — works in React, Vue, Angular, Node, or plain browser scripts.

## Install

```bash
npm install utilkit
```

## Quick Start

```ts
import { base64Encode, base64Decode, stringLength, byteLength, safeJsonParse } from "utilkit";

base64Encode("Türkçe metin 🎉");        // Unicode-safe, unlike native btoa
base64Decode("not-valid-base64");        // null, never throws

stringLength("😀");                       // 1 (visual character)
"😀".length;                              // 2 (native — counts UTF-16 units, not visual chars)
byteLength("😀");                         // 4 (UTF-8 byte size)

safeJsonParse("not json");                // null, never throws
safeJsonParse("not json", { empty: true }); // { empty: true } — fallback value
```

You can also import from a specific category for smaller bundles:

```ts
import { base64Encode } from "utilkit/encoding";
import { stringLength } from "utilkit/text";
import { safeJsonParse } from "utilkit/data";
```

## API

| Function | Signature | Description |
|---|---|---|
| `base64Encode` | `(input: string) => string` | UTF-8-safe Base64 encode. |
| `base64Decode` | `(input: string) => string \| null` | Base64 decode; `null` on invalid input. |
| `stringLength` | `(input: string) => number` | Visual character (grapheme) count. |
| `byteLength` | `(input: string) => number` | UTF-8 byte length. |
| `safeJsonParse` | `<T>(input: string, fallback?: T) => T \| null` | `JSON.parse` that never throws. |

## Design Principles

- **Zero dependencies.**
- **100% test coverage.**
- **Tree-shakeable** — `"sideEffects": false`, ESM + CJS builds.
- **TypeScript-first.**
- **Null-safe on invalid input** — functions that can fail return `null` (or a caller-supplied fallback) instead of throwing.
- **MIT licensed.**

## Türkçe

`utilkit`, günlük JavaScript/TypeScript ihtiyaçları için sıfır bağımlılıklı bir devkit'tir: Unicode-güvenli Base64 kodlama, doğru string uzunluğu (karakter + byte) ve güvenli JSON ayrıştırma. Saf fonksiyonlardan oluşur — React, Vue, Angular veya Node fark etmeksizin her yerde çalışır. Kurulum ve API referansı için yukarıdaki İngilizce bölüme bakınız (fonksiyon imzaları evrenseldir).

## License

MIT © [Berkay Yalçın](https://berkayyalcin.dev)
