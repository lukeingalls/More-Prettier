// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import file_select from "./file_select";
import getBitmap from "./img";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "moreprettier" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let open = vscode.commands.registerCommand("moreprettier.openfile", () => {
    try {
      file_select.openFileDialog((path) => {
        vscode.window.showInformationMessage(`Successfully selected ${path}`);
        if (file_select.FileBitmap) {
          console.log(file_select.FileBitmap);
        }
      });
    } catch (err) {
      vscode.window.showErrorMessage(err);
    }
  });

  let prettier = vscode.commands.registerCommand(
    "moreprettier.morePrettier",
    () => {}
  );

  context.subscriptions.push(prettier);
  context.subscriptions.push(open);
}

// this method is called when your extension is deactivated
export function deactivate() {}
