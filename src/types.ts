export interface Options {
  /**
   * The average number of words per minute.
   * @default 200
   */
  wordsPerMinute?: number

  /**
   * The average number of characters per minute.
   * @default 500
   */
  charsPerMinute?: number

  /**
   * A function that determines if a character is a word.
   */
  isWord?: WordFN
}

export interface WordResult {
  words: number
  chars: number
}

export interface Estimation {
  /**
   * The estimated time to read the text.
   */
  minutes: number

  /**
   * The estimated time to read the text in milliseconds.
   */
  time: number

  /**
   * The amount of words in the text.
   */
  words: number

  /**
   * The amount of characters in the text.
   */
  chars: number

  /**
   * The formatted estimated time to read the text.
   * @example "1 min read"
   */
  text: string
}

export type WordFN = (char?: string) => boolean;
