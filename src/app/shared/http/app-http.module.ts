import { NgModule, Injector, ModuleWithProviders } from '@angular/core';
import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy } from '@angular/http';

import { InMemoryBackendService, InMemoryDbService } from 'angular-in-memory-web-api';

export class MockData implements InMemoryDbService {
  createDb() {
    let birds = [
      { id: 1, name: 'Big Bird' },
      { id: 2, name: 'Donald' },
      { id: 3, name: 'Tweety' }
    ];
    let cats = [
      { id: 1, name: 'Fluffy' },
      { id: 2, name: 'Snowball' },
      { id: 3, name: 'Heithcliff' },
    ];
    let dogs = [
      { id: 1, name: 'Clifford' },
      { id: 2, name: 'Beethoven' },
      { id: 3, name: 'Scooby' },
    ];
    return { birds, cats, dogs };
  }
}

@NgModule({
  imports: [HttpModule],
})
export class AppHttpModule {
  static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: AppHttpModule,
      providers: [
        {
          provide: XHRBackend,
          useFactory: (injector: Injector, browser: BrowserXhr,
            xsrf: XSRFStrategy, options: ResponseOptions): any => {
            if (environment.production) {
              return new XHRBackend(browser, options, xsrf);
            } else {
              return new InMemoryBackendService(injector, new MockData(), {
                passThruUnknownUrl: true
              });
            }
          },
          deps: [Injector, BrowserXhr, XSRFStrategy, ResponseOptions]
        }
      ]
    };
  }
}
