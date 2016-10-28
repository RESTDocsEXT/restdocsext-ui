import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Response } from '@angular/http';

import { OperationResponse } from '../../../shared/models';
import { RestClientResponseComponent } from './response.component';

describe('component: RestClientResponseComponent', () => {

  let fixture: ComponentFixture<RestClientResponseComponent>;
  let component: RestClientResponseComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should show body when response has body', () => {
    let comp = new RestClientResponseComponent();
    comp.response = { data: 'some data' } as OperationResponse;
    expect(comp.showBody()).toBe(true);
  });

  it('should not show body when response has no body', () => {
    let comp = new RestClientResponseComponent();
    comp.response = { } as OperationResponse;
    expect(comp.showBody()).toBe(false);
  });
});
