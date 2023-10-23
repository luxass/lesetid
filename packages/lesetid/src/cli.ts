import process from "node:process";
import cac from "cac";
import {
  bold, inverse, red,
} from "colorette";
import { consola } from "consola";
import {
  version,
} from "../package.json";

const cli = cac("plundle");

export interface CLIOptions {
  out?: string
}

cli.command("[...files]", "Calculate the reading time of the given files.")
  .action(async (files: string[], options: CLIOptions) => {
    consola.log("FILES", files, options);
  });

cli.help();
cli.version(version);

try {
  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
} catch (err) {
  console.error(`\n${red(bold(inverse(" Unhandled Error ")))}`);
  console.error(err);
  console.error("\n\n");
  process.exit(1);
}
