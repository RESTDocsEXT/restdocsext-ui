import { async, inject, TestBed } from '@angular/core/testing';

import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { PagesService } from './index';
import { Configuration } from '../configuration';
import { MOCK_CONFIG_PROVIDER, HttpTestingModule } from '../../../testing';

describe('service: PagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpTestingModule ],
      providers: [
        MOCK_CONFIG_PROVIDER,
        Configuration,
        PagesService,
      ]
    });
  });

  it('should set the current page on success',
      async(inject([PagesService, MockBackend], (service: PagesService, backend: MockBackend) => {

    backend.connections.subscribe((conn: MockConnection) => {
      let options = new ResponseOptions({ body: '<h2>Hello</h2>'});
      conn.mockRespond(new Response(options));
    });

    service.currentPage$.subscribe(page => {
      expect(page).toEqual('<h2>Hello</h2>');
    });

    service.currentPage = 'url';
  })));

  it('should set the current page on error',
      async(inject([PagesService, MockBackend], (service: PagesService, backend: MockBackend) => {

    backend.connections.subscribe((conn: MockConnection) => {
      conn.mockError(new Error('<h2>Error</h2>'));
    });

    service.currentPage$.subscribe(page => {
      expect(page).toContain('<h2>Error</h2>');
    });

    service.currentPage = 'url';
  })));
});
