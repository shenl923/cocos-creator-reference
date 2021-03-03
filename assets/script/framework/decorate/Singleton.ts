import { SINGLETON_KEY, ISingleton } from "../typed";

export const Singleton = <T extends new (...args: any[]) => any>(type: T) =>
  new Proxy(type, {
    construct(target: ISingleton<T>, argsList, newTarget) {
      // skip the proxy for children of our target class
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argsList, newTarget);
      }
      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
      }
      return target[SINGLETON_KEY];
    },
  });
