import { describe, expect, test } from "vitest";
import { createVolapyk } from "volapyk";
import { count, estimate } from "../src";

import { CJK_CHARACTERS } from "./shared";

describe("estimate", () => {
  describe("should handle small texts", () => {
    test("one word texts", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 1,
      });

      const { minutes, time } = estimate(volapyk);

      expect(minutes).toBe(1);
      expect(time).toBe(300);
    });

    test("less than 1 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 2,
      });
      const { minutes, time } = estimate(volapyk);

      expect(minutes).toBe(1);
      expect(time).toBe(600);
    });

    test("less than 1 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 50,
      });
      const { minutes, time } = estimate(volapyk);

      expect(minutes).toBe(1);
      expect(time).toBe(15000);
    });

    test("1 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 100,
      });
      const { minutes, time } = estimate(volapyk);

      expect(minutes).toBe(1);
      expect(time).toBe(30000);
    });

    test("less than 3 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 500,
      });
      const { minutes, time } = estimate(volapyk);

      expect(minutes).toBe(3);
      expect(time).toBe(150000);
    });

    test("less than 5 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 967,
      });
      const { minutes, time } = estimate(volapyk);

      expect(minutes).toBe(5);
      expect(time).toBe(290100);
    });
  });

  describe("handle texts with successive whitespaces", () => {
    test("containing multiple successive whitespaces", () => {
      const text = "this text  has    whitespaces   placed randomly.";
      const { minutes, time } = estimate(text);

      expect(minutes).toBe(1);
      expect(time).toBe(1800);
    });

    test("starting with whitespaces", () => {
      const text = "     this text starts with whitespaces.";
      const { minutes, time } = estimate(text);

      expect(minutes).toBe(1);
      expect(time).toBe(1500);
    });

    test("ending with whitespaces", () => {
      const text = "this text starts with whitespaces.         ";
      const { minutes, time } = estimate(text);

      expect(minutes).toBe(1);
      expect(time).toBe(1500);
    });
  });

  describe("handle texts with successive punctuation marks", () => {
    test("containing multiple successive punctuation marks", () => {
      const text = "this text has punctuation marks placed randomly...?!";

      const { minutes, time } = estimate(text);

      expect(minutes).toBe(1);
      expect(time).toBe(2100);
    });
  });

  describe("handle texts with links", () => {
    test("containing a normal url", () => {
      const text = "this text has a link https://luxass.dev";

      const { minutes, time } = estimate(text);

      expect(minutes).toBe(1);
      expect(time).toBe(2400);
    });

    test("containing a url with a path", () => {
      const text = "this text has a link https://luxass.dev/projects/lesetid";

      const { minutes, time } = estimate(text);

      expect(minutes).toBe(1);
      expect(time).toBe(3000);
    });

    test("handle markdown links", () => {
      const text
        = "this text has a markdown link to my [projects](https://luxass.dev/projects)";

      const { minutes, time } = estimate(text);

      expect(minutes).toBe(1);
      expect(time).toBe(3900);
    });
  });

  test("handle texts with emojis", () => {
    const text
      = "this text has emojis 😎🤓🤩🥳🤯🤬🤮🤢🤧🥵🥶🥴😵🤪🤠🥳🥸🤏🤞🤟🤘🤙👈👉👆👇👍👎👊👋🤚🖐️✋🖖";

    const { minutes, time } = estimate(text);

    expect(minutes).toBe(1);
    expect(time).toBe(1500);
  });

  test("handle empty texts", () => {
    const text = " ";

    const { minutes, time } = estimate(text);

    expect(minutes).toBe(0);
    expect(time).toBe(0);
  });

  test("handle texts with only punctuation marks", () => {
    const text = "....";

    const { minutes, time } = estimate(text);

    expect(minutes).toBe(0);
    expect(time).toBe(0);
  });

  test("use custom words per minute", () => {
    const volapyk = createVolapyk({
      chars: "preset:ansi",
      type: "text",
      words: 200,
    });

    const { minutes, time } = estimate(volapyk, {
      wordsPerMinute: 100,
    });

    expect(minutes).toBe(2);
    expect(time).toBe(120000);
  });

  describe("handle texts with cjk characters", () => {
    describe("should handle small texts", () => {
      test("one word texts", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 100,
        });

        const { minutes, time } = estimate(volapyk);

        expect(minutes).toBe(1);
        expect(time).toBe(12000);
      });

      test("less than 1 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 2,
        });
        const { minutes, time } = estimate(volapyk);

        expect(minutes).toBe(0);
        expect(time).toBe(240);
      });

      test("less than 1 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 50,
        });
        const { minutes, time } = estimate(volapyk);

        expect(minutes).toBe(1);
        expect(time).toBe(6000);
      });

      test("1 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 100,
        });

        const { minutes, time } = estimate(volapyk);

        expect(minutes).toBe(1);
        expect(time).toBe(12000);
      });

      test("less than 3 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 500,
        });

        const { minutes, time } = estimate(volapyk);

        expect(minutes).toBe(1);
        expect(time).toBe(60000);
      });

      test("less than 5 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 967,
        });
        const { minutes, time } = estimate(volapyk);

        expect(minutes).toBe(2);
        expect(time).toBe(116040);
      });
    });
  });
});

describe("count", () => {
  describe("should handle small texts", () => {
    test("one word texts", () => {
      const wordCount = 1;
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      });

      const { chars, words } = count(volapyk);

      expect(words).toBe(wordCount);
      expect(chars).toBe(0);
    });

    test("less than 1 minute text", () => {
      const wordCount = 2;
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      });

      const { chars, words } = count(volapyk);

      expect(words).toBe(wordCount);
      expect(chars).toBe(0);
    });

    test("less than 1 minute text", () => {
      const wordCount = 50;
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      });

      const { chars, words } = count(volapyk);

      expect(words).toBe(wordCount);
      expect(chars).toBe(0);
    });

    test("1 minute text", () => {
      const wordCount = 100;
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      });

      const { chars, words } = count(volapyk);

      expect(words).toBe(wordCount);
      expect(chars).toBe(0);
    });

    test("less than 3 minute text", () => {
      const wordCount = 500;
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      });

      const { chars, words } = count(volapyk);

      expect(words).toBe(wordCount);
      expect(chars).toBe(0);
    });

    test("less than 5 minute text", () => {
      const wordCount = 967;
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      });

      const { chars, words } = count(volapyk);

      expect(words).toBe(wordCount);
      expect(chars).toBe(0);
    });
  });

  describe("handle texts with successive whitespaces", () => {
    test("containing multiple successive whitespaces", () => {
      const text = "this text  has    whitespaces   placed randomly.";
      const { chars, words } = count(text);

      expect(words).toBe(6);
      expect(chars).toBe(0);
    });

    test("starting with whitespaces", () => {
      const text = "     this text starts with whitespaces.";
      const { chars, words } = count(text);

      expect(words).toBe(5);
      expect(chars).toBe(0);
    });

    test("ending with whitespaces", () => {
      const text = "this text starts with whitespaces.         ";
      const { chars, words } = count(text);

      expect(words).toBe(5);
      expect(chars).toBe(0);
    });
  });

  describe("handle texts with successive punctuation marks", () => {
    test("containing multiple successive punctuation marks", () => {
      const text = "this text has punctuation marks placed randomly...?!";

      const { chars, words } = count(text);

      expect(words).toBe(7);
      expect(chars).toBe(0);
    });
  });

  describe("handle texts with links", () => {
    test("containing a normal url", () => {
      const text = "this text has a link https://luxass.dev";

      const { chars, words } = count(text);

      expect(words).toBe(8);
      expect(chars).toBe(0);
    });

    test("containing a url with a path", () => {
      const text = "this text has a link https://luxass.dev/projects/lesetid";

      const { chars, words } = count(text);

      expect(words).toBe(10);
      expect(chars).toBe(0);
    });

    test("handle markdown links", () => {
      const text
        = "this text has a markdown link to my [projects](https://luxass.dev/projects)";

      const { chars, words } = count(text);

      expect(words).toBe(13);
      expect(chars).toBe(0);
    });
  });

  test("handle texts with emojis", () => {
    const text
      = "this text has emojis 😎🤓🤩🥳🤯🤬🤮🤢🤧🥵🥶🥴😵🤪🤠🥳🥸🤏🤞🤟🤘🤙👈👉👆👇👍👎👊👋🤚🖐️✋🖖";

    const { chars, words } = count(text);

    expect(words).toBe(5);
    expect(chars).toBe(0);
  });

  test("handle empty texts", () => {
    const text = " ";

    const { chars, words } = count(text);

    expect(words).toBe(0);
    expect(chars).toBe(0);
  });

  test("handle texts with only punctuation marks", () => {
    const text = "....";

    const { chars, words } = count(text);

    expect(words).toBe(0);
    expect(chars).toBe(0);
  });

  test("use custom words per minute", () => {
    const wordCount = 200;
    const volapyk = createVolapyk({
      chars: "preset:ansi",
      type: "text",
      words: wordCount,
    });

    const { chars, words } = count(volapyk, {
      wordsPerMinute: 100,
    });

    expect(words).toBe(wordCount);
    expect(chars).toBe(0);
  });

  describe("handle texts with cjk characters", () => {
    describe("should handle small texts", () => {
      test("one word texts", () => {
        const wordCount = 100;
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        });

        const { chars, words } = count(volapyk);

        expect(words).toBe(0);
        expect(chars).toBe(wordCount);
      });

      test("less than 1 minute text", () => {
        const wordCount = 2;
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        });

        const { chars, words } = count(volapyk);

        expect(words).toBe(0);
        expect(chars).toBe(wordCount);
      });

      test("less than 1 minute text", () => {
        const wordCount = 50;
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        });

        const { chars, words } = count(volapyk);

        expect(words).toBe(0);
        expect(chars).toBe(wordCount);
      });

      test("1 minute text", () => {
        const wordCount = 100;
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        });

        const { chars, words } = count(volapyk);

        expect(words).toBe(0);
        expect(chars).toBe(wordCount);
      });

      test("less than 3 minute text", () => {
        const wordCount = 500;
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        });

        const { chars, words } = count(volapyk);

        expect(words).toBe(0);
        expect(chars).toBe(wordCount);
      });

      test("less than 5 minute text", () => {
        const wordCount = 967;
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        });

        const { chars, words } = count(volapyk);

        expect(words).toBe(0);
        expect(chars).toBe(wordCount);
      });
    });
  });
});
