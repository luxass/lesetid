import type { Buffer } from "node:buffer";
import type { TransformCallback } from "node:stream";
import type { Options } from "./";
import { Transform } from "node:stream";
import { count, DEFAULT_OPTIONS } from "./";

/**
 * Creates a new reading time stream transform that calculates reading statistics.
 *
 * @param {Options} options - Configuration options for reading time calculation
 * @returns {ReadingTimeStream} A new ReadingTimeStream instance
 */
export function createReadingTimeStream(options: Options = DEFAULT_OPTIONS): ReadingTimeStream {
  return new ReadingTimeStream(options);
}

/**
 * A Transform stream that calculates reading time statistics from text data.
 *
 * This stream processes text chunks and accumulates word and character counts,
 * then outputs the final reading statistics when the stream ends.
 */
export class ReadingTimeStream extends Transform {
  private reading = {
    words: 0,
    chars: 0,
  };

  private options: Options;

  constructor(options: Options = DEFAULT_OPTIONS) {
    super({
      objectMode: true,
    });

    this.options = options;
  }

  _transform(
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: TransformCallback,
  ): void {
    const { words, chars } = count(chunk.toString(encoding), this.options);
    this.reading.words += words;
    this.reading.chars += chars;
    callback();
  }

  _flush(callback: TransformCallback): void {
    this.push(this.reading);
    callback();
  }
}
