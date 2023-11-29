import type { ExtensionContext, StatusBarItem } from "vscode";
import { StatusBarAlignment, commands, window, workspace } from "vscode";
import { estimate } from "lesetid";
import { config } from "./configuration";
import { log } from "./log";

export function activate(context: ExtensionContext) {
  let statusBar: StatusBarItem;

  log.info("Reading Time activated", config.get("enabled"));

  if (config.get("enabled")) {
    statusBar = window.createStatusBarItem(
      "vscode-reading-time",
      StatusBarAlignment.Left,
      2,
    );
  }

  context.subscriptions.push(
    commands.registerCommand("reading-time.estimate", async () => {
      window.showInformationMessage("Not implemented yet");
    }),
  );

  context.subscriptions.push(
    commands.registerCommand("reading-time.toggle", async () => {
      const isEnabled = config.get("enabled");
      const toggled = !isEnabled;
      await config.set("enabled", toggled);

      if (!toggled) {
        statusBar.hide();
      }
    }),
  );

  context.subscriptions.push(
    window.onDidChangeActiveTextEditor((editor) => {
      if (!editor) return;

      const document = editor.document;

      if (!config.get("enabled")) {
        statusBar.hide();
        return;
      }

      const text = document.getText();

      const files = config.get("files");
      log.info(files, document.languageId);
      if (files.includes(document.languageId)) {
        const estimation = estimate(text, {
          charsPerMinute: config.get("cpm"),
          wordsPerMinute: config.get("wpm"),
        });

        statusBar.text = `$(book) ${estimation.text}`;
        statusBar.show();
      } else {
        statusBar.hide();
      }
    }),
    workspace.onDidChangeTextDocument((event) => {
      const document = event.document;

      if (!config.get("enabled")) {
        statusBar.hide();
        return;
      }
      const text = document.getText();

      const files = config.get("files");
      log.info(files, document.languageId);
      if (files.includes(document.languageId)) {
        const estimation = estimate(text, {
          charsPerMinute: config.get("cpm"),
          wordsPerMinute: config.get("wpm"),
        });

        statusBar.text = `$(book) ${estimation.text}`;
        statusBar.show();
      } else {
        statusBar.hide();
      }
    }),
    workspace.onDidOpenTextDocument((document) => {
      if (!document) return;
      if (!config.get("enabled")) {
        statusBar.hide();
        return;
      }
      const text = document.getText();

      const files = config.get("files");
      log.info(files, document.languageId);
      if (files.includes(document.languageId)) {
        const estimation = estimate(text, {
          charsPerMinute: config.get("cpm"),
          wordsPerMinute: config.get("wpm"),
        });

        statusBar.text = `$(book) ${estimation.text}`;
        statusBar.show();
      } else {
        statusBar.hide();
      }
    }),
    workspace.onDidChangeConfiguration((event) => {
      if (!event.affectsConfiguration("reading-time")) {
        return;
      }
      const enabled = config.get("enabled");
      if (!enabled) {
        statusBar.hide();
      }
      log.info(`Configuration changed. Reading time is now ${enabled ? "enabled" : "disabled"}`);
    }),
  );
}
