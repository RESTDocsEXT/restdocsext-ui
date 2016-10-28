import { Component, ViewEncapsulation, Input } from '@angular/core';

import { OperationRequest } from '../../../shared/models';

@Component({
  selector: 'rest-client-preview',
  templateUrl: './preview.component.html',
  styles: [ require('./preview.component.scss') ],
  encapsulation: ViewEncapsulation.None
})
export class RestClientPreviewComponent {

  @Input() request: OperationRequest;

  getPreview(): string {
    return this.request
        ? `${this.getRequestLine()}${this.getHeaders()}<br>${this.getBody()}`
        : '';
  }

  private getBody() {
    return this.request.requestBody ? this.request.requestBody : '';
  }

  private getRequestLine() {
    return `${this.request.httpMethod} ${this.request.uri} HTTP/1.1<br>`;
  }

  private getHeaders(): string {
    let result = '';
    if (!this.request.requestHeaders) { return result; };
    for (let keyValue of this.request.requestHeaders) {
      result += `${keyValue.key}: ${keyValue.value}<br>`;
    }
    return result;
  }
}
