import { Buffer } from "node:buffer";

export const ANSI_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789àâéèêôùûçÀÂÉÈÔÙÛÇ";
export const CJK_CHARACTERS = "안녕하세요こんにちは你好你好吗";

/**
 * Create volapyk text.
 * @param {string} chars The characters to use for the volapyk. Defaults to `preset:ansi`.
 * @param {number} length The amount of words/characters to generate.
 */
export function createVolapyk(chars: "preset:ansi" | "preset:cjk" | (string & {}) = "preset:ansi", length: number, useCharsAsText: boolean = false): string {
  if (useCharsAsText) {
    return chars;
  }
  let isCJKChars = false;
  if (chars === "preset:ansi") {
    chars = ANSI_CHARACTERS;
  } else if (chars === "preset:cjk") {
    chars = CJK_CHARACTERS;
    isCJKChars = true;
  }

  let text = "";

  if (isCJKChars) {
    const charsLength = chars.length;
    for (let i = 0; i < length; i++) {
      text += chars[Math.floor(Math.random() * charsLength)];
    }
    return text;
  }

  for (let i = 0; i < length; i++) {
    const wordLength = Math.ceil(Math.random() * 10);
    for (let j = 0; j < wordLength; j++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }
    text += " ";
  }

  return text;
}

export function createVolapykChunks(chars: "preset:ansi" | "preset:cjk" | (string & {}) = "preset:ansi", length: number, useCharsAsText: boolean = false): Buffer[] {
  if (useCharsAsText) return [Buffer.from(chars)];
  const chunks: string[] = [];
  let isCJKChars = false;
  if (chars === "preset:ansi") {
    chars = ANSI_CHARACTERS;
  } else if (chars === "preset:cjk") {
    chars = CJK_CHARACTERS;
    isCJKChars = true;
  }

  let chunk = "";

  if (isCJKChars) {
    const charsLength = chars.length;
    for (let i = 0; i < length; i++) {
      chunk += chars[Math.floor(Math.random() * charsLength)];
    }

    return [Buffer.from(chunk)];
  }

  for (let i = 0; i < length; i++) {
    const wordLength = Math.ceil(Math.random() * 10);
    for (let j = 0; j < wordLength; j++) {
      chunk += chars[Math.floor(Math.random() * chars.length)];
    }
    chunk += " ";

    if (i !== 0 && i % 10 === 0) {
      chunks.push(chunk);
      chunk = "";
    }
  }

  chunks.push(chunk);

  return chunks.map((chunk) => Buffer.from(chunk));
}
