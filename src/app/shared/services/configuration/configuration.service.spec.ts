
import { Configuration } from './index';
import { restdocsextConfJson } from '../../../testing';

describe('service: Configuration', () => {
  let configService: Configuration;

  beforeEach(() => {
    configService = new Configuration(restdocsextConfJson);
  });

  it('should contain required properties from json', () => {
    expect(configService.pages[0]).toEqual('Authentication');
    expect(configService.pages[1]).toEqual('Introduction');

    expect(configService.homePage).toEqual('Introduction');

    expect(configService.organizationName).toEqual('PetStore API');
    expect(configService.organizationLink).toEqual('http://stackoverflow.com');
  });
});
