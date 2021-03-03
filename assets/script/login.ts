import {
  _decorator,
  Component,
  animation,
  Animation,
  js,
  Prefab,
  AnimationClip,
  Label,
} from "cc";
import Http from "./framework/network/http";
import { FileService } from "./framework/services/FileServices";
import { ResourceServices } from "./framework/services/ResourceServices";
import { Server } from "./model/TestModel";
const { ccclass, property } = _decorator;

declare const jsb: any;

@ccclass("Login")
export class Login extends Component {

  @property(Label)
  label!: Label;

  @property({type: [Number],  tooltip: "测试数组注释"})
  NodeList: number[] = [];


  start() {
    // [3]
    const ca = this.label.getComponent(Animation);
    if(ca) {
        ca.play();
    }

    // loadJson 
    // ResourceServices.loadJson<Array<Server>>('servers', (a, b)=> {
    //   console.warn(a, b);
    // })

    // FileService 
    //const file = new FileService();
    //file.saveJson('userId', {'userId': 1});
    
  }


  loginButtonCallback(event: any, event2: any) {
    //Http.post('');
    // Http.fetchGet('http://localhost:3000/health');
   // ResourceServices.loadAndaddPrefab('prefab/ui/uiRoot', this.node);
   console.warn(event, event2);

  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
