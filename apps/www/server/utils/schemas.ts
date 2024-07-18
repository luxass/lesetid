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
  iconUrl: optional(pipe(string(), startsWith("/"))),
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
