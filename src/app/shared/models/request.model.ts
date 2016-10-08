import { Request, Headers, RequestOptions } from '@angular/http';

import { NamedDescriptor, KeyValuePair, Operation } from './index';
import { isPresent, isBlank } from '../util';

/**
 * Reprent the `OperationRequest` URL. It will hold the orginal URL
 * with possible templates, along the the current value (after updates).
 * 
 * @author Paul Samsotha
 */
export class RequestUrl {
  current: string;

  constructor(public template: string) {
    this.current = this.template;
  }

  toString() {
    return this.current;
  }
}

export class OperationRequest {

  readonly uri: RequestUrl;
  readonly httpMethod: string;
  requestBody: string;
  pathParameters: KeyValuePair[];

  requestParameters: KeyValuePair[];
  requestHeaders: KeyValuePair[];

  private REQUEST_PARAMETER = 'request parameter';
  private REQUEST_HEADER = 'request header';
  private PATH_PARAMETER = 'path parameter';

  /**
   * Create an `OperationRequest` from an `Operation`.
   * 
   * @argument The `Operation` from which to create the `OperationResponse`
   */
  static fromOperation(op: Operation): OperationRequest {
    return new OperationRequest(op.path, op.httpMethod, op.requestBody, op.pathParameters);
  }

  /**
   * RequestModel constructor. Only the uri, method, and path parameter descriptors
   * are needed. The other parameters and headers are added on demand by the UI, 
   * so they are added later. With path parameters, we will need to replace the 
   * templates in the uri, so they are mandatory.
   *
   * @argument uri The URI (may contain templates), e.g. `/api/pets/{id}`.
   * @argument httpMethod The HTTP method accociated with this request.
   * @argument requestBody The initial request body of the request (optional).
   * @argument pathParameters The path parameter descriptors (optional).
   *
   */
  constructor(uri: string,
              httpMethod: string,
              requestBody: string,
              pathParameters?: NamedDescriptor[]) {
    this.uri = new RequestUrl(uri);
    this.httpMethod = httpMethod.toUpperCase();
    this.requestBody = requestBody;
    this.pathParameters = this.convertPathParameters(pathParameters);
  }

  /**
   * Convert path parameters from named descriptors to key valur pairs.
   *
   * @argument pathParams The path parameters in named descriptor format.
   *
   * @returns A key-value pair array of the path parameters.
   */
  private convertPathParameters(pathParams: NamedDescriptor[]): KeyValuePair[] {
    if (isBlank(pathParams) || pathParams.length === 0) {
      return null;
    }

    let result: KeyValuePair[] = [];
    pathParams.forEach((param: NamedDescriptor) => {
      let template = '{' + param.name + '}';
      let pair: KeyValuePair = { key: param.name, value: template };
      pair['template'] = template;
      result.push(pair);
    });
    return result;
  }

  /**
   * This method should be called instead of directly interacting with
   * the path parameters. This method will automatically update the
   * uri template with a call to `updateUriTemplate()`. If working directly
   * with the path parameters, one should make sure to explicitly call
   * the `updateUriTemplate` method.
   *
   * @argument index The index of the path parameter in this request path parameter array.
   * @argument value The new value for this path parameter.
   */
  updatePathParameter(index: number, value: string): void {
    if (isPresent(this.pathParameters[index])) {
      this.pathParameters[index].value = value;
      this.updateUriTemplate(index);
    }
  }

  /**
   * Updates the uri, which may be initialized with templates.
   * 
   * This method should be called any time the path parameters are updated.
   * This will update the final URI that is to be used for the request.
   */
  private updateUriTemplate(index): void {
    if (isPresent(this.pathParameters) && this.pathParameters.length > 0) {
      let param = this.pathParameters[index];
      if (isPresent(param)) {
        let newUrl = this.uri.template;
        for (let param of this.pathParameters) {
          newUrl = newUrl.replace(param['template'], param.value);
        }
        this.uri.current = newUrl;
      }
    }
  }

  /**
   * Adds an request parameter object to the model, initialized with all null fields. 
   * The null fields should be updated by the UI.
   * 
   * @argument name The name of the requet parameter (optional). Default null value.
   */
  addRequestParameter(name: string = null): void {
    if (isBlank(this.requestParameters)) {
      this.requestParameters = [];
    }
    this.requestParameters.push({ key: name, value: null });
    this.updateQueryString();
  }

  /**
   * Remove a request parameters from the model. We make the property null
   * when the array is empty.
   * 
   * @argument index The index of the request parameter this request's request parameter array.
   */
  removeRequestParameter(index: number): void {
    if (isPresent(this.requestParameters)) {
      this.requestParameters.splice(index, 1);
      if (this.requestParameters.length === 0) {
        this.requestParameters = null;
      }
      this.updateQueryString(true);
    }
  }

  /**
   * Update a request parameter value.
   * 
   * @argument index The index of the request parameter this request's request parameter array.
   * @argument value The new value for the request parameter.
   */
  updateRequestParameter(index: number, value: string): void {
    if (isPresent(this.requestParameters)) {
      let param = this.requestParameters[index];
      if (param) {
        param.value = value;
        this.updateQueryString();
      }
    }
  }

  /** 
   * Updates the query string in the URL. The method should be called when reuqest 
   * parameters are updated.
   * 
   * @argument isRemove Whether or not this update is a remove operation (optional).
   *           Default is false.
   *
   */
  private updateQueryString(isRemove = false): void {
    if (isPresent(this.requestParameters) && this.getRequestParametersType() === 'query') {
      let uri = this.uri;
      let params = this.requestParameters;
      if (params.length > 0 && params[0].key) {
        if (uri.current.indexOf('?') !== -1) {
          uri.current = uri.current.split('?')[0];
        }

        let query = '?';
        let array = [];
        for (let i = 0; i < params.length; i++) {
          if (params[i].key) {
            array.push(params[i].key + '=' + params[i].value);
          }
        }
        query += array.join('&');
        this.uri.current = uri.current + query;
      }

      // When a query parameter is being removed and it is the last in the list,
      // we want to make sure to remove the `?` from the URI.
      if (isRemove) {
        if (params.length === 0) {
          if (uri.current.indexOf('?') !== -1) {
            this.uri.current = uri.current.split('?')[0];
          }
        }
      }
    } else {
      if (isRemove) {
        this.uri.current = this.uri.current.split('?')[0];
      }
    }
  }

  /**
   * TODO: should this be in the `ApiModel` instead?
   * 
   * Get the request parameters type based on the HTTP method. It is possible
   * that a request may be a POST/PUT request and still have query parameters,
   * but this distinction is not made in Spring RestDocs. So we will follow suit
   * until we decide to widen the project to be compatible with any other frameworks.
   * 
   * @returns Whether the request parameters type is form or query.
   */
  private getRequestParametersType(): string {
    return this.httpMethod === 'POST' || this.httpMethod === 'PUT'
      ? 'form' : 'query';
  }

  /**
   * Add a header object to the model, initialized wih all null fields.
   * The fields should be updated by the UI.
   * 
   * @argument name The name of the header (optional).
   */
  addRequestHeader(name?: string): void {
    if (isBlank(this.requestHeaders)) {
      this.requestHeaders = [];
    }
    if (name) {
      this.requestHeaders.push({ key: name, value: null });
    } else {
      this.requestHeaders.push({ key: null, value: null });
    }
  }

  /**
   * Remove a header from the model. We make the property null when 
   * the array is empty.
   * 
   * @argument index The index of the header in this request headers array.
   */
  removeRequestHeader(index: number): void {
    if (isPresent(this.requestHeaders)) {
      this.requestHeaders.splice(index, 1);
      if (this.requestHeaders.length === 0) {
        this.requestHeaders = null;
      }
    }
  }

  /**
   * Determines if the model is in a valid states. The checks done are as follows:
   * 
   * 1. All path parameters should have valid values. Ultimately having no templates in the URI.
   * 2. All request parameters should have valid values.
   * 3. Add request headers should have valid values.
   * 
   * Returs an error array with information about problems. All problems will be listed.
   * Callers should check for empty array, meaning there are no errors.
   * 
   * TODO: we are currently just returning an simple array with string messages. Maybe 
   * think of some better format.
   * 
   * @returns An array of error messages. It will be empty if there are no errors.
   */
  checkInvalidState(): Array<string> {
    let errors: Array<string> = [];

    this.validateParameters(this.pathParameters, this.PATH_PARAMETER, errors);
    this.validateParameters(this.requestParameters, this.REQUEST_PARAMETER, errors);
    this.validateParameters(this.requestHeaders, this.REQUEST_HEADER, errors);

    return errors;
  }

  private validateParameters(parameters: KeyValuePair[], paramType, errors: Array<string>) {
    if (isPresent(parameters)) {
      for (let i = 0; i < parameters.length; i++) {
        // path parameters will always have a key. So we only check request
        // parameters, as they are initialized with an object with empty fields.
        if (paramType === this.REQUEST_HEADER || paramType === this.REQUEST_PARAMETER) {
          if (parameters[i].key && !parameters[i].value) {
            errors.push('Missing ' + paramType + ' value for ' + parameters[i].key);
          }
        } else {
          if (!parameters[i].value) {
            errors.push('Missing ' + paramType + ' value for ' + parameters[i].key);
          }
          let pattern = new RegExp(/\{.*\}/);
          if (pattern.test(parameters[i].value)) {
            errors.push('The ' + paramType + ' '
              + parameters[i].key + ' still has a template value');
          }
        }
      }
    }
  }

  /**
   * Converts this `OperationRequest` into an Angular `Request`.
   * 
   * @argument baseUrl The base URL for this request.
   * @returns The Angular `Request`.
   */
  toAngularRequest(baseUrl: string): Request {
    let options = new RequestOptions({
      url: `${baseUrl}${this.uri.current}`,
      method: this.httpMethod,
      body: this.requestBody,
      headers: new Headers(this.requestHeaders)
    });

    return new Request(options);
  }
}
