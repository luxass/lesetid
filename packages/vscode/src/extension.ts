import type { ExtensionContext } from "vscode";
import { commands, window } from "vscode";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("reading-time.estimate", async () => {
      window.showInformationMessage("Not implemented yet");
    }),
  );

  context.subscriptions.push(
    commands.registerCommand("reading-time.playground", async () => {
      window.showInformationMessage("Not implemented yet");
    }),
  );
}
