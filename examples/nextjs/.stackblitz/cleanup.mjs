import fs from "node:fs";

// fetch the pnpm-workspace.yaml file from github
const pnpmWorkspace = await fetch(
  "https://raw.githubusercontent.com/luxass/lesetid/main/pnpm-workspace.yaml"
).then((res) => res.text());

// parse the catalogs from the workspace file
const catalogs = {};
const catalogMatch = pnpmWorkspace.match(/catalogs:\s*([\s\S]*?)(?=\n\w|$)/);
if (catalogMatch) {
  const catalogContent = catalogMatch[1];
  let currentCatalog = null;
  catalogContent.split('\n').forEach(line => {
    const catalogNameMatch = line.match(/^\s*(\w+):$/);
    if (catalogNameMatch) {
      currentCatalog = catalogNameMatch[1];
      catalogs[currentCatalog] = {};
    } else if (currentCatalog && line.trim()) {
      const [packageName, version] = line.trim().replace(/"/g, "").split(': ');
      if (packageName && version) {
        catalogs[currentCatalog][packageName] = version;
      }
    }
  });
}

// update the dependency links to the latest
updateDependencyLinksToLatest("./package.json");

function updateDependencyLinksToLatest(filename) {
  try {
    let contents = fs.readFileSync(filename, "utf-8");

    // Replace workspace dependencies
    contents = contents.replace(/"workspace:\*"/gi, "\"latest\"");

    // Replace catalog dependencies
    contents = contents.replace(/"catalog:(\w+)"/gi, (match, catalogName) => {
      const catalog = catalogs[catalogName];
      if (!catalog) {
        throw new Error(`Catalog "${catalogName}" not found in workspace file`);
      }

      // Find the package name in the current line
      const lines = contents.split('\n');
      const currentLine = lines.find(line => line.includes(match));
      if (!currentLine) return match;

      const packageMatch = currentLine.match(/"([^"]+)":\s*"catalog:\w+"/);
      if (!packageMatch) return match;

      const packageName = packageMatch[1];
      const version = catalog[packageName];

      if (!version) {
        throw new Error(`Package "${packageName}" not found in catalog "${catalogName}"`);
      }

      return `"${version}"`;
    });

    fs.writeFileSync(filename, contents);
  } catch (err) {
    console.error(err);
  }
}
