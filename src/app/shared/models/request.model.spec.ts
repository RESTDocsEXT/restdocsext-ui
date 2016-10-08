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
    expect(request.uri).toBe('http://example.com/dogs/{dogId}/owner/{ownerId}');
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
      expect(request.uri).toBe('http://example.com/dogs/1234/owner/{ownerId}');

      request.updatePathParameter(1, '1234');
      expect(request.uri).toBe('http://example.com/dogs/1234/owner/1234');
    });

    it('should retain the query string', () => {
      request.addRequestParameter('filter');
      request.updateRequestParameter(0, 'value');

      request.updatePathParameter(0, '1234');
      expect(request.uri).toBe('http://example.com/dogs/1234/owner/{ownerId}?filter=value');

      request.updatePathParameter(1, '1234');
      expect(request.uri).toBe('http://example.com/dogs/1234/owner/1234?filter=value');
    });
  });

  describe('when adding a request parameter', () => {
    it('should be added to the model with the value', () => {
      request.addRequestParameter('filter');
      expect(isPresent(request.requestParameters)).toBe(true);
      expect(request.requestParameters[0].key).toBe('filter');
      expect(request.requestParameters[0].value).toBe(null);

      request.addRequestParameter('limit');
      expect(request.requestParameters[1].key).toBe('limit');
      expect(request.requestParameters[1].value).toBe(null);
    });
  });

  describe('when removing a request parameter', () => {
    it('should be removed from the model', () => {
      request.addRequestParameter('filter');
      request.addRequestParameter('limite');
      expect(request.requestParameters.length).toBe(2);
      request.removeRequestParameter(0);
      expect(request.requestParameters.length).toBe(1);
    });

    describe('when removing the last parameter', () => {
      it('should nullify the request parameters model property', () => {
        request.addRequestParameter('filter');
        expect(request.requestParameters.length).toBe(1);
        request.removeRequestParameter(0);
        expect(request.requestParameters).toBeNull();
      });
    });
  });

  describe('when adding a request header', () => {
    it('should be added to the model with null property values', () => {
      request.addRequestHeader();
      expect(isPresent(request.requestHeaders)).toBe(true);
      expect(request.requestHeaders[0].key).toBe(null);
      expect(request.requestHeaders[0].value).toBe(null);
    });
  });

  describe('when removing a request header', () => {
    it('should be removed from the model', () => {
      request.addRequestHeader();
      request.addRequestHeader();
      expect(request.requestHeaders.length).toBe(2);
      request.removeRequestHeader(0);
      expect(request.requestHeaders.length).toBe(1);
    });

    describe('when removing the last request header', () => {
      it('should nullify the requestHeaders property in the model', () => {
        request.addRequestHeader();
        expect(request.requestHeaders.length).toBe(1);
        request.removeRequestHeader(0);
        expect(request.requestHeaders).toBeNull();
      });
    });
  });

  describe('when updating the query string', () => {
    describe('when the update is a addition', () => {
      it('should update the query string with null value', () => {
        request.addRequestParameter('filter');
        expect(request.uri).toContain('/dogs/{dogId}/owner/{ownerId}?filter=null');
      });

      it('should update the query string when the key gets a value', () => {
        request.addRequestParameter('filter');
        request.updateRequestParameter(0, 'value');
        expect(request.uri).toContain('/dogs/{dogId}/owner/{ownerId}?filter=value');
      });
    });

    describe('when the update is a removal', () => {
      beforeEach(() => {
        request.addRequestParameter('filter');
        request.updateRequestParameter(0, 'property');
        request.addRequestParameter('limit');
        request.updateRequestParameter(1, '10');
        expect(request.uri).toContain('/owner/{ownerId}?filter=property&limit=10');
      });

      it('should update the query string when the parameter[0] is removed', () => {
        request.removeRequestParameter(0);
        expect(request.uri).toContain('/owner/{ownerId}?limit=10');
      });

      it('should update the query string when the parameter[1] is removed', () => {
        request.removeRequestParameter(1);
        expect(request.uri).toContain('/owner/{ownerId}?filter=property');
      });

      it('should update the query string when all parameters are removed', () => {
        request.removeRequestParameter(1);
        request.removeRequestParameter(0);
        expect(request.uri).toContain('/owner/{ownerId}');
      });
    });
  });

  // Note that the return value of checkInvalidState() will return an error message array.
  describe('when checking the valid state of the model', () => {
    it('should be invalid if there are templates still in the path', () => {
      // note the model uri in this test is initialized with two templates
      expect(request.checkInvalidState().length).toBe(2);
    });

    it('should be valid when path templates are filled', () => {
      request.updatePathParameter(0, '1234');
      request.updatePathParameter(1, '1234');
      expect(request.checkInvalidState().length).toBe(0);
    });

    it('should be invalid with null request parameter values', () => {
      // make path parameters valid
      request.updatePathParameter(0, '1234');
      request.updatePathParameter(1, '1234');

      request.addRequestParameter('filter');
      expect(request.checkInvalidState().length).toBe(1);
    });

    it('should be valid with request parameter value', () => {
      // make path parameters valid
      request.updatePathParameter(0, '1234');
      request.updatePathParameter(1, '1234');

      request.addRequestParameter('filter');
      request.updateRequestParameter(0, 'value');
      expect(request.checkInvalidState().length).toBe(0);
    });

    it('should be invalid with null header value', () => {
      // make path parameters valid
      request.updatePathParameter(0, '1234');
      request.updatePathParameter(1, '1234');

      request.addRequestHeader();
      request.requestHeaders[0].key = 'X-Custom-Header';
      expect(request.checkInvalidState().length).toBe(1);
    });

    it('should be valid with value in header', () => {
      // valid path parameters
      request.updatePathParameter(0, '1234');
      request.updatePathParameter(1, '1234');

      request.addRequestHeader();
      request.requestHeaders[0].key = 'X-Custom-Header';
      request.requestHeaders[0].value = 'headerValue';
      expect(request.checkInvalidState().length).toBe(0);
    });
  });

});
