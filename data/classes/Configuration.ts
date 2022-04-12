import {get} from '../utilities/get';
import {set} from '../utilities/set';

export class Configuration implements Micra.Configuration {
  definitions: Application.Configurations = {};

  get<Key extends keyof Application.Configurations>(
    key: Key,
  ): Application.Configurations[Key] | undefined;
  get<Key extends keyof Application.Configurations>(
    key: Key,
    fallback: Application.Configurations[Key],
  ): Application.Configurations[Key];
  get<Key extends keyof Application.Configurations>(
    key: Key,
    fallback?: keyof Application.Configurations,
  ): Application.Configurations[Key] | undefined;
  get<Key extends keyof Application.Configurations>(
    key: Key,
    fallback?: Application.Configurations[Key],
  ): Application.Configurations[Key] | undefined {
    return get(this.definitions, (key as string).split('.')) ?? fallback;
  }

  has<Key extends keyof Application.Configurations>(key: Key): boolean {
    return get(this.definitions, (key as string).split('.')) !== undefined;
  }

  set<Key extends keyof Application.Configurations>(
    key: Key,
    value: Application.Configurations[Key],
  ): void {
    set(this.definitions, (key as string).split('.'), value);
  }
}
