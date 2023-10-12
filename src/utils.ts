import type { WordFN } from "./types";

function isCharCodeIntersected(code: number, start: number, end: number) {
  return code >= start && code <= end;
}

export const CJK_CODE_RANGES = [
  [0x3040, 0x309F],
  // CJK Unified ideographs
  [0x4E00, 0x9FFF],
  // Hangul
  [0xAC00, 0xD7A3],
  // CJK extensions
  [0x20000, 0x2EBE0],
];

export const isCJK: WordFN = (c) => {
  if (!c) return false;
  const charCode = c.charCodeAt(0);

  for (const [start, end] of CJK_CODE_RANGES) {
    if (!start || !end) return false;
    if (isCharCodeIntersected(charCode, start, end)) {
      return true;
    }
  }

  return false;
};

export const PUNCTATION_CODE_RANGES = [
  [0x21, 0x2F],
  [0x3A, 0x40],
  [0x5B, 0x60],
  [0x7B, 0x7E],
  // CJK Symbols and Punctuation
  [0x3000, 0x303F],
  // Full-width ASCII punctuation variants
  [0xFF00, 0xFFEF],
];

export const isPunctuation: WordFN = (c) => {
  if (!c) return false;
  const charCode = c.charCodeAt(0);

  for (const [start, end] of PUNCTATION_CODE_RANGES) {
    if (!start || !end) return false;
    if (isCharCodeIntersected(charCode, start, end)) {
      return true;
    }
  }

  return false;
};

export const isAnsi: WordFN = (c) => {
  if (!c) return false;
  return " \n\r\t".includes(c);
};
