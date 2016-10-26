import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';

import { RequestService } from './shared/request.service';
import { OperationsService } from '../../shared/services/operations';
import { StylesService } from '../../shared/services/styles';
import { OperationRequest, OperationResponse, Operation } from '../../shared/models';

@Component({
  selector: 'app-rest-client',
  templateUrl: './rest-client.component.html',
  styleUrls: ['./rest-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ RequestService ]
})
export class RestClientComponent implements OnInit, OnDestroy {

  currentView: string = 'Request';
  views: string[] = ['Request', 'Preview', 'Response'];

  request: OperationRequest;
  response: OperationResponse;
  operation: Operation;

  subscription: Subscription;

  constructor(private requestService: RequestService,
    private operationsService: OperationsService,
    private styles: StylesService) {

  }

  ngOnInit() {
    this.subscription = this.operationsService.currentOperation$
      .subscribe(op => {
        this.operation = op;
        this.request = OperationRequest.fromOperation(op);
        this.response = null;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  sendRequest() {
    this.requestService.sendRequest(this.request)
      .subscribe(
      (res: OperationResponse) => {
        this.response = res;
        this.gotoResponseView();
      },
      (res: Response) => {
        this.response = OperationResponse.fromHttpResponse(res);
        this.gotoResponseView();
      });
  }

  gotoResponseView() {
    this.currentView = 'Response';
  }

  getDisplay(name) {
    return name === this.currentView ? 'block' : 'none';
  }

  getStatusColor() {
    if (this.response) {
      return this.styles.getStatusColor(this.response.status);
    }
  }
}
