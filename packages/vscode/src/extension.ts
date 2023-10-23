import type { ExtensionContext } from "vscode";
import { commands, window } from "vscode";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("schema-extractor.extract-all", async () => {
      window.showInformationMessage("Not implemented yet");
    }),
  );

  context.subscriptions.push(
    commands.registerCommand("schema-extractor.extract-one", async () => {
      window.showInformationMessage("Not implemented yet");
    }),
  );
}
