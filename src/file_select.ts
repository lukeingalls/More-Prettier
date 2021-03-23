import Jimp from "jimp/*";
import * as vscode from "vscode";
import Config from "./config";
import getBitmap from "./img";

class FileSelect {
  private fileUrl: string = "";
  private fileBitmap: Jimp["bitmap"] | undefined = undefined;

  public get FileBitmap() {
    return this.fileBitmap;
  }

  public get FileUrl(): string {
    return this.fileUrl;
  }

  public async openFileDialog(callback: (path: string) => void) {
    let filters = {
      Images: ["png", "jpg", "jpeg"],
    };
    let fileUrls = await vscode.window.showOpenDialog({
      canSelectFolders: false,
      canSelectFiles: true,
      canSelectMany: false,
      openLabel: "Select",
      filters: filters,
    });
    if (fileUrls) {
      this.fileUrl = fileUrls[0].fsPath;
      try {
        this.fileBitmap = await getBitmap(this.fileUrl);
      } catch (error) {
        throw Error("Couldn't read file data!");
      }
      Config.SetConfig("filepath", this.fileUrl);
      Config.filePath = this.fileUrl;
      callback(this.fileUrl);
      console.log(this.fileUrl);
    } else {
      throw Error("The file failed to be imported");
    }
  }
}
export default new FileSelect();
