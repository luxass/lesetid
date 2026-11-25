# satteri-lesetid

## 0.1.1

### Patch Changes

- [#354](https://github.com/luxass/lesetid/pull/354) [`3e32ee0`](https://github.com/luxass/lesetid/commit/3e32ee0b47d04628ec848241c644240beb8b3b86) Thanks [@luxass](https://github.com/luxass)! - Include the built files. The 0.1.0 tarball has no `dist` folder, so the package cannot be imported.

- Updated dependencies [[`5f8cf1f`](https://github.com/luxass/lesetid/commit/5f8cf1fc93a1b1ad57b39ffae25a497c4da78ebc)]:
  - lesetid@3.0.0

## 0.1.0

### Minor Changes

- Add a Sätteri plugin that estimates the reading time of each Markdown file. When Astro renders the file, the estimation goes into the page frontmatter. Otherwise it goes into the `data` of the compile result.
