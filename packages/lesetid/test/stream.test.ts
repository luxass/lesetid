import { describe, expect, it } from "vitest";
import { createVolapykChunks } from "volapyk";
import { createReadingTimeStream } from "../src/stream";

interface Expected {
  words: number;
  chars: number;
}

function $estimate(chunks: string[], expected: Expected) {
  const stream = createReadingTimeStream();

  stream.on("data", (data) => {
    expect(data).toEqual(expected);
  });

  chunks.forEach((chunk) => stream.write(chunk, "utf-8"));
  stream.end();
}

describe("should handle small texts", () => {
  it("one word texts", () => {
    const chunks = createVolapykChunks({
      chars: "preset:ansi",
      words: 1,
    });

    $estimate(chunks, {
      words: 1,
      chars: 0,
    });
  });

  it("less than 1 minute text", () => {
    const chunks = createVolapykChunks({
      chars: "preset:ansi",
      words: 2,
    });

    $estimate(chunks, {
      words: 2,
      chars: 0,
    });
  });

  // eslint-disable-next-line test/no-identical-title
  it("less than 1 minute text", () => {
    const chunks = createVolapykChunks({
      chars: "preset:ansi",
      words: 50,
    });

    $estimate(chunks, {
      words: 50,
      chars: 0,
    });
  });

  it("1 minute text", () => {
    const chunks = createVolapykChunks({
      chars: "preset:ansi",
      words: 100,
    });

    $estimate(chunks, {
      words: 100,
      chars: 0,
    });
  });

  it("less than 3 minute text", () => {
    const chunks = createVolapykChunks({
      chars: "preset:ansi",
      words: 500,
    });

    $estimate(chunks, {
      words: 500,
      chars: 0,
    });
  });

  it("less than 5 minute text", () => {
    const chunks = createVolapykChunks({
      chars: "preset:ansi",
      words: 967,
    });

    $estimate(chunks, {
      words: 967,
      chars: 0,
    });
  });
});
