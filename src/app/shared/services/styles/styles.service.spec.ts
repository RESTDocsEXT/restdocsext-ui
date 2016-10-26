
import { StylesService } from './index';

describe('service: StylesService', () => {

  let service: StylesService;

  beforeEach(() => {
    service = new StylesService();
  });

  it('should get correct color for HTTP method', () => {
    expect(service.getMethodColor('GET')).toEqual('success');
    expect(service.getMethodColor('POST')).toEqual('info');
    expect(service.getMethodColor('PUT')).toEqual('primary');
    expect(service.getMethodColor('DELETE')).toEqual('danger');
    expect(service.getMethodColor('PATCH')).toEqual('warning');
  });

  it('should get correct color for status code', () => {
    expect(service.getStatusColor(200)).toEqual('success');
    expect(service.getStatusColor(201)).toEqual('success');
    expect(service.getStatusColor(204)).toEqual('success');
    expect(service.getStatusColor(300)).toEqual('success');
    expect(service.getStatusColor(303)).toEqual('success');

    expect(service.getStatusColor(400)).toEqual('danger');
    expect(service.getStatusColor(401)).toEqual('danger');
    expect(service.getStatusColor(404)).toEqual('danger');
    expect(service.getStatusColor(500)).toEqual('danger');
    expect(service.getStatusColor(512)).toEqual('danger');

    expect(service.getStatusColor(100)).toEqual('info');
    expect(service.getStatusColor(101)).toEqual('info');
    expect(service.getStatusColor(612)).toEqual('info');
    expect(service.getStatusColor(Infinity)).toEqual('info');
    expect(service.getStatusColor(NaN)).toEqual('info');
  });
});
