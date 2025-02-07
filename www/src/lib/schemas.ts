import { z } from "zod";

export const ICON_URL_SCHEMA = z.string().startsWith("/");

export const EXAMPLE_SCHEMA = z.object({
  iconUrl: ICON_URL_SCHEMA.optional(),
  title: z.string(),
  url: z.string(),
  handle: z.string(),
  providers: z.record(z.string()),
});

export type Example = z.infer<typeof EXAMPLE_SCHEMA>;

export const EXAMPLES_GITHUB_RESPONSE_SCHEMA = z.array(z.object({
  name: z.string(),
  path: z.string(),
  url: z.string(),
  html_url: z.string(),
  type: z.union([
    z.literal("dir"),
    z.literal("file"),
  ]),
}));
