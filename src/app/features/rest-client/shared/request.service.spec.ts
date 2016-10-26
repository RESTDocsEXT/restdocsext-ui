import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions, Headers } from '@angular/http';

import { HttpTestingModule, mockJsonOperation } from '../../../testing';
import { Configuration } from '../../../shared/services/configuration';
import { RequestService } from './request.service';
import { OperationRequest, OperationResponse, Operation } from '../../../shared/models';

describe('service: RequestService', () => {
  let requestService: RequestService;
  let operationRequest: OperationRequest;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpTestingModule ],
      providers: [
        RequestService,
        { provide: Configuration, useValue: { baseUri: 'http://localhost/api' }}
      ]
    });

    operationRequest = OperationRequest
        .fromOperation(Operation.fromConfig(JSON.parse(mockJsonOperation)));
    requestService = TestBed.get(RequestService);
    backend = TestBed.get(MockBackend);
  });

  it('should create the OperationResponse from the Angular response', fakeAsync(() => {
    backend.connections.subscribe((conn: MockConnection) => {
      expect(conn.request.url).toEqual('http://localhost/api/cats');

      let options = new ResponseOptions({
        body: 'Some Body',
        headers: new Headers({ 'content-type': 'text/plain' }),
        status: 200,
        statusText: 'OK',
      });
      conn.mockRespond(new Response(options));
    });

    let response: OperationResponse;
    requestService.sendRequest(operationRequest).subscribe(res => {
      response = res;
    });
    tick();

    expect(response.data).toEqual('Some Body');
    expect(response.status).toEqual(200);
    expect(response.statusText).toEqual('OK');
    expect(response.responseHeaders[0].key).toBe('content-type');
  }));
});
