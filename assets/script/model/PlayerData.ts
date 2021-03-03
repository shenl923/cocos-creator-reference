import { BaseDate } from "../framework/BaseData";
import { _decorator, Component } from "cc";
import { Singleton } from "../framework/decorate/Singleton";
const { ccclass, property } = _decorator;

type IPlayer = {
  gold: number;
  userId: string;
}


@ccclass("playerData")
@Singleton
class PlayerData extends BaseDate<IPlayer> {

}