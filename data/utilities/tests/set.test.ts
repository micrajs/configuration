import {set} from '../set';

describe('set tests', () => {
  it('should set a given value to an object based on a key', () => {
    const obj = {};

    set(obj, ['a'], 'value');

    expect(obj).toEqual({a: 'value'});
  });

  it('should set a given value to an object based on a path', () => {
    const obj = {};

    set(obj, ['a', 'b', 'c'], 'value');

    expect(obj).toEqual({a: {b: {c: 'value'}}});
  });
});
