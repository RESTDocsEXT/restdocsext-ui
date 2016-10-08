
import { inject, async, TestBed } from '@angular/core/testing';

import { OperationsService } from './index';
import { isPresent } from '../../util';
import { Operation } from '../../models';
import { MOCK_CONFIG_PROVIDER } from '../../../testing';

describe('service: OperationsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ MOCK_CONFIG_PROVIDER, OperationsService ]
    });
  });

  it('should contain converted Operations',
      inject([ OperationsService ], (service: OperationsService) => {

    let operations: Map<string, Operation[]> = service.operations;
    expect(isPresent(operations.get('Cats'))).toBe(true);
    expect(operations.get('Cats').length).toBe(3);
    expect(isPresent(operations.get('Dogs'))).toBe(true);
    expect(operations.get('Dogs').length).toBe(3);
  }));

  it('should contain Operations alphabetized by path',
      inject([ OperationsService ], (service: OperationsService) => {

    let operations: Operation[] = service.operations.get('Cats');
    expect(operations[0].path).toBe('/cats');
    expect(operations[1].path).toBe('/cats');
    expect(operations[2].path).toBe('/cats/{id}');
  }));

  it('should find Operation by numberic identifier',
      inject([ OperationsService ], (service: OperationsService) => {

    let op = service.findOperation(1);
    expect(isPresent(op)).toBe(true);
    expect(op.id).toBe(1);
    expect(op.name).toBe('Create a cat');

    op = service.findOperation(4);
    expect(isPresent(op)).toBe(true);
    expect(op.id).toBe(4);
    expect(op.name).toBe('Create a dog');
  }));

  it('should find Operation by the URL friendly name identifier',
      inject([ OperationsService ], (service: OperationsService) => {

    let op = service.findOperation(1);
    expect(isPresent(op)).toBe(true);
    expect(op.id).toBe(1);
    expect(op.name).toBe('Create a cat');

    op = service.findOperation(4);
    expect(isPresent(op)).toBe(true);
    expect(op.id).toBe(4);
    expect(op.name).toBe('Create a dog');
  }));

  it('should emit the current Operation when it changes',
      async(inject([ OperationsService ], (service: OperationsService) => {

    let op = service.findOperation(1);

    service.currentOperation$.subscribe((operation: Operation) => {
      expect(op.name).toEqual(operation.name);
    });

    service.currentOperation = op;
  })));
});
