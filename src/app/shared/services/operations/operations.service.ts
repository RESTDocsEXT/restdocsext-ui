
import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { Operation } from '../../models';
import { RESTDOCSEXT_CONFIG } from '../../../index';

@Injectable()
export class OperationsService {

  private _operations: Map<string, Operation[]> = new Map<string, Operation[]>();
  private _currentOperation = new ReplaySubject<Operation>(1);

  get operations(): Map<string, Operation[]> {
    return this._operations;
  }

  constructor(@Inject(RESTDOCSEXT_CONFIG) confJson: string) {
    let config = JSON.parse(confJson);
    this.convertConfigToOperations(config);
  }

  /**
   * Set the current operation and emits to all subscribers of the
   * current operation.
   * 
   * @argument operation  The operation to set as the current operation.
   */
  set currentOperation(operation: Operation) {
    this._currentOperation.next(operation);
  }

  /**
   * Get an `Observable` of the current `Operation`
   * 
   * @returns An Observable that emits the current operation.
   */
  get currentOperation$(): Observable<Operation> {
    return this._currentOperation.asObservable();
  }

  /**
   * Lookup an `Operation` either by its `id` or by its url-friendly `name`.
   * 
   * @argument identifier Either the numberic identifier or the operation string name
   *           converted to be URL friendly.
   */
  findOperation(identifier: number | string): Operation {
    let operation: Operation = null;
    let it = this.operations.values();
    let next = it.next(),
        op: Operation,
        ops: Operation[];

    do {
      ops = next.value;
      op = ops.find((o: Operation) => {
        if (typeof identifier === 'number') {
          return o.id === identifier;
        } else {
          return o.nameForUrl === identifier;
        }
      });
      if (op) {
        operation = op;
        break;
      }
      next = it.next();
    } while (!next.done);

    if (!op) {
      throw new Error(`No operation found with identifer ${identifier}.`);
    }

    return operation;
  }

  private convertConfigToOperations(config: any): void {
    let collections: any[] = config.collections;
    let idCounter = 0;

    collections.sort(this.collectionComparator);
    for (let i = 0; i < collections.length; i++) {
      let collection = collections[i];
      collection.apis.sort(this.apiComparator);
      let ops: Operation[] = [];
      for (let j = 0; j < collection.apis.length; j++) {
        let api = collection.apis[j];
        api.id = ++idCounter;
        ops.push(Operation.fromConfig(api));
      }
      this._operations.set(collection.name, ops);
    }
  }

  private collectionComparator = (collection1, collection2): number => {
    return this.basicObjectComparator(collection1, collection2, 'name');
  }

  private apiComparator = (api1, api2): number => {
    return this.basicObjectComparator(api1, api2, 'uri');
  }

  private basicObjectComparator(obj1, obj2, property: string): number {
    let val1 = obj1[property],
        val2 = obj2[property];
    if (val1 > val2) {
      return 1;
    } else if (val1 === val2) {
      return 0;
    } else {
      return -1;
    }
  }
}
