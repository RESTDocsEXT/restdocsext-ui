
/**
 * Converts a string by lowercasing it and replacing spaces with dashes.
 */
export function makeUrlFriendly(str: string) {
  return str.replace(/\s+/g, '-').toLowerCase();
}
