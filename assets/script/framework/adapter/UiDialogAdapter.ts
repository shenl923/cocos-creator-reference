import { _decorator, Component, Sprite, Node, EventTouch } from 'cc';
import AudioService from '../services/AudioService';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('UIDialogAdapter')
@requireComponent(Node)
export class UIDialogAdapter extends Component {

    @property({tooltip: '跟节点', type: Node})
    uiRoot!: Node ;

    @property({tooltip: '是否是模态对话框'})
    isModal: boolean = true;

    start() {
      // console.warn(132);
      // this.uiRoot.on(Node.EventType.TOUCH_START, (t: any)=> {
      //   console.warn(1)
      //   return false;
      // });

      // this.uiRoot.on(Node.EventType.TOUCH_MOVE, (t: any)=> {
      //   console.warn(2)
      //   return true;
      // });

      // this.uiRoot.on(Node.EventType.TOUCH_END, (t: any)=> {
      //   console.warn(3)
      //   return true;
      // });
  
    }

}