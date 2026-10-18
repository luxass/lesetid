import type { WordFN } from "./types";

/**
 * Checks if a character code falls within a specified range (inclusive).
 *
 * @param {number} code - The character code to check.
 * @param {number} start - The start of the range (inclusive).
 * @param {number} end - The end of the range (inclusive).
 * @returns {boolean} - true if the character code is within the range, false otherwise.
 */
function isCharCodeIntersected(code: number, start: number, end: number): boolean {
  return code >= start && code <= end;
}

export const CJK_CODE_RANGES: [number, number][] = [
  [0x3040, 0x309f],
  // CJK Unified ideographs
  [0x4e00, 0x9fff],
  // Hangul
  [0xac00, 0xd7a3],
  // CJK extensions
  [0x20000, 0x2ebe0],
];

/**
 * Checks if a character is a CJK character.
 *
 * NOTE: That the ranges are maybe not complete.
 * You can see the full list of code ranges in `CJK_CODE_RANGES` export.
 *
 * @param {string | undefined} char - the character to check.
 * @returns {boolean} - true if the character is a CJK character, false otherwise.
 */
export const isCJK: WordFN = (char?: string): boolean => {
  if (!char) return false;
  const charCode = char.charCodeAt(0);

  for (const [start, end] of CJK_CODE_RANGES) {
    if (!start || !end) return false;
    if (isCharCodeIntersected(charCode, start, end)) {
      return true;
    }
  }

  return false;
};

export const PUNCTATION_CODE_RANGES: [number, number][] = [
  [0x21, 0x2f],
  [0x3a, 0x40],
  [0x5b, 0x60],
  [0x7b, 0x7e],
  // CJK Symbols and Punctuation
  [0x3000, 0x303f],
  // Full-width ASCII punctuation variants
  [0xff00, 0xffef],
];

/**
 * Checks if a character is a punctuation character.
 *
 * NOTE: That the ranges are maybe not complete.
 * You can see the full list of code ranges in `PUNCTATION_CODE_RANGES` export.
 *
 * @param {string | undefined} char - the character to check.
 * @returns {boolean} - true if the character is a punctuation character, false otherwise.
 */
export const isPunctuation: WordFN = (char?: string): boolean => {
  if (!char) return false;
  const charCode = char.charCodeAt(0);

  for (const [start, end] of PUNCTATION_CODE_RANGES) {
    if (!start || !end) return false;
    if (isCharCodeIntersected(charCode, start, end)) {
      return true;
    }
  }

  return false;
};

/**
 * Checks if a character is a ansi character.
 * @param {string | undefined} char - the character to check.
 * @returns {boolean} - true if the character is a word character, false otherwise.
 */
export const isAnsi: WordFN = (char?: string): boolean => {
  if (!char) return false;
  return " \n\r\t".includes(char);
};
