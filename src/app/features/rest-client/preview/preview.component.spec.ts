
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RestClientPreviewComponent } from './preview.component';
import { OperationRequest, Operation } from '../../../shared/models';
import { mockJsonOperation } from '../../../testing';

describe('component: RestClientPreviewComponent', () => {

  let fixture: ComponentFixture<RestClientPreviewComponent>;
  let component: RestClientPreviewComponent;
  let request: OperationRequest;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RestClientPreviewComponent ]
    });
    fixture = TestBed.createComponent(RestClientPreviewComponent);
    component = fixture.componentInstance;
    request = OperationRequest.fromOperation(Operation.fromConfig(JSON.parse(mockJsonOperation)));
    component.request = request;
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('.request-preview')).nativeElement;
  });

  it('should display correct default preview data format', () => {
    const html = `POST /cats HTTP/1.1<br><br>request body`;
    expect(el.innerHTML).toEqual(html);
  });

  it('should display correct data when header is added', () => {
    request.addRequestHeader('content-type');
    request.requestHeaders[0].value = 'application/json';
    fixture.detectChanges();

    const html = `POST /cats HTTP/1.1<br>content-type: application/json<br><br>request body`;
    expect(el.innerHTML).toEqual(html);
  });

  it('should display correct data when paramerer is added', () => {
    // query string only added to GET request. Maybe this will change.
    request.httpMethod = 'GET';
    request.addRequestParameter('filter');
    request.updateRequestParameter(0, 'field');
    request.requestBody = null;
    fixture.detectChanges();

    const html = `GET /cats?filter=field HTTP/1.1<br><br>`;
    expect(el.innerHTML).toEqual(html);
  });

});
