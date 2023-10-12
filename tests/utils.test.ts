import { expect, expectTypeOf, test } from "vitest";
import { PUNCTATION_CODE_RANGES, isAnsi, isCJK, isPunctuation } from "../src/utils";

test("returns true for punctuation characters", () => {
  expect(isPunctuation(".")).toBe(true);
  expect(isPunctuation(",")).toBe(true);
  expect(isPunctuation("?")).toBe(true);
  expect(isPunctuation("!")).toBe(true);
  expect(isPunctuation(";")).toBe(true);
  expect(isPunctuation(":")).toBe(true);
  expect(isPunctuation("-")).toBe(true);
  expect(isPunctuation("(")).toBe(true);
  expect(isPunctuation(")")).toBe(true);
  expect(isPunctuation("[")).toBe(true);
  expect(isPunctuation("]")).toBe(true);
  expect(isPunctuation("{")).toBe(true);
  expect(isPunctuation("}")).toBe(true);
  expect(isPunctuation("<")).toBe(true);
  expect(isPunctuation(">")).toBe(true);
  expect(isPunctuation("/")).toBe(true);
  expect(isPunctuation("\\")).toBe(true);
  expect(isPunctuation("|")).toBe(true);
  expect(isPunctuation("@")).toBe(true);
  expect(isPunctuation("#")).toBe(true);
  expect(isPunctuation("$")).toBe(true);
  expect(isPunctuation("%")).toBe(true);
  expect(isPunctuation("^")).toBe(true);
  expect(isPunctuation("&")).toBe(true);
  expect(isPunctuation("*")).toBe(true);
  expect(isPunctuation("+")).toBe(true);
  expect(isPunctuation("=")).toBe(true);
  expect(isPunctuation("~")).toBe(true);
});

test("returns false for non-punctuation characters", () => {
  expect(isPunctuation("a")).toBe(false);
  expect(isPunctuation(" ")).toBe(false);
  expect(isPunctuation("")).toBe(false);
  expect(isPunctuation("1")).toBe(false);
  expect(isPunctuation("é")).toBe(false);
});

test("returns true for ANSI characters", () => {
  expect(isAnsi(" ")).toBe(true);
  expect(isAnsi("\n")).toBe(true);
  expect(isAnsi("\r")).toBe(true);
  expect(isAnsi("\t")).toBe(true);
});

test("returns false for non-ANSI characters", () => {
  expect(isAnsi("a")).toBe(false);
  expect(isAnsi("")).toBe(false);
  expect(isAnsi("1")).toBe(false);
  expect(isAnsi("é")).toBe(false);
});

test("returns true for CJK characters", () => {
  expect(isCJK("你")).toBe(true);
  expect(isCJK("好")).toBe(true);
  expect(isCJK("日")).toBe(true);
  expect(isCJK("本")).toBe(true);
  expect(isCJK("語")).toBe(true);
  expect(isCJK("한")).toBe(true);
  expect(isCJK("글")).toBe(true);
});

test("returns false for non-CJK characters", () => {
  expect(isCJK("a")).toBe(false);
  expect(isCJK(" ")).toBe(false);
  expect(isCJK("")).toBe(false);
  expect(isCJK("1")).toBe(false);
  expect(isCJK("é")).toBe(false);
});
