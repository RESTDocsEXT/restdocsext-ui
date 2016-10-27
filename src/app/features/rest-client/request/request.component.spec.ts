import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { mockJsonOperation } from '../../../testing';
import { StylesService } from '../../../shared/services/styles';
import { RestClientRequestComponent } from './request.component';
import { Configuration } from '../../../shared/services/configuration';
import { OperationRequest, Operation } from '../../../shared/models';
import { NgBootstrapModule } from '../../../shared/ngbootstrap.module';
import { AceEditorDirective } from '../../../shared/directives';

describe('component: RestClientRequestComponent', () => {
  let fixture: ComponentFixture<RestClientRequestComponent>;
  let component: RestClientRequestComponent;
  let request: OperationRequest;
  let operation: Operation;
  let debug: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NgBootstrapModule.forRoot(), FormsModule ],
      declarations: [ RestClientRequestComponent, AceEditorDirective ],
      providers: [
        StylesService,
        { provide: Configuration, useValue: { baseUri: 'http://localhost:8080/api' }}
      ]
    });

    operation = Operation.fromConfig(JSON.parse(mockJsonOperation));
    request = OperationRequest.fromOperation(operation);
    fixture = TestBed.createComponent(RestClientRequestComponent);
    component = fixture.componentInstance;

    component.operation = operation;
    component.request = request;

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should show body when the operation has a body', () => {
    expect(component.showBody()).toBe(true);
    expect(debug.query(By.css('#request-body-tab'))).not.toBeNull();
    // console.log(debug.nativeElement.innerHTML);
  });

  it('should not show body when the operation has no body', () => {
    operation.requestBody = undefined;
    fixture.detectChanges();
    expect(component.showBody()).toBe(false);
    expect(debug.query(By.css('#request-body-tab'))).toBeNull();
  });

  it('should have the body tab as initially active', () => {
    expect(isActiveTab('#request-body-tab')).toBe(true);
  });

  it('should have the path params as initially acive when no body', () => {
    operation.requestBody = undefined;
    fixture.detectChanges();
    expect(isActiveTab('#request-path-params-tab')).toBe(true);
  });

  function isActiveTab(id) {
    const el = debug.query(By.css(id)).nativeElement;
    return el.classList.contains('active');
  }

});
