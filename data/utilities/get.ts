/* eslint-disable @typescript-eslint/no-explicit-any */
import type {PathsOf, PathValue} from '@micra/core/utilities/DotNotation';

export function get<T, P extends PathsOf<T>>(
  obj: T,
  path: P,
): PathValue<T, P> | undefined {
  return (path as string)
    .split(/[.[\]]/)
    .filter(Boolean)
    .reduce<PathValue<T, P>>((value, key) => (value as any)?.[key], obj as any);
}
