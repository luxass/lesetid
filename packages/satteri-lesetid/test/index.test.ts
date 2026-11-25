import { estimate } from "lesetid";
import { markdownToHtml } from "satteri";
import { expect, it } from "vitest";

import { satteriLesetid } from "../src";

const words = Array.from({ length: 967 }, (_, index) => `word${index}`).join(" ");

it("adds the estimation to data", async () => {
  const { data } = await markdownToHtml(words, { mdastPlugins: [satteriLesetid()] });

  expect(data.estimation).toEqual(estimate(words));
  expect(data.estimation?.words).toBe(967);
});

it("counts the text without the Markdown syntax", async () => {
  const markdown = "Some *emphasis*, **strong** text, `code`, and a [link](https://example.com).";
  const { data } = await markdownToHtml(markdown, { mdastPlugins: [satteriLesetid()] });

  expect(data.estimation).toEqual(estimate("Some emphasis, strong text, code, and a link."));
});

it("passes the lesetid options to estimate", async () => {
  const { data } = await markdownToHtml(words, {
    mdastPlugins: [satteriLesetid({ wordsPerMinute: 100 })],
  });

  expect(data.estimation).toEqual(estimate(words, { wordsPerMinute: 100 }));
  expect(data.estimation?.minutes).toBeGreaterThan(estimate(words).minutes);
});

it("sets a custom data key", async () => {
  const { data } = await markdownToHtml(words, {
    mdastPlugins: [satteriLesetid({ dataKey: "readingTime" })],
  });

  expect(data.readingTime).toEqual(estimate(words));
  expect(data.estimation).toBeUndefined();
});

it("sets the estimation in the Astro frontmatter", async () => {
  const astro = { frontmatter: { title: "Hello" } as Record<string, unknown> };
  const { data } = await markdownToHtml(words, {
    mdastPlugins: [satteriLesetid()],
    data: { astro },
  });

  expect(astro.frontmatter).toEqual({ title: "Hello", estimation: estimate(words) });
  expect(data.estimation).toBeUndefined();
});

it("uses the custom data key in the Astro frontmatter", async () => {
  const astro = { frontmatter: {} as Record<string, unknown> };
  await markdownToHtml(words, {
    mdastPlugins: [satteriLesetid({ dataKey: "readingTime" })],
    data: { astro },
  });

  expect(astro.frontmatter).toEqual({ readingTime: estimate(words) });
});

it("rejects an empty data key", () => {
  expect(() => satteriLesetid({ dataKey: "" })).toThrow("`dataKey` must not be empty");
});
