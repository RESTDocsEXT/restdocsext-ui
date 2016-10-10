/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { inject, async, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Operation } from '../../shared/models';
import { OperationsService } from '../../shared/services/operations';
import { PagesService } from '../../shared/services/pages';
import { MainContentComponent } from './main-content.component';
import { GENERAL_ROOT_PATH, OPERATIONS_ROOT_PATH } from '../../app.properties';

import { MockOperationsService, MockActivatedRoute,
         mockJsonOperation, MOCK_CONFIG_PROVIDER, MockPagesService } from '../../testing';

const HTML = '<h1>Testing</h1>';

@Component({
  selector: 'app-documentation',
  template: ''
})
class MockDocumentationComponent {}

@Component({
  selector: 'app-rest-client',
  template: ''
})
class MockRestClientComponent {}

describe('component: MainContentComponent', () => {

  let mockOperationsService: MockOperationsService;
  let mockPagesService: MockPagesService;
  let mockRoute: MockActivatedRoute;
  let op: Operation = Operation.fromConfig(JSON.parse(mockJsonOperation));

  beforeEach(() => {
    mockOperationsService = new MockOperationsService();
    mockPagesService = new MockPagesService();
    mockRoute = new MockActivatedRoute();

    TestBed.configureTestingModule({
      declarations: [
        MainContentComponent,
        MockDocumentationComponent,
        MockRestClientComponent
      ],
      providers: [
        { provide: PagesService, useValue: mockPagesService },
        { provide: OperationsService, useValue: mockOperationsService },
        { provide: ActivatedRoute, useValue: mockRoute },
      ]
    });
  });

  it('should set the current operation and page', async(() => {
    mockRoute.setUrl([
      {path: OPERATIONS_ROOT_PATH, parameters: null},
      {path: 'create-a-cat', parameters: null}
    ]);
    mockOperationsService.foundOperation = op;

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(MainContentComponent);
      let component = fixture.componentInstance;
      fixture.detectChanges();

      mockOperationsService.currentOperation$.subscribe(operation => {
        expect(operation).toBe(op);
      });
      mockPagesService.currentPage$.subscribe(page => {
        expect(`collections/cats/create-a-cat`).toEqual(page);
      });
      expect(component.isOperation).toEqual(true);
    });
  }));

  it('should set the current page', async(() => {
    mockRoute.setUrl([
      {path: GENERAL_ROOT_PATH, parameters: null},
      {path: 'authentication', parameters: null}
    ]);

    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(MainContentComponent);
      let component = fixture.componentInstance;
      fixture.detectChanges();

      mockPagesService.currentPage$.subscribe(page => {
        expect(page).toEqual(`${GENERAL_ROOT_PATH}/authentication`);
      });
    });
  }));

  it('should unsubcribe to the route url', async(() => {
    mockRoute.setUrl([
      {path: GENERAL_ROOT_PATH, parameters: null},
      {path: 'authentication', parameters: null}
    ]);

    TestBed.compileComponents().then(() => {
       let fixture = TestBed.createComponent(MainContentComponent);
       fixture.detectChanges();
       fixture.destroy();
       expect(mockRoute.url.subscription.unsubscribe).toHaveBeenCalled();
    });
  }));
});
