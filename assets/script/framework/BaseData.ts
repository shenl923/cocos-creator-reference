
export abstract class BaseDate<T extends Object> {
  private State!: T;
  private stateCallBack : [keyof T, Function][] = [];


  protected getState<K extends keyof T>(key: K) : T[K] {
    return this.State[key];
  }

  protected setState<K extends keyof T>(key: K,  value: T[K]) {
    this.State[key] = value;
   
    this.stateCallBack.map( value => {
      const [_key, _callback] = value;
      if(key === _key) {
        _callback(value, key);
      }
    })
  }

  protected useState(key: keyof T, payload: (value: T[keyof T]) => void) {
    this.stateCallBack.push([key, payload]);
  }

  protected dispose() {
    this.stateCallBack = [];
  }
}
