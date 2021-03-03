import {
  _decorator,
  Prefab,
  Node,
  Sprite,
  SpriteFrame,
  Texture2D,
  Asset,
  error,
  instantiate,
  find,
  resources,
  isValid,
  assetManager,
  LoadCompleteCallback,
  Constructor,
  TextAsset,
  JsonAsset,
} from "cc";

const { ccclass } = _decorator;

interface ITextAsset {
  text?: string;
  _file?: string;
  json?: string;
}

type AssetType<T = Asset> = Constructor<T>;

export class ResourceServices {
  public static loadRes<T extends Asset>(
    url: string,
    type: AssetType<T> | null,
    cb?: LoadCompleteCallback<T>
  ) {
    if (type) {
      resources.load(url, type, (err, res) => {
        if (err) {
          error(err.message || err);
          if (cb) {
            cb(err, res);
          }
          return;
        }

        if (cb) {
          cb(err, res);
        }
      });
    } else {
      resources.load(url, (err, res) => {
        if (err) {
          error(err.message || err);
          if (cb) {
            cb(err, res as T);
          }
          return;
        }
        if (cb) {
          cb(err, res as T);
        }
      });
    }
  }

  public static loadJson<T>(fileName: string, callback: LoadCompleteCallback<T>) {
      resources.load<JsonAsset>("datas/" + fileName,  (err, content)=> {
        const { json }  = content;
        if(err || !json) {
          console.error(err?.message)
          return;
        }
        const data = (json as unknown) as T;
        if(!data) {
          console.error('Json data conversion T fail: ', data);
          return;
        }
        callback(err, data);
      })
  }

  // FIXME: 优化
  public static loadAndaddPrefab(path: string, parentNode: Node) {
    resources.load<Prefab>(path, (error, pefab)=>{
      if(!error) {
        const node = instantiate(pefab);
        node.setPosition(0,0,0);
        parentNode.addChild(node);
      }
    });
  }

}
