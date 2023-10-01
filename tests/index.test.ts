import { describe, expect, test } from "vitest";
import {
  readTime,
} from "../src";

test("should return 1 for 200 words with default options", () => {
  const result = readTime("Lorem ipsum ".repeat(200));
  expect(result).toEqual({
    minutes: 1,
    rawMinutes: 1,
    words: 200,
  });
});
