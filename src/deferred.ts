export type IDeferred<T> = new () => InsDeferred<T>;

export interface InsDeferred<T> {
  promise: Promise<T>;

  resolve(value?: T | PromiseLike<T>): void;

  reject(reason?: any): void;

  finished(): void;
}
