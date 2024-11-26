import { V_BORDER_POSITION, V_BORDER_SIZE } from './constants';

/**
 * Deep copy an object or an array.
 */
export const deepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};


// Number formation
/**
 * Rounding the decimals of a number to specific digit.
 */
export function round(num: number, digit: number = 2) {
  return Math.round(num * 10**digit) / 10**digit;
}

const formatter = new Intl.NumberFormat('en-US');
export const numFormat = (num: number, digit?: number) => {
  if (digit !== undefined) num = round(num, digit);
  return formatter.format(num);
};


// Deal array
export const getLastItem = <T extends unknown[]>(arr: T): T[number] => {
  return arr[arr.length - 1] as T;
};

export const removeItemByAttr = <T extends object, K extends keyof T>(
  arr: Array<T>, key: K, value: T[K]
) => {
  const index = arr.findIndex((obj) => obj[key] === value);
  if (index > -1) return [index, arr.splice(index, 1)[0]] as const;
};


export function sumAlongAttr<T extends Record<K, number>, K extends string> (
  objs: T[], attr: K
): number
export function sumAlongAttr<T extends object>(
  objs: T[], callback: ((obj: typeof objs[number]) => number)
): number
/**
 * Sum of array of objects along a attribute/property or a callback function.
 */
export function sumAlongAttr<T extends Record<K, number>, K extends string> (
  objs: T[],
  attr: K | ((obj: typeof objs[number]) => number)
) {
  const callback = typeof attr === 'string' ? (obj: typeof objs[number]) => obj[attr] : attr;
  return objs.reduce((prev, obj) => prev + callback(obj), 0);
}


export function maxAlongAttr<T extends Record<K, number>, K extends string> (
  objs: T[], attr: K
): number
export function maxAlongAttr<T extends object>(
  objs: T[], callback: ((obj: typeof objs[number]) => number)
): number
export function maxAlongAttr<T extends Record<K, number>, K extends string> (
  objs: T[],
  attr: K | ((obj: typeof objs[number]) => number)
) {
  const callback = typeof attr === 'string' ? (obj: typeof objs[number]) => obj[attr] : attr;
  return objs.reduce((prev, obj) => Math.max(prev, callback(obj)), 0);
}

// Others
/**
 * 切換到下一頁，從 { 1, 2, ..., max } -> { 2, 3, ..., max, 1 }.
 */
export const nextPage = (num: number, max: number) => {
  return 1 + num % max;
};

/**
 * 切換到上一頁(循環)，從 { 1, 2, ..., max } -> { max, 1, 2, ..., max-1 }.
 */
export const prevPage = (num: number, max: number) => {
  return 1 + (max - 2 + num) % max;
};


// Vuetify related
/**
 * Return a Vuetify class of border radius from string of size and/or position.
 * @param rounded size and/or position.
 * @returns Border radius class. Empty string means rounded is invalid.
 */
export const getRoundedClass = <
  S extends typeof V_BORDER_SIZE[number],
  D extends typeof V_BORDER_POSITION[number]
>(
    rounded: string
  ): `rounded-${S}` | `rounded-${D}` | `rounded-${D}-${S}` | 'rounded' | '' => {
  if (!rounded) return 'rounded';
  const sep = rounded.split('-');
  if (
    sep.length === 1 &&
    (
      // @ts-expect-error
      V_BORDER_POSITION.includes(rounded) ||
      // @ts-expect-error
      V_BORDER_SIZE.includes(rounded)
    )
  ) {
    return `rounded-${rounded as S | D}`;
  } else if (
    sep.length === 2 &&
      // @ts-expect-error
      V_BORDER_POSITION.includes(sep[0]) &&
      // @ts-expect-error
      V_BORDER_SIZE.includes(sep[1])
  ) return `rounded-${sep[0] as D}-${sep[1] as S}`;
  return '';
};
