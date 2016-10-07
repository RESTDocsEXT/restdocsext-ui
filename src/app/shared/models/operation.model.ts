import { NamedDescriptor } from './shared';
import { makeUrlFriendly } from '../util';

/**
 * Represents an API operation.
 */
export class Operation {

  /**
   * Create an `Operation` from an object in the format:
   * 
   *   {
   *     id: number,
   *     name: string,
   *     path: string,
   *     httpMethod: string,
   *     description: string,
   *     collection: string,
   *     requestBody: string,
   *     pathParameters: { [key: string]: string ] },
   *     requestParameters: { [key: string]: string ] },
   *     requestHeaders: { [key: string]: string ] },
   *     responseHeaders: { [key: string]: string ] }
   *   }
   */
  static fromConfig(config: any): Operation {
    return new Operation(
      config.id,
      config.name,
      config.path,
      config.httpMethod,
      config.description,
      config.collection,
      config.requestBody,
      Operation._convertObjectToDescriptors(config.pathParameters),
      Operation._convertObjectToDescriptors(config.requestParameters),
      Operation._convertObjectToDescriptors(config.requestHeaders),
      Operation._convertObjectToDescriptors(config.responseHeaders)
    );
  }

  /**
   * Converts a JS object into an array of `NamedDescriptor[]`, using the
   * property name as the key and the property value as the value.
   */
  static _convertObjectToDescriptors(obj: any): NamedDescriptor[] {
    let result: NamedDescriptor[] = null;
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (result == null) {
          result = [];
        }
        result.push({ name: prop, description: obj[prop] });
      }
    }
    return result;
  }

  constructor(public id: number,
              public name: string,
              public path: string,
              public httpMethod: string,
              public description: string,
              public collection: string,
              public requestBody?: string,
              public pathParameters?: NamedDescriptor[],
              public requestParameters?: NamedDescriptor[],
              public requestHeaders?: NamedDescriptor[],
              public responseHeaders?: NamedDescriptor[]) {
  }

  /**
   * Get the name converted to URL form.
   */
  get nameForUrl(): string {
    return makeUrlFriendly(this.name);
  }
}
