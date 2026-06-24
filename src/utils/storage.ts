const prefix = "estatistica-boss-final:";

export function saveCache<T>(key: string, value: T) {
  localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
}

export function loadCache<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(`${prefix}${key}`);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function removeCache(key: string) {
  localStorage.removeItem(`${prefix}${key}`);
}
