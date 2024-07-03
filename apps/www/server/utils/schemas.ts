import {
  array,
  literal,
  object,
  optional,
  pipe,
  record,
  startsWith,
  string,
  union,
} from "valibot";

export const ICON_URL_SCHEMA = pipe(string(), startsWith("/"));

export const ExampleSchema = object({
  iconUrl: optional(union([
    ICON_URL_SCHEMA,
    object({
      dark: ICON_URL_SCHEMA,
      light: ICON_URL_SCHEMA,
    }),
  ])),
  title: string(),
  url: string(),
  handle: string(),
  providers: record(string(), string()),
});

export const ExamplesSchema = array(object({
  name: string(),
  path: string(),
  url: string(),
  html_url: string(),
  type: union([
    literal("dir"),
    literal("file"),
  ]),
}));
