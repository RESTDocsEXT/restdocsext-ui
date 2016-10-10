
import { AbstractMockObservableService } from '../index';
import { PagesService } from '../../shared/services/pages';
import Spy = jasmine.Spy;

export class MockPagesService extends AbstractMockObservableService {

  currentPageSpy: Spy;

  constructor() {
    super(PagesService);
  }

  get currentPage$() {
    return this;
  }

  set currentPage(path: string) {
    this._fakeContent = path;
  }
}
