
/**
 * For key value pair with a name as the key and a description as the value.
 */
export interface NamedDescriptor {
  name: string;
  description: string;
}

/**
 * For arbitrary key value pairs
 */
export interface KeyValuePair {
  key: string;
  value: any;
}
