/* tslint:disable:no-unused-variable */

import { Component, DebugElement, Input } from '@angular/core';
import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { RestClientComponent } from './rest-client.component';
import { RequestService } from './shared/request.service';
import { StylesService } from '../../shared/services/styles';
import { OperationsService } from '../../shared/services/operations';
import { OperationResponse, OperationRequest, Operation } from '../../shared/models';
import { AbstractMockObservableService, mockJsonOperation } from '../../testing';
import { NgBootstrapModule } from '../../shared/ngbootstrap.module';

describe('Component: RestClientComponent', () => {
  let operationsService: { currentOperation$: Subject<Operation> };
  let fixture: ComponentFixture<RestClientComponent>;
  let component: RestClientComponent;
  let debug: DebugElement;

  beforeEach(() => {
    operationsService = {
      currentOperation$: new Subject<Operation>()
    };

    TestBed.configureTestingModule({
      imports: [ NgBootstrapModule, FormsModule ],
      providers: [
        StylesService,
        { provide: OperationsService, useValue: operationsService }
      ],
      declarations: [
        RestClientComponent,
        MockRestClientPreviewComponent,
        MockRestClientRequestComponent,
        MockRestClientResponseComponent
      ]
    }).overrideComponent(RestClientComponent, {
      set: {
        providers: [
          { provide: RequestService, useClass: MockRequestService }
        ]
      }
    });

    fixture = TestBed.createComponent(RestClientComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('shold change to Request view on new operation', fakeAsync(() => {
    expect(component.currentView).toBe('Request');
    component.currentView = 'Response';

    operationsService.currentOperation$.next(Operation.fromConfig(JSON.parse(mockJsonOperation)));
    tick();
    expect(component.currentView).toBe('Request');
  }));
});

export class MockRequestService extends AbstractMockObservableService {
  constructor() {
    super(RequestService);
  }

  sendRequest(request: OperationRequest) {
    return this;
  }
}

@Component({
  selector: 'rest-client-request',
  template: '<h1>Request View</h1>'
})
class MockRestClientRequestComponent {
  @Input() request;
  @Input() operation;
}

@Component({
  selector: 'rest-client-preview',
  template: '<h1>Preview View</h1>'
})
class MockRestClientPreviewComponent {
  @Input() request;
}

@Component({
  selector: 'rest-client-response',
  template: '<h1>Response View</h1>'
})
class MockRestClientResponseComponent {
  @Input() response;
}

