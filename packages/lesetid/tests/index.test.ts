import { describe, expect, it } from "vitest"
import { createVolapyk } from "volapyk"
import { count, estimate } from "../src"

import { CJK_CHARACTERS } from "./shared"

describe("estimate", () => {
  describe("should handle small texts", () => {
    it("one word texts", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 1,
      })

      const { minutes, time } = estimate(volapyk)

      expect(minutes).toBe(1)
      expect(time).toBe(300)
    })

    it("less than 1 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 2,
      })
      const { minutes, time } = estimate(volapyk)

      expect(minutes).toBe(1)
      expect(time).toBe(600)
    })

    // eslint-disable-next-line test/no-identical-title
    it("less than 1 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 50,
      })
      const { minutes, time } = estimate(volapyk)

      expect(minutes).toBe(1)
      expect(time).toBe(15000)
    })

    it("1 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 100,
      })
      const { minutes, time } = estimate(volapyk)

      expect(minutes).toBe(1)
      expect(time).toBe(30000)
    })

    it("less than 3 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 500,
      })
      const { minutes, time } = estimate(volapyk)

      expect(minutes).toBe(3)
      expect(time).toBe(150000)
    })

    it("less than 5 minute text", () => {
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: 967,
      })
      const { minutes, time } = estimate(volapyk)

      expect(minutes).toBe(5)
      expect(time).toBe(290100)
    })
  })

  describe("handle texts with successive whitespaces", () => {
    it("containing multiple successive whitespaces", () => {
      const text = "this text  has    whitespaces   placed randomly."
      const { minutes, time } = estimate(text)

      expect(minutes).toBe(1)
      expect(time).toBe(1800)
    })

    it("starting with whitespaces", () => {
      const text = "     this text starts with whitespaces."
      const { minutes, time } = estimate(text)

      expect(minutes).toBe(1)
      expect(time).toBe(1500)
    })

    it("ending with whitespaces", () => {
      const text = "this text starts with whitespaces.         "
      const { minutes, time } = estimate(text)

      expect(minutes).toBe(1)
      expect(time).toBe(1500)
    })
  })

  describe("handle texts with successive punctuation marks", () => {
    it("containing multiple successive punctuation marks", () => {
      const text = "this text has punctuation marks placed randomly...?!"

      const { minutes, time } = estimate(text)

      expect(minutes).toBe(1)
      expect(time).toBe(2100)
    })
  })

  describe("handle texts with links", () => {
    it("containing a normal url", () => {
      const text = "this text has a link https://luxass.dev"

      const { minutes, time } = estimate(text)

      expect(minutes).toBe(1)
      expect(time).toBe(2400)
    })

    it("containing a url with a path", () => {
      const text = "this text has a link https://luxass.dev/projects/lesetid"

      const { minutes, time } = estimate(text)

      expect(minutes).toBe(1)
      expect(time).toBe(3000)
    })

    it("handle markdown links", () => {
      const text
        = "this text has a markdown link to my [projects](https://luxass.dev/projects)"

      const { minutes, time } = estimate(text)

      expect(minutes).toBe(1)
      expect(time).toBe(3900)
    })
  })

  it("handle texts with emojis", () => {
    const text
      = "this text has emojis 😎🤓🤩🥳🤯🤬🤮🤢🤧🥵🥶🥴😵🤪🤠🥳🥸🤏🤞🤟🤘🤙👈👉👆👇👍👎👊👋🤚🖐️✋🖖"

    const { minutes, time } = estimate(text)

    expect(minutes).toBe(1)
    expect(time).toBe(1500)
  })

  it("handle empty texts", () => {
    const text = " "

    const { minutes, time } = estimate(text)

    expect(minutes).toBe(0)
    expect(time).toBe(0)
  })

  it("handle texts with only punctuation marks", () => {
    const text = "...."

    const { minutes, time } = estimate(text)

    expect(minutes).toBe(0)
    expect(time).toBe(0)
  })

  it("use custom words per minute", () => {
    const volapyk = createVolapyk({
      chars: "preset:ansi",
      type: "text",
      words: 200,
    })

    const { minutes, time } = estimate(volapyk, {
      wordsPerMinute: 100,
    })

    expect(minutes).toBe(2)
    expect(time).toBe(120000)
  })

  describe("handle texts with cjk characters", () => {
    describe("should handle small texts", () => {
      it("one word texts", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 100,
        })

        const { minutes, time } = estimate(volapyk)

        expect(minutes).toBe(1)
        expect(time).toBe(12000)
      })

      it("less than 1 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 2,
        })
        const { minutes, time } = estimate(volapyk)

        expect(minutes).toBe(0)
        expect(time).toBe(240)
      })

      // eslint-disable-next-line test/no-identical-title
      it("less than 1 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 50,
        })
        const { minutes, time } = estimate(volapyk)

        expect(minutes).toBe(1)
        expect(time).toBe(6000)
      })

      it("1 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 100,
        })

        const { minutes, time } = estimate(volapyk)

        expect(minutes).toBe(1)
        expect(time).toBe(12000)
      })

      it("less than 3 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 500,
        })

        const { minutes, time } = estimate(volapyk)

        expect(minutes).toBe(1)
        expect(time).toBe(60000)
      })

      it("less than 5 minute text", () => {
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: 967,
        })
        const { minutes, time } = estimate(volapyk)

        expect(minutes).toBe(2)
        expect(time).toBe(116040)
      })
    })
  })
})

describe("count", () => {
  describe("should handle small texts", () => {
    it("one word texts", () => {
      const wordCount = 1
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      })

      const { chars, words } = count(volapyk)

      expect(words).toBe(wordCount)
      expect(chars).toBe(0)
    })

    it("less than 1 minute text", () => {
      const wordCount = 2
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      })

      const { chars, words } = count(volapyk)

      expect(words).toBe(wordCount)
      expect(chars).toBe(0)
    })

    // eslint-disable-next-line test/no-identical-title
    it("less than 1 minute text", () => {
      const wordCount = 50
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      })

      const { chars, words } = count(volapyk)

      expect(words).toBe(wordCount)
      expect(chars).toBe(0)
    })

    it("1 minute text", () => {
      const wordCount = 100
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      })

      const { chars, words } = count(volapyk)

      expect(words).toBe(wordCount)
      expect(chars).toBe(0)
    })

    it("less than 3 minute text", () => {
      const wordCount = 500
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      })

      const { chars, words } = count(volapyk)

      expect(words).toBe(wordCount)
      expect(chars).toBe(0)
    })

    it("less than 5 minute text", () => {
      const wordCount = 967
      const volapyk = createVolapyk({
        chars: "preset:ansi",
        type: "text",
        words: wordCount,
      })

      const { chars, words } = count(volapyk)

      expect(words).toBe(wordCount)
      expect(chars).toBe(0)
    })
  })

  describe("handle texts with successive whitespaces", () => {
    it("containing multiple successive whitespaces", () => {
      const text = "this text  has    whitespaces   placed randomly."
      const { chars, words } = count(text)

      expect(words).toBe(6)
      expect(chars).toBe(0)
    })

    it("starting with whitespaces", () => {
      const text = "     this text starts with whitespaces."
      const { chars, words } = count(text)

      expect(words).toBe(5)
      expect(chars).toBe(0)
    })

    it("ending with whitespaces", () => {
      const text = "this text starts with whitespaces.         "
      const { chars, words } = count(text)

      expect(words).toBe(5)
      expect(chars).toBe(0)
    })
  })

  describe("handle texts with successive punctuation marks", () => {
    it("containing multiple successive punctuation marks", () => {
      const text = "this text has punctuation marks placed randomly...?!"

      const { chars, words } = count(text)

      expect(words).toBe(7)
      expect(chars).toBe(0)
    })
  })

  describe("handle texts with links", () => {
    it("containing a normal url", () => {
      const text = "this text has a link https://luxass.dev"

      const { chars, words } = count(text)

      expect(words).toBe(8)
      expect(chars).toBe(0)
    })

    it("containing a url with a path", () => {
      const text = "this text has a link https://luxass.dev/projects/lesetid"

      const { chars, words } = count(text)

      expect(words).toBe(10)
      expect(chars).toBe(0)
    })

    it("handle markdown links", () => {
      const text
        = "this text has a markdown link to my [projects](https://luxass.dev/projects)"

      const { chars, words } = count(text)

      expect(words).toBe(13)
      expect(chars).toBe(0)
    })
  })

  it("handle texts with emojis", () => {
    const text
      = "this text has emojis 😎🤓🤩🥳🤯🤬🤮🤢🤧🥵🥶🥴😵🤪🤠🥳🥸🤏🤞🤟🤘🤙👈👉👆👇👍👎👊👋🤚🖐️✋🖖"

    const { chars, words } = count(text)

    expect(words).toBe(5)
    expect(chars).toBe(0)
  })

  it("handle empty texts", () => {
    const text = " "

    const { chars, words } = count(text)

    expect(words).toBe(0)
    expect(chars).toBe(0)
  })

  it("handle texts with only punctuation marks", () => {
    const text = "...."

    const { chars, words } = count(text)

    expect(words).toBe(0)
    expect(chars).toBe(0)
  })

  it("use custom words per minute", () => {
    const wordCount = 200
    const volapyk = createVolapyk({
      chars: "preset:ansi",
      type: "text",
      words: wordCount,
    })

    const { chars, words } = count(volapyk, {
      wordsPerMinute: 100,
    })

    expect(words).toBe(wordCount)
    expect(chars).toBe(0)
  })

  describe("handle texts with cjk characters", () => {
    describe("should handle small texts", () => {
      it("one word texts", () => {
        const wordCount = 100
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        })

        const { chars, words } = count(volapyk)

        expect(words).toBe(0)
        expect(chars).toBe(wordCount)
      })

      it("less than 1 minute text", () => {
        const wordCount = 2
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        })

        const { chars, words } = count(volapyk)

        expect(words).toBe(0)
        expect(chars).toBe(wordCount)
      })

      // eslint-disable-next-line test/no-identical-title
      it("less than 1 minute text", () => {
        const wordCount = 50
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        })

        const { chars, words } = count(volapyk)

        expect(words).toBe(0)
        expect(chars).toBe(wordCount)
      })

      it("1 minute text", () => {
        const wordCount = 100
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        })

        const { chars, words } = count(volapyk)

        expect(words).toBe(0)
        expect(chars).toBe(wordCount)
      })

      it("less than 3 minute text", () => {
        const wordCount = 500
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        })

        const { chars, words } = count(volapyk)

        expect(words).toBe(0)
        expect(chars).toBe(wordCount)
      })

      it("less than 5 minute text", () => {
        const wordCount = 967
        const volapyk = createVolapyk({
          chars: CJK_CHARACTERS,
          type: "text",
          words: wordCount,
        })

        const { chars, words } = count(volapyk)

        expect(words).toBe(0)
        expect(chars).toBe(wordCount)
      })
    })
  })
})
