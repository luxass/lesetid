import type { Buffer } from "node:buffer";
import { describe, expect, test } from "vitest";
import {
  createReadingTimeStream,
} from "../src/stream";

import {
  createVolapykChunks,
} from "./shared";

interface Expected {
  words: number
  chars: number
};

function $estimate(chunks: Buffer[], expected: Expected) {
  const stream = createReadingTimeStream();

  stream.on("data", (data) => {
    expect(data).toEqual(expected);
  });

  chunks.forEach((chunk) => stream.write(chunk, "utf-8"));
  stream.end();
}

describe("should handle small texts", () => {
  test("one word texts", () => {
    const chunks = createVolapykChunks("preset:ansi", 1);

    $estimate(chunks, {
      words: 1,
      chars: 0,
    });
  });

  test("less than 1 minute text", () => {
    const chunks = createVolapykChunks("preset:ansi", 2);

    $estimate(chunks, {
      words: 2,
      chars: 0,
    });
  });

  test("less than 1 minute text", () => {
    const chunks = createVolapykChunks("preset:ansi", 50);

    $estimate(chunks, {
      words: 50,
      chars: 0,
    });
  });

  test("1 minute text", () => {
    const chunks = createVolapykChunks("preset:ansi", 100);

    $estimate(chunks, {
      words: 100,
      chars: 0,
    });
  });

  test("less than 3 minute text", () => {
    const chunks = createVolapykChunks("preset:ansi", 500);
    $estimate(chunks, {
      words: 500,
      chars: 0,
    });
  });

  test("less than 5 minute text", () => {
    const chunks = createVolapykChunks("preset:ansi", 967);
    $estimate(chunks, {
      words: 967,
      chars: 0,
    });
  });
});
