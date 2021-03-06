import * as vscode from "vscode";

class Config {
  filePath: string = "";
  Opacity: string = "";
  Alignment: string = "";
  Size: string = "";
  config: vscode.WorkspaceConfiguration;

  constructor() {
    this.config = vscode.workspace.getConfiguration("background");
    this.filePath = this.config.get<string>("filepath", "");
    this.Opacity = this.config.get<string>("opacity", "1");
    this.Alignment = this.config.get<string>("alignment", "Top Left");
    this.Size = this.config.get<string>("size", "cover");
  }

  SetConfig(configName: string, configVal: any) {
    this.config.update(
      configName,
      configVal,
      vscode.ConfigurationTarget.Global
    );
  }

  GetConfig(configName: string): string {
    let value: string | undefined = this.config.get<string>(configName);
    if (value) {
      console.log(value);
      return value;
    }
    return "";
  }
}
export default new Config();
