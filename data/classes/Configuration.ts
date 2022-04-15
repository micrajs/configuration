import {get} from '../utilities/get';
import {set} from '../utilities/set';
import type {PathsOf, PathValue} from '@micra/core/utilities/DotNotation';

export class Configuration implements Micra.Configuration {
  definitions: Application.Configurations = {} as Application.Configurations;

  get<Key extends PathsOf<Application.Configurations>>(
    key: Key,
  ): PathValue<Application.Configurations, Key> | undefined;
  get<Key extends PathsOf<Application.Configurations>>(
    key: Key,
    fallback: PathValue<Application.Configurations, Key>,
  ): PathValue<Application.Configurations, Key>;
  get<Key extends PathsOf<Application.Configurations>>(
    key: Key,
    fallback?: PathValue<Application.Configurations, Key>,
  ): PathValue<Application.Configurations, Key> | undefined;
  get<Key extends PathsOf<Application.Configurations>>(
    key: Key,
    fallback?: PathValue<Application.Configurations, Key>,
  ): PathValue<Application.Configurations, Key> | undefined {
    return get(this.definitions, key) ?? fallback;
  }

  has<Key extends PathsOf<Application.Configurations>>(key: Key): boolean {
    return get(this.definitions, key) !== undefined;
  }

  set<Path extends PathsOf<Application.Configurations>>(
    path: Path,
    value: PathValue<Application.Configurations, Path>,
  ): void {
    set(this.definitions, (path as string).split('.'), value);
  }
}
