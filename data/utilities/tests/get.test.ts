/* eslint-disable @typescript-eslint/no-explicit-any */
import {get} from '../get';

export const definitions = {
  shallow: 'shallow value',
  deep: {
    nested: 'nested value',
    list: [1, 2, 3],
  },
} as const;

describe('get tests', () => {
  it('should get shallow value from an object', () => {
    expect(get(definitions, 'shallow')).toBe('shallow value');
  });

  it('should get nested value from an object', () => {
    expect(get(definitions, 'deep.nested')).toBe('nested value');
  });

  it('should return a value from a list', () => {
    expect(get(definitions, 'deep.list.0')).toBe(1);
    expect(get(definitions, 'deep.list.3' as any)).toBeUndefined();
  });

  it('should return undefined if field does not exist', () => {
    expect(get(definitions, 'wrong.path' as any)).toBeUndefined();
  });
});
