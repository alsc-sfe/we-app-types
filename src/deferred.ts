export type DeferredConstructor<T> = new () => DeferredInstance<T>;

export interface DeferredInstance<T> {
  promise: Promise<T>;

  resolve(value?: T | PromiseLike<T>): void;

  reject(reason?: any): void;

  finished(): void;
}
