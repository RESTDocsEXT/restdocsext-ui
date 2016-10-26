import { NgModule } from '@angular/core';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

@NgModule({
  imports: [ HttpModule],
  providers: [
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      deps: [ MockBackend, BaseRequestOptions ],
      useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
        return new Http(backend, options);
      }
    }
  ]
})
export class HttpTestingModule {

}
