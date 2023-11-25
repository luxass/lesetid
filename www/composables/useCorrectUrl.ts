/* eslint-disable node/prefer-global/process */
interface UseCorrectUrlOptions {
  path?: string
  prodUrl?: string
}

export function useCorrectUrl(options: UseCorrectUrlOptions = {
  path: "",
  prodUrl: "https://lesetid.dev",
}) {
  if (!options?.prodUrl) options.prodUrl = "https://lesetid.dev";

  return (process.env.NODE_ENV === "production"
    ? process.env.VERCEL_ENV === "production"
      ? options?.prodUrl
      : `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000") + (options?.path || "");
};
