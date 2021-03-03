import {
  Component,
  _decorator,
  Node,
  Vec2,
  EventTouch,
  Vec3,
  EventHandler,
} from "cc";
const { ccclass, property } = _decorator;

// const clickEvent = {
//   default: [],
//   type: EventHandler,
// };

@ccclass("NodeAdapter")
export class NodeAdapter extends Component {
  // @property(Event)
  // event: Event = null!;
  private vec2ToVec3(pos: Vec2) {
    return new Vec3(pos.x, pos.y, 0);
  }

  @property({ type: Boolean, tooltip: "开启拖拽事件" })
  dragable: boolean = false;

  @property({
    type: EventHandler,
    tooltip: "拖拽回调事件@require: dragable = true",
  })
  dragEndCallBack: EventHandler = new EventHandler();

  setDragAble() {
    //let startPos = new Vec2(0, 0);
    this.node.on(Node.EventType.TOUCH_START, (sender: EventTouch) => {
      const { target } = sender;
      if (target instanceof Node) {
        this.node.setWorldPosition(this.vec2ToVec3(sender.getUILocation()));
      }
    });

    this.node.on(Node.EventType.TOUCH_MOVE, (sender: EventTouch) => {
      const { target } = sender;
      if (target instanceof Node) {
        //this.node.setPosition(this.vec2ToVec3(sender.getUILocation()));
        this.node.setWorldPosition(this.vec2ToVec3(sender.getUILocation()));
      }
    });

    this.node.on(Node.EventType.TOUCH_END, (end: any) => {
      this.dragEndCallBack.emit([]);
    });
  }

  start() {
    if (this.dragable) {
      this.setDragAble();
    }
  }
}
