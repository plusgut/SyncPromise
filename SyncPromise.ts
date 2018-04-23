type promiseResolveCallback<T> = (value: T) => any;
type promiseRejectCallback = () => any;
type executor<T> = (resolve: promiseResolveCallback<T>, reject: promiseRejectCallback) => T;
type callbacks = {
  type: 'resolve' | 'reject',
  callback: (value: any) => any;
  promise: SyncPromise<any>
}[];

export default class SyncPromise<T> {
  private callbacks: callbacks = [];
  private executor: executor<T>; 
  constructor(executor: executor<T>) {
    this.executor = executor;
  }

  public then(promiseResolveCallback: promiseResolveCallback<T>) {
    const promiseCallback = () => {

    }
    const promise = new SyncPromise(() => undefined);
    
    this.callbacks.push({
      promise,
      type: 'resolve',
      callback: promiseResolveCallback,
    })
    return 
  }

  public catch(promiseRejectCallback: promiseRejectCallback) {
    const promiseCallback = () => {

    }
    const promise = new SyncPromise(() => undefined);

    this.callbacks.push({
      promise,
      type: 'reject',
      callback: promiseRejectCallback,
    })
    return new SyncPromise(() => undefined);
  }

  public callExecutor() {
    const result = this.executor(this.resolve.bind(this), this.reject.bind(this));
    this.resolve(result, );
  }

  private resolve(value: T) {
    this.callCallbacks(value, this.callbacks.filter(callback => callback.type === 'resolve'));
  }

  private reject(value: any, callbacks) {
    this.callCallbacks(value, this.callbacks.filter(callback => callback.type === 'reject'));
  }

  private callCallbacks(value: any, callbacks: callbacks) {
    callbacks.forEach(callback => {
      callback.callback(value);
    });
  }
}
