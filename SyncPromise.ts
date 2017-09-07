// This is an incomplete synchronous promise implementation
type promiseCallback = (value: any) => void;
type promiseCallbackStack = {syncPromiseReturn: SyncPromiseReturn, callback: promiseCallback};

class SyncPromiseReturn {
  thenCallbacks: promiseCallbackStack[];
  catchCallbacks: promiseCallbackStack[];

  constructor() {
    this.thenCallbacks = [];
    this.catchCallbacks = [];
  }

  public executeThen(value: any) {
    this.thenCallbacks.forEach((promiseCallbackStack) => {
      const result = promiseCallbackStack.callback(value);
      promiseCallbackStack.syncPromiseReturn.executeThen(result);
    });
  }

  public executeCatch(value: any) {
    this.catchCallbacks.forEach((promiseCallbackStack) => {
      const result = promiseCallbackStack.callback(value);
      promiseCallbackStack.syncPromiseReturn.executeThen(result);
    });
  }

  public then(promiseCallback: promiseCallback) {
    const syncPromiseReturn = new SyncPromiseReturn();
    
    this.thenCallbacks.push({
      syncPromiseReturn,
      callback: promiseCallback,
    });

    return syncPromiseReturn;
  }

  public catch(promiseCallback: promiseCallback) {
    const syncPromiseReturn = new SyncPromiseReturn();
    
    this.catchCallbacks.push({
      syncPromiseReturn,
      callback: promiseCallback,
    });

    return syncPromiseReturn;
  }
}

export default class SyncPromise {
  private syncPromiseReturn: SyncPromiseReturn;
  public then: promiseCallback;
  public catch: promiseCallback;

  constructor(promiseLogic: (resolve: promiseCallback, reject: promiseCallback) => void) {
    this.syncPromiseReturn = new SyncPromiseReturn();

    const resolve = (value: any) => {
      this.syncPromiseReturn.executeThen(value);
    };

    const reject = (message: any) => {
      this.syncPromiseReturn.executeThen(message);
    };

    this.then = this.syncPromiseReturn.then.bind(this.syncPromiseReturn);
    this.catch = this.syncPromiseReturn.catch.bind(this.syncPromiseReturn);

    promiseLogic.call(this, resolve, reject);

  }
}
