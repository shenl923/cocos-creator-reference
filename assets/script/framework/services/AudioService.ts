import { _decorator, AudioClip, sys } from "cc";
import { Singleton } from "../decorate/Singleton";
import { ResourceServices } from "./ResourceServices";

export enum EAudioType {
  MUSIC,
  SOUND,
}

interface IAudioObj {
  clip: AudioClip;
  loop: boolean;
  type: EAudioType;
}

@Singleton
export default class AudioService {
  private musicVolume: number = 1;
  private soundVolume: number = 1;

  private audios: { [key: string]: IAudioObj } = {};

  play(name: string, loop = false, type = EAudioType.SOUND) {

    let path = `audio/${type == EAudioType.SOUND ? 'sound' : 'music'}/`;
    path = path + name;

    // if (this.audios.hasOwnProperty(name)) {
    //   this._playClip(name, type);
    //   return;
    // }

    ResourceServices.loadRes(path, AudioClip, (error, audioClip) => {
      if(error) return ;
      const audio: IAudioObj = {
        clip: audioClip,
        loop,
        type: type,
      };
      this.audios[name] = audio;
      this._playClip(name, type);
    });
  }

  playSound(name: string) {
    this.play(name, false);
  }

  playMusic(name: string, loop = true) {
    this.play(name, loop, EAudioType.MUSIC);
  }

  private _playClip(name: string, type: EAudioType) {
    let audio = this.audios[name];
    const { musicVolume, soundVolume } = this;
    const volume = EAudioType.MUSIC === type ? musicVolume : soundVolume;

    const { clip, loop } = audio;
    clip.setVolume(volume);
    clip.setLoop(loop);
    clip.play();
  }

  stop(name: string) {
    if (this.audios.hasOwnProperty(name)) {
      let audio = this.audios[name];
      audio.clip.stop();
    }
  }

  pauseAll() {
    for (let item in this.audios) {
      if (this.audios.hasOwnProperty(item)) {
        let audio = this.audios[item];
        audio.clip.pause();
      }
    }
  }

  resumeAll() {
    for (let item in this.audios) {
      if (this.audios.hasOwnProperty(item)) {
        let audio = this.audios[item];
        audio.clip.play();
      }
    }
  }

  setVolume(flag: number) {
    for (let item in this.audios) {
      const { type, clip } = this.audios[item];
      if (type === EAudioType.MUSIC) {
        clip.setVolume(flag);
        this.musicVolume = flag;
      }
    }
  }
}
