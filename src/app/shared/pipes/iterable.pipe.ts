import { Pipe, PipeTransform } from '@angular/core';

/**
 * Iterable Pipe
 * 
 * See https://github.com/angular/angular/issues/2246
 * and https://gist.github.com/amcdnl/202596c5b85cc66d7002d10bde3ab514
 *
 */
@Pipe({ name: 'iterable' })
export class IterablePipe implements PipeTransform {
  transform(iterable: any, args?: any[]): any {
    let result = [];

    // ES6 Map
    if (iterable.entries) {
      // weird. thought args would be (key, value), but they are (value, key, map).
      // See MDN Map.forEach
      iterable.forEach((value, key, map) => {
        result.push({ key, value });
      });
    } else {
      for (let key in iterable) {
        if (iterable.hasOwnProperty(key)) {
          result.push({ key, value: iterable[key] });
        }
      }
    }

    return result;
  }
}
