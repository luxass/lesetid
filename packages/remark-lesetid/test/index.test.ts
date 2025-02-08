import { remark } from "remark";
import { expect, it } from "vitest";
import { createVolapyk } from "volapyk";
import remarkLesetid, { type Options } from "../src";

async function runRemark(input: string, options: Options) {
  return remark().use(remarkLesetid, options).process(input);
}

it("should estimate reading time", async () => {
  const volapyk = createVolapyk({
    chars: "preset:ansi",
    type: "text",
    words: 967,
  });

  const { data } = await runRemark(volapyk, { dataKey: "estimation" });
  const { minutes, time } = data.estimation!;

  expect(minutes).toBe(5);
  expect(time).toBe(290100);
});

it("should estimate reading time with custom options", async () => {
  const volapyk = createVolapyk({
    chars: "preset:ansi",
    type: "text",
    words: 200,
  });

  const { data } = await runRemark(volapyk, { dataKey: "estimation", wordsPerMinute: 100 });
  const { minutes, time } = data.estimation!;

  expect(minutes).toBe(2);
  expect(time).toBe(120000);
});
