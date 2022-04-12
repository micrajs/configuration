export function get(obj: any, parts: string[]): any {
  if (parts.length === 0) {
    return obj;
  }

  const part = parts.shift();
  if (part && part in obj) {
    return get(parts, obj[part]);
  }

  return undefined;
}
