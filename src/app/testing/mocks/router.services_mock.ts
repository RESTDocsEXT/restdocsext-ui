import { AbstractMockObservableService } from '../index';
import { UrlSegment } from '@angular/router';

export class MockParams extends AbstractMockObservableService {

  constructor(private _params?: {[key: string]: any}) {
    super(MockParams);

    this.content = _params;
  }
}

export class MockUrl extends AbstractMockObservableService {
  constructor(private _url?: UrlSegment[]) {
    super(MockUrl);

    this.content = _url;
  }
}

export class MockActivatedRoute {
  params?: MockParams;
  url?: MockUrl;

  constructor(params?: {[key: string]: any}, url?: UrlSegment[]) {
    this.params = new MockParams(params);
    this.url = new MockUrl(url);
  }

  setUrl(url: UrlSegment[]) {
    this.url = new MockUrl(url);
  }

  setParams(params?: {[key: string]: any}) {
    this.params = new MockParams(params);
  }
}
