import { Component, ViewEncapsulation, AfterViewInit,
         Input, OnChanges, SimpleChange } from '@angular/core';

import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap/tabset/tabset';

import { isPresent } from '../../../shared/util';
import { Operation } from '../../../shared/models';
import { OperationRequest } from '../../../shared/models';
import { StylesService } from '../../../shared/services/styles';
import { Configuration } from '../../../shared/services/configuration';

@Component({
  selector: 'rest-client-request',
  templateUrl: './request.component.html',
  styles: [ require('./request.component.scss') ],
  encapsulation: ViewEncapsulation.None
})
export class RestClientRequestComponent implements AfterViewInit, OnChanges {

  @Input() request: OperationRequest;
  @Input() operation: Operation;
  baseUri: string;

  tabIds = [
    'request-body-tab', 'request-path-params-tab',
    'request-request-params-tabs', 'request-request-headers-tab'
  ];

  private viewInitialized: boolean = false;

  constructor(private styles: StylesService,
              private config: Configuration) {
    this.baseUri = config.baseUri;
  }

  onTabChanged(event: NgbTabChangeEvent) {
    this.updateActiveClass(event.activeId, event.nextId);
  }

  ngAfterViewInit() {
    if (this.request) {
      this.initializeActiveClass(this.request);
    }
    this.viewInitialized = true;
  }

  ngOnChanges(changes: {[propertyKey: string]: SimpleChange}) {
    let req: OperationRequest = changes['request'].currentValue;
    if (req && this.viewInitialized) {
     this.initializeActiveClass(req);
    }
  }

  showBody(): boolean {
    return this.request ? isPresent(this.request.requestBody) : false;
  }

  methodClass() {
    return this.request ? this.styles.getMethodColor(this.request.httpMethod) : '';
  }

  onTextChanged(text) {
    // this.request.requestBody = text;
  }

  onPathParamChange(value: string, index: number) {
    this.request.updatePathParameter(index, value);
  }

  addRequestParameter(name) {
    this.request.addRequestParameter(name);
  }

  onRequestParamChange(value: string, index: number) {
    this.request.updateRequestParameter(index, value);
  }

  onRemoveRequestParam(index: number) {
    this.request.removeRequestParameter(index);
  }

  addRequestHeader(name?: string) {
    this.request.addRequestHeader(name);
  }

  onRemoveRequestHeader(index: number) {
    this.request.removeRequestHeader(index);
  }

  private initializeActiveClass(request: OperationRequest) {
    if (request) {
      if (request.requestBody) {
        this.updateActiveClass(null, this.tabIds[0]);
      } else if (request.pathParameters) {
        this.updateActiveClass(null, this.tabIds[1]);
      } else if (request.requestParameters) {
        this.updateActiveClass(null, this.tabIds[2]);
      } else if (request.requestHeaders) {
        this.updateActiveClass(null, this.tabIds[3]);
      }
    }
  }

  private updateActiveClass(oldId, newId) {
    // bootstrap tabs sets the .active class on the child anchor link.
    // we need it on the parent list item to style the tab border.
    if (oldId) {
      let oldActiveEl = document.getElementById(oldId);
      if (oldActiveEl) {
        oldActiveEl.parentElement.classList.remove('active');
      }
    }
    if (newId) {
      let newActiveEl = document.getElementById(newId);
      if (newActiveEl) {
        newActiveEl.parentElement.classList.add('active');
      }
    }
  }
}
