import type { WordFN } from "./types"

function isCharCodeIntersected(code: number, start: number, end: number) {
  return code >= start && code <= end
}

export const CJK_CODE_RANGES = [
  [0x3040, 0x309F],
  // CJK Unified ideographs
  [0x4E00, 0x9FFF],
  // Hangul
  [0xAC00, 0xD7A3],
  // CJK extensions
  [0x20000, 0x2EBE0],
]

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
  if (!char) return false
  const charCode = char.charCodeAt(0)

  for (const [start, end] of CJK_CODE_RANGES) {
    if (!start || !end) return false
    if (isCharCodeIntersected(charCode, start, end)) {
      return true
    }
  }

  return false
}

export const PUNCTATION_CODE_RANGES = [
  [0x21, 0x2F],
  [0x3A, 0x40],
  [0x5B, 0x60],
  [0x7B, 0x7E],
  // CJK Symbols and Punctuation
  [0x3000, 0x303F],
  // Full-width ASCII punctuation variants
  [0xFF00, 0xFFEF],
]

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
  if (!char) return false
  const charCode = char.charCodeAt(0)

  for (const [start, end] of PUNCTATION_CODE_RANGES) {
    if (!start || !end) return false
    if (isCharCodeIntersected(charCode, start, end)) {
      return true
    }
  }

  return false
}

/**
 * Checks if a character is a ansi character.
 * @param {string | undefined} char - the character to check.
 * @returns {boolean} - true if the character is a word character, false otherwise.
 */
export const isAnsi: WordFN = (char?: string): boolean => {
  if (!char) return false
  return " \n\r\t".includes(char)
}
