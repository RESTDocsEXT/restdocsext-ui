import { Response, Headers } from '@angular/http';
import { KeyValuePair } from './index';

/**
 * Represent a response from an API operation.
 */
export class OperationResponse {

  /**
   * Create an `OperationResponse` from an Angular `Response`.
   */
  static fromHttpResponse(res: Response): OperationResponse {
    return new OperationResponse(
      res.text(),
      res.status,
      res.statusText,
      OperationResponse.convertHeaders(res.headers)
    );
  }

  /**
   * Converts Angular `Headers` to an array of `KeyValuePair`s.
   */
  private static convertHeaders(headers: Headers): KeyValuePair[] {
    let result: KeyValuePair[] = [];
    if (headers) {
      headers.forEach((values: string[], name: string) => {
        result.push({ key: name, value: values });
      });
    }
    return result;
  }

  constructor(public data: string,
              public status: number,
              public statusText: string,
              public responseHeaders: KeyValuePair[]) {}
}
