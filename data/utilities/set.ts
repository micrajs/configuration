export function set(obj: any, parts: string[], value: any): boolean {
  if (parts.length === 0) {
    return false;
  }

  const part = parts.shift();
  if (part && part in obj) {
    if (parts.length === 0) {
      obj[part] = value;
      return true;
    }

    if (obj[part] === null) {
      obj[part] = {};
    }

    return set(parts, obj[part], value);
  }

  return false;
}
