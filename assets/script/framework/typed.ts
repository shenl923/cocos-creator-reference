export type Constructor<T = unknown> = new (...args: any[]) => T;

export const SINGLETON_KEY = Symbol();
export type ISingleton<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never
};

