import { AbstractMockObservableService } from './observable.service_mock';
import { Operation } from '../../shared/models/operation.model';
import { OperationsService } from '../../shared/services/operations/operations.service';

export class MockOperationsService extends AbstractMockObservableService {

  operations: Map<String, Operation[]>;

  private _foundOperation: Operation;

  constructor() {
    super(OperationsService);
  }

  get currentOperation$ () {
    return this;
  }

  set currenOperation(op: Operation) {
    this._fakeContent = op;
  }

  findOperation(id: any) {
    return this._foundOperation;
  }

  set foundOperation(op: Operation) {
    this._foundOperation = op;
  }
}
