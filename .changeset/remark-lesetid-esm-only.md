---
"remark-lesetid": major
---

Publish `remark-lesetid` as ESM only, like remark and unified. Load it with `import`. The CommonJS build never worked in 2.x, because `require("remark-lesetid")` returned `undefined`. On Node.js 22.12 or later, `require("remark-lesetid").default` loads the plugin from the ESM build.
