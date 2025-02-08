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
