
import { Type } from '@angular/core';
import { SpyObject } from '../index';

export class AbstractMockPromiseService extends SpyObject {

  protected _fakeContent: any;
  protected _fakeError: any;

  constructor(type: Type<any>) {
    super(type);
  }

  then(callback: Function) {
    if (callback && !this._fakeError && this._fakeContent) {
      callback(this._fakeContent);
    }
    return this;
  }

  catch(callback: Function) {
    if (callback && this._fakeError) {
      callback(this._fakeError);
    }
  }
}
