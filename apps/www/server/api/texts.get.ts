import process from "node:process"

export default defineCachedEventHandler(
  async () => {
    const storage = useStorage("assets:texts")
    let keys = await storage.getKeys()

    keys = keys.filter((key) => key !== "README.md")

    const texts = await Promise.all(
      keys.map(async (key) => {
        const file = await storage.getItem<string>(key)
        return {
          key,
          file,
        }
      }),
    )

    return {
      texts,
    }
  },
  {
    shouldBypassCache: () => process.env.NODE_ENV === "development",
    maxAge: 60 * 60,
  },
)
