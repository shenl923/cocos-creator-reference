import { sys } from "cc";
import { Singleton } from "../decorate/Singleton";

/**
 * jsb 只支持native H5下为null
 */
@Singleton
export class FileService {
  //static path = jsb.fileUtils.getWritablePath();
  private state = {};

  public saveJson(key: string, jsonData: Object) {
    const zipStr = JSON.stringify(jsonData);

    if (!sys.isNative) {
      const ls = sys.localStorage;
      ls.setItem(key, zipStr);
      return;
    } else {
      const data = Object.assign({}, this.state, { key: zipStr });
      jsb.fileUtils.writeToFile(data);
    }
  }

  public getfileData(key: string) {
    if (sys.isNative) {
      const path = this.getWritablePath();
      const valueObject = jsb.fileUtils.getValueMapFromFile(path);
      return valueObject[key];
    } else {
      return JSON.parse(sys.localStorage.getItem(key));
    }
  }

  public getWritablePath() {
    const platform = sys.platform;
    let path = "";
    if (platform === sys.OS_WINDOWS) {
      path = "src/custom_data";
    } else if (platform === sys.OS_LINUX) {
      path = "./custom_data";
    } else {
      if (sys.isNative) {
        path = jsb.fileUtils.getWritablePath();
        path = path + "custom_data";
      } else {
        path = "src/custom_data";
      }
    }
    return path;
  }
}
