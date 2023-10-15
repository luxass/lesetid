export default defineCachedEventHandler(async (event) => {
  const storage = useStorage("assets:texts");
  let keys = await storage.getKeys();

  keys = keys.filter((key) => key !== "README.md");

  const texts = await Promise.all(keys.map(async (key) => {
    const file = await storage.getItem(key);
    return {
      key,
      file,
    };
  }));

  return {
    texts,
  };
}, {
  // maxAge: 60 * 60,
});
