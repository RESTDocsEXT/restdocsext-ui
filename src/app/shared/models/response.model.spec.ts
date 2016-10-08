
import { Response, ResponseOptions, Headers } from '@angular/http';

import { OperationResponse } from './index';

describe('model: OperationResponse', () => {

  let response: OperationResponse;

  beforeEach(() => {
    let resOps = new ResponseOptions({
      body: 'response body',
      status: 200,
      headers: new Headers({ 'Content-Type': 'text/plain' }),
      statusText: 'OK'
    });
    let res = new Response(resOps);
    response = OperationResponse.fromHttpResponse(res);
  });

  it('should contain the correct data from the Angular response', () => {
    expect(response.data).toBe('response body');
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.responseHeaders[0].key).toBe('content-type');
    expect(response.responseHeaders[0].value).toContain('text/plain');
  });
});
