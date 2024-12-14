import type { Buffer } from "node:buffer";
import type { TransformCallback } from "node:stream";
import { Transform } from "node:stream";
import { count, DEFAULT_OPTIONS, type Options } from "./";

export function createReadingTimeStream(options: Options = DEFAULT_OPTIONS) {
  return new ReadingTimeStream(options);
}

export class ReadingTimeStream extends Transform {
  private reading = {
    words: 0,
    chars: 0,
  };

  constructor(private options: Options = DEFAULT_OPTIONS) {
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
