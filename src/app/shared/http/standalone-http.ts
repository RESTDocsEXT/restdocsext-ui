import { ReflectiveInjector } from '@angular/core';
import {
  Http, CookieXSRFStrategy, XSRFStrategy, RequestOptions, BaseRequestOptions,
  ResponseOptions, BaseResponseOptions, XHRBackend, BrowserXhr
} from '@angular/http';

class NoopXSRFStrategy extends CookieXSRFStrategy {
  configureRequest(request) {
    // noop
  }
}

/**
 * Creates an `Http` instance to be used outside of an Angular app.
 */
export class StandaloneHttp {

  static newInstance(): Http {
    let providers = [
      {
        provide: Http, useFactory: (backend: XHRBackend, options: RequestOptions) => {
          return new Http(backend, options);
        },
        deps: [XHRBackend, RequestOptions]
      },
      BrowserXhr,
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ResponseOptions, useClass: BaseResponseOptions },
      XHRBackend,
      { provide: XSRFStrategy, useValue: new NoopXSRFStrategy() },
    ];
    return ReflectiveInjector.resolveAndCreate(providers).get(Http);
  }
}
