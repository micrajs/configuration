/* eslint-disable @typescript-eslint/no-explicit-any */
import {Configuration} from '../Configuration';

declare global {
  namespace Application {
    interface Configurations {
      shallow: number;
      test: {
        test: string;
      };
    }
  }
}

async function waitFor(time = 0) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

describe('Configuration tests', () => {
  it('should retrieve a configuration value', () => {
    const config = new Configuration();
    config.definitions = {
      test: {
        test: 'test',
      },
    } as any;

    const value = config.get('test');

    expect(value).toEqual({
      test: 'test',
    });
  });

  it('should retrieve a nested configuration value', () => {
    const config = new Configuration();
    config.definitions = {
      test: {
        test: 'test',
      },
    } as any;

    const value = config.get('test.test');

    expect(value).toBe('test');
  });

  it('should return undefined if a given key does not exist', () => {
    const config = new Configuration();
    config.definitions = {
      test: {
        test: 'test',
      },
    } as any;

    const value = config.get('inexistent.path.to.value' as any);

    expect(value).toBeUndefined();
  });

  it('should return a given fallback value if a given key does not exist', () => {
    const config = new Configuration();
    config.definitions = {
      test: {
        test: 'test',
      },
    } as any;

    const value = config.get('inexistent.path.to.value' as any, 'fallback');

    expect(value).toBe('fallback');
  });

  it('should return true if a given key path exists', () => {
    const config = new Configuration();
    config.definitions = {
      test: {
        test: 'test',
      },
    } as any;

    const value = config.has('test');

    expect(value).toBe(true);
  });

  it('should return true if a given nested key path exists', () => {
    const config = new Configuration();
    config.definitions = {
      test: {
        test: 'test',
      },
    } as any;

    const value = config.has('test.test');

    expect(value).toBe(true);
  });

  it('should return false if a given key path does not exist', () => {
    const config = new Configuration();
    config.definitions = {
      test: {
        test: 'test',
      },
    } as any;

    const value = config.has('inexistent path to value' as any);

    expect(value).toBe(false);
  });

  it('should return false if a given nested key path does not exist', () => {
    const config = new Configuration();
    config.definitions = {
      test: {
        test: 'test',
      },
    } as any;

    const value = config.has('test.inexistent.path.to.value' as any);

    expect(value).toBe(false);
  });

  it('should set the value of a given path', () => {
    const config = new Configuration();

    config.set('test', {
      test: 'test',
    });

    expect(config.definitions).toEqual({
      test: {
        test: 'test',
      },
    });
  });

  it('should set a nested value to a given path', () => {
    const config = new Configuration();

    config.set('test.test', 'test');

    expect(config.definitions).toEqual({
      test: {
        test: 'test',
      },
    });
  });

  it('should emit a set event when a value is set to a given path', async () => {
    const config = new Configuration();

    let event: Micra.ConfigurationEvents['set'];
    config.on('set', (value) => {
      event = value;
    });

    config.set('test', {
      test: 'test',
    });

    await waitFor();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(event!).toEqual({
      path: 'test',
      value: {
        test: 'test',
      },
    });
  });

  it('should emit a set event when a nested value is set to a given path', async () => {
    const config = new Configuration();

    let event: Micra.ConfigurationEvents['set'];
    config.on('set', (value) => {
      event = value;
    });

    config.set('test.test', 'test');

    await waitFor();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(event!).toEqual({
      path: 'test.test',
      value: 'test',
    });
  });

  it('creates a scoped configuration', async () => {
    const config = new Configuration();

    const scopedConfig = config.createScope();

    expect(scopedConfig).toBeInstanceOf(Configuration);
    expect(scopedConfig.definitions).toEqual({});
  });

  it('should set values to a scoped configuration', async () => {
    const config = new Configuration();

    const scopedConfig = config.createScope();

    scopedConfig.set('test.test', 'test');

    expect(scopedConfig.definitions).toEqual({
      test: {
        test: 'test',
      },
    });
  });

  it("inherits values from the scope's parent", async () => {
    const config = new Configuration();

    config.set('test.test', 'test');

    const scopedConfig = config.createScope();

    expect(scopedConfig.get('test.test')).toBe('test');
  });

  it('should override values from the scope parent', async () => {
    const config = new Configuration();

    config.set('test.test', 'test');

    const scopedConfig = config.createScope();

    scopedConfig.set('test.test', 'test2');

    expect(scopedConfig.get('test.test')).toBe('test2');
  });

  it('should not expose scoped values in the parent configuration', async () => {
    const config = new Configuration();

    const scopedConfig = config.createScope();

    scopedConfig.set('test.test', 'test');

    expect(config.get('test.test')).toBeUndefined();
  });

  it('should emit a set event when a value is set to a scoped configuration', async () => {
    const config = new Configuration();

    const scopedConfig = config.createScope();

    let event: Micra.ConfigurationEvents['set'];
    scopedConfig.on('set', (value) => {
      event = value;
    });

    scopedConfig.set('test', {
      test: 'test',
    });

    await waitFor();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(event!).toEqual({
      path: 'test',
      value: {
        test: 'test',
      },
    });
  });
});
