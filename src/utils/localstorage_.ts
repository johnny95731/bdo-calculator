

/**
 * Get item from localStorage.
 * @param key Key of item
 */
function getItem<T>(key: string): T | null
/**
 * Get item from localStorage.
 * @param key Key of item
 * @param defaults Default value when get null item.
 */
function getItem<T>(key: string, defaults: T): T

/**
 * Get item from localStorage and convert to corresponding type.
 * @param key Key of item
 * @param defaults Default value when get null item.
 */
function getItem<T>(
  key: string,
  defaults?: T,
) {
  if (import.meta.client) {
    const item = localStorage.getItem(key);
    if (item === null) return defaults || null;
    return JSON.parse(item) as T;
  } else {
    return defaults || null;
  }
}

/**
 * Convert item to string and set to localStorage.
 * @param key Key of item
 * @param item Item that be saved.
 */
function setItem(
  key: string,
  item: string | number | object
) {
  localStorage.setItem(
    key,
    typeof item === 'object' ? JSON.stringify(item) : String(item)
  );
}

/**
 * 操作資料庫
 */
export const storage = {
  getItem,
  setItem,
};
