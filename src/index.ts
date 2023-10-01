export interface Options {
  /**
   * The average number of words per minute.
   * @default 200
   */
  wordsPerMinute?: number

  /**
   * A function that determines if a character is a word.
   */
  isWord: WordFN

  /**
   * The locale to use for the word count.
   * @default "en"
   */
  locale: Locale
}

export type Locale = "en" | "da" | "de" | "es" | "fr" | "it" | "nl" | "no" | "pt" | "ru" | "sv" | "zh";

export type WordFN = (char: string) => boolean;

export interface ReadTimeResult {
  /**
   * The estimated time to read the text.
   */
  minutes: number

  /**
   * The unformatted estimated time to read the text.
   */
  rawMinutes: number

  /**
   * The amount of words in the text.
   */
  words: number
}

function DEFAULT_WORD_FN(char: Parameters<WordFN>[0]): ReturnType<WordFN> {
  return " \n\r\t".includes(char);
}

export function getWords(text: string, options?: Options): number {
  const words = 0;
  return words;
}

export function readTime(text: string, options?: Options): ReadTimeResult {
  const words = getWords(text);
  const minutes = words / (options?.wordsPerMinute || 200);
  return {
    minutes: Math.ceil(Number.parseFloat(minutes.toFixed(2))),
    rawMinutes: minutes,
    words,
  };
}

export const readingTime = readTime;
export const lesetid = readTime;
