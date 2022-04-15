/* eslint-disable @typescript-eslint/no-explicit-any */
export function set<T extends Record<any, any>>(
  obj: T,
  [part, ...parts]: string[],
  value: unknown,
): void {
  if (!part || typeof obj !== 'object' || obj == null || Array.isArray(obj)) {
    return;
  }

  if (parts.length === 0) {
    obj[part as keyof T] = value as T[keyof T];
    return;
  }

  if (
    typeof obj[part] !== 'object' ||
    obj[part] == null ||
    Array.isArray(obj[part])
  ) {
    obj[part as keyof T] = {} as T[keyof T];
  }

  return set(obj[part], parts, value);
}
