import { OperationRequest, Operation } from './index';
import { isPresent, isBlank } from '../util';

describe('model: OperationRequest', () => {

  let request: OperationRequest;

  beforeEach(() => {
    let op: Operation = {
      id: 1,
      name: 'Get a dog',
      path: 'http://example.com/dogs/{dogId}/owner/{ownerId}',
      httpMethod: 'GET',
      description: 'Get a Pet',
      collection: 'Pets',
      pathParameters: [
        { name: 'dogId', description: 'id of the dog' },
        { name: 'ownerId', description: 'id of the owner' },
      ],
      requestParameters: [
        { name: 'dummy', description: 'a dummy request parameter' }
      ],
      requestBody: 'example request body',
      nameForUrl: null
    };

    request = OperationRequest.fromOperation(op);
  });

  it('should contain the correct data', () => {
    expect(request.uri.current).toBe('http://example.com/dogs/{dogId}/owner/{ownerId}');
    expect(request.httpMethod).toBe('GET');
    expect(isPresent(request.pathParameters)).toBe(true);
    expect(request.pathParameters instanceof Array).toBe(true);
    expect(request.pathParameters[0].key).toBe('dogId');
    expect(request.pathParameters[0].value).toBe('{dogId}');
    expect(request.pathParameters[1].key).toBe('ownerId');
    expect(request.pathParameters[1].value).toBe('{ownerId}');

    // request model should not copy requestParameters
    expect(isBlank(request.requestParameters)).toBe(true);
    expect(isBlank(request.requestHeaders)).toBe(true);
    expect(request.requestBody).toBe('example request body');
  });

  describe('when updating a path parameter', () => {
    it('should replace the template correctly', () => {
      request.updatePathParameter(0, '1234');
      expect(request.uri.current).toBe('http://example.com/dogs/1234/owner/{ownerId}');

      request.updatePathParameter(1, '1234');
      expect(request.uri.current).toBe('http://example.com/dogs/1234/owner/1234');
    });
  });

  describe('when adding a request parameter', () => {
    it('should be added to the model with the value', () => {
      request.addRequestParameter();
      expect(isPresent(request.requestParameters)).toBe(true);
      expect(request.requestParameters[0].key).toBe(null);
      expect(request.requestParameters[0].value).toBe(null);

      request.addRequestParameter('filter');
      expect(request.requestParameters[1].key).toBe('filter');
      expect(request.requestParameters[1].value).toBe(null);
    });
  });

});
