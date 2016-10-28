import { Component, ViewEncapsulation, Input } from '@angular/core';

import { OperationResponse } from '../../../shared/models';
import { isPresent } from '../../../shared/util';

@Component({
  selector: 'rest-client-response',
  templateUrl: './response.component.html',
  styles: [ require('./response.component.scss') ],
  encapsulation: ViewEncapsulation.None
})
export class RestClientResponseComponent {

  @Input() response: OperationResponse;

  showBody(): boolean {
    return this.response ? isPresent(this.response.data) : false;
  }

  onTabChanged($event) {

  }
}
