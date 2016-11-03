
import { IterablePipe } from './iterable.pipe';

describe('pipe: IterablePipe', () => {

  it('should create array from Map', () => {
    let map = new Map();
    map.set('one', '1');
    map.set('two', '2');
    map.set('three', '3');

    let result = new IterablePipe().transform(map);
    expectResults(result);
  });

  it('should create array from object', () => {
    let obj = {
      one: '1',
      two: '2',
      three: '3'
    };
    let result = new IterablePipe().transform(obj);
    expectResults(result);
  });

  function expectResults(result: any) {
    expect(result[0].key).toBe('one');
    expect(result[0].value).toBe('1');
    expect(result[1].key).toBe('two');
    expect(result[1].value).toBe('2');
    expect(result[2].key).toBe('three');
    expect(result[2].value).toBe('3');
  }
});
