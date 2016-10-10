import { Type } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpyObject } from '../index';

export abstract class AbstractMockObservableService extends SpyObject {

  protected _subscription: Subscription;
  protected _fakeContent: any;
  protected _fakeError: any;

  constructor(type: Type<any>) {
    super(type);

    this._subscription = new Subscription();
    spyOn(this._subscription, 'unsubscribe');
  }

  set error(err) {
    this._fakeError = err;
  }

  set content(data) {
    this._fakeContent = data;
  }

  get subscription(): Subscription {
    return this._subscription;
  }

  subscribe(next: Function, error?: Function, complete?: Function): Subscription {
    if (next && this._fakeContent && !this._fakeError) {
      next(this._fakeContent);
    }
    if (error && this._fakeError) {
      error(this._fakeError);
    }
    if (complete) {
      complete();
    }
    return this._subscription;
  }
}
