
import { _decorator, Component, Button } from 'cc';
import AudioService from '../services/AudioService';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('ButtonAdapter')
@requireComponent(Button)
export class ButtonAdapter extends Component {

    @property({tooltip: '点击后是否播放点击音效'})
    isPlaySound: boolean = true;

    @property({ tooltip: '点击音效名'})
    clickSoundName = 'click';

    @property({tooltip: '是否禁止快速二次点击'})
    isPreventSecondClick = true;

    @property({tooltip: '点击后多少s才能再次点击,仅isPreventSecondClick为true生效'})
    preventTime = 2;

    start () {
        // [3]
        const button = this.node.getComponent(Button)!;
        
        this.node.on('click', ()=>{
            if(this.isPreventSecondClick) {
                button.interactable = false;

                if(this.isPlaySound) {
                    //audioManager  if (this.isPlaySound) audioManager.instance.playSound(this.clickSoundName, false);
                    const audioService = new AudioService()
                    audioService.playSound(this.clickSoundName)
                }

                this.scheduleOnce(()=>{
                    if(button.node) {
                        button.interactable = true;
                    }
                }, this.preventTime)
            }
            
        })
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
