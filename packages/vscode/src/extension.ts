import type { ExtensionContext } from "vscode";
import { commands, window, workspace } from "vscode";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("reading-time.estimate", async () => {
      window.showInformationMessage("Not implemented yet");
    }),
  );

  context.subscriptions.push(
    window.onDidChangeActiveTextEditor((editor) => {
      if (!editor) return;

      const document = editor.document;

      const text = document.getText();
      console.info("window#onDidChangeActiveTextEditor", document.languageId);
    }),
    workspace.onDidChangeTextDocument((event) => {
      const document = event.document;

      const text = document.getText();

      console.info("workspace#onDidChangeTextDocument", document.languageId);
    }),
    workspace.onDidOpenTextDocument((document) => {
      if (!document) return;
      console.info("workspace#onDidOpenTextDocument", document, document.languageId);
    }),
    workspace.onDidChangeConfiguration((event) => {
      console.info("workspace#onDidChangeConfiguration", event);
    }),
  );
}
