import type { CountResult, Estimation, Options, WordFN } from "./types";

import {
  CJK_CODE_RANGES,
  PUNCTATION_CODE_RANGES,
  isAnsi,
  isCJK,
  isPunctuation,
} from "./utils";

export {
  isAnsi,
  isCJK,
  isPunctuation,
  CJK_CODE_RANGES,
  PUNCTATION_CODE_RANGES,
};

export type { Options, WordFN, CountResult, Estimation };

export const DEFAULT_OPTIONS = {
  wordsPerMinute: 200,
  charsPerMinute: 500,
  isWord: isAnsi,
} satisfies Options;

/**
 * Counts the number of words and characters in the given text.
 *
 * @param {string?} text - the text to count words and characters in.
 * @param {Options} [options] - the options to use.
 * @returns {CountResult} the result of words and characters.
 */
export function count(
  text?: string,
  options: Options = DEFAULT_OPTIONS,
): CountResult {
  if (!text) {
    return { words: 0, chars: 0 };
  }

  let words = 0;
  let chars = 0;
  let start = 0;
  let end = text.length - 1;

  while (!isPunctuationOrWord(text[start], options.isWord || isAnsi)) {
    start++;
  }

  while (!isPunctuationOrWord(text[end], options.isWord || isAnsi)) {
    end--;
  }

  const normalizedText = `${text}\n`;

  for (let i = start; i <= end; i++) {
    const char = normalizedText[i];
    let nextChar = normalizedText[i + 1];

    if (isCJK(char)) {
      chars++;

      while (
        i <= end
        && !isPunctuationOrWord(nextChar, options.isWord || isAnsi)
      ) {
        i++;
        nextChar = normalizedText[i + 1];
      }
    } else if (
      isPunctuationOrWord(char, options.isWord || isAnsi)
      && (!isPunctuationOrWord(nextChar, options.isWord || isAnsi)
      || isCJK(nextChar))
    ) {
      words++;
    }
  }

  return { words, chars };
}

function isPunctuationOrWord(char: string = "", isWordFn: WordFN): boolean {
  return !char || !(isPunctuation(char) || isWordFn(char));
}

/**
 * Estimate a text's reading time.
 *
 * @param {string} text - the text to estimate.
 * @param {Options} [options] - the options to use.
 * @returns {Estimation} the estimation result.
 */
export function estimate(
  text?: string,
  options: Options = DEFAULT_OPTIONS,
): Estimation {
  if (!text) {
    return { minutes: 0, time: 0, words: 0, chars: 0, text: "0 min read" };
  }
  const { words, chars } = count(text);
  const { wordsPerMinute = 200, charsPerMinute = 500 } = options;
  const charMinutes = chars / charsPerMinute;
  const wordMinutes = words / wordsPerMinute;
  const totalMinutes = charMinutes + wordMinutes;
  const time = Math.round(totalMinutes * 60 * 1000);
  const displayed = Math.ceil(Number.parseFloat(totalMinutes.toFixed(2)));

  return {
    minutes: displayed,
    time,
    words,
    chars,
    text: `${displayed} min read`,
  };
}
