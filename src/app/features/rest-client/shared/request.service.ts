
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Configuration } from '../../../shared/services/configuration';
import { OperationRequest, OperationResponse } from '../../../shared/models';

@Injectable()
export class RequestService {

  constructor(private _http: Http, private config: Configuration) {}

  sendRequest(request: OperationRequest): Observable<OperationResponse> {
    return this._http.request(request.toAngularRequest(this.config.baseUri))
      .map((res: Response) => OperationResponse.fromHttpResponse(res));
  }
}
