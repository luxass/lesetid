import { visit } from "unist-util-visit";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("content:file:beforeParse", (file) => {
    console.log("Found markdown file", file._id);

    if (file._id.endsWith(".md")) {
      file.body = file.body.replace(/h/g, "H");
    }
  });

  nitroApp.hooks.hook("content:file:afterParse", (file) => {
    console.log("Found markdown file", file._id);
    if (file._id.endsWith(".md")) {
      visit(file.body, "text", (node) => {
        node.value = node.value.replace(/afafaf/gi, "FUFUFUFU");
      });
    }
  });
});
