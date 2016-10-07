
import { Operation } from './index';
import { mockJsonOperation } from '../../testing';

describe('model: Operation', () => {

  let config = JSON.parse(mockJsonOperation);
  let operation: Operation;

  beforeEach(() => {
    operation = Operation.fromConfig(config);
  });

  it('should populate the Operation from the config object', () => {
    expect(operation.name).toBe('Create a cat');
    expect(operation.path).toBe('/cats');
    expect(operation.httpMethod).toBe('POST');
    expect(operation.collection).toBe('Cats');
    expect(operation.requestBody).toBe('request body');
    expect(operation.description).toBe('Create a cat');
    expect(operation.responseHeaders[0].name).toBe('Location');
    expect(operation.requestHeaders[0].name).toBe('Content-Type');
    expect(operation.requestParameters[0].name).toBe('sort');
    expect(operation.pathParameters[0].name).toBe('id');
  });
});
