export interface Struct<T = string> {
  [key: string]: T;
}

interface WithId {
  id: string | number;
  [key: string]: any;
}

/*
  AirBnb recommend instead of obj.hasOwnProperty(key)
  has.call(object, property)
*/
// export const has = Object.prototype.hasOwnProperty;

/**
 * Generate numbers between.
 */
export function between(
  start: number,
  finish: number,
  options?: {
    order: "asc" | "desc";
    inc: number;
  }
): number[] {
  // const inc = options?.inc ?? 1;
  // const order = options?.order ?? "asc";
  // @TODO fix this when cra support is available
  const inc = options ? options.inc || 1 : 1;
  const order = options ? options.order || "asc" : "asc";
  const numbers: number[] = [];
  if (order === "asc") {
    for (let i = start; i <= finish; i += inc) {
      numbers.push(i);
    }
  } else {
    for (let i = finish; i >= start; i -= inc) {
      numbers.push(i);
    }
  }

  return numbers;
}

// /* Generate years betwen startYear and current year */
// export function generateYears(startYear: number): number[] {
//   const currentYear = new Date().getFullYear();
//   return between(startYear, currentYear, { order: "desc", inc: 1 });
// }

/** Trim every property on object (recursive) */
export function trimStrings<T extends Struct<any>>(obj: T): T {
  const cloned: any = {};
  Object.keys(obj).forEach(k => {
    const value = obj[k];

    if (typeof value === "string") {
      cloned[k] = value.trim();
    } else if (Array.isArray(value)) {
      cloned[k] = value.map(trimStrings);
    } else if (typeof value === "object") {
      cloned[k] = trimStrings(value);
    } else {
      cloned[k] = value;
    }
  });
  return cloned;
}

/** Remove  empty strings, nulls or undefined from object (recursive) */
export function removeEmptyItems<T extends Struct>(obj: T): Partial<T> {
  const validItems: any = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value === "" || value === null || value === undefined) {
      return;
    }
    // Check if value is obj or array, and do it recursivly
    if (typeof value === "object") {
      validItems[key] = removeEmptyItems(value);
    } else {
      validItems[key] = value;
    }
  });
  return validItems;
}

/** Pause execution for provided time in miliseconds */
export function wait(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

/**
 * For each with support for async
 * @example
 *  asyncForEach([1,2,3], (key, index, array) => fetch(key))
 */
export async function asyncForEach<R = any, T = any>(
  array: T[],
  callback: (item: T, index?: number, array?: T[]) => Promise<R>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * This will merge 2 array, for example 2 db responses. It will
 * compare each item id and add to new array if does not exist
 * It will always put item from first array in new array
 */
export function mergeArrayWithIds<T extends WithId>(arr1: T[], arr2: T[]) {
  let newArray: T[] = [...arr2];
  // For every item in first array
  arr1.forEach(arr1Item => {
    // Check if second array has item with same id
    const index = arr2.findIndex(arr2Item => arr1Item.id === arr2Item.id);
    // If doesn't exist just push at last place
    if (index === -1) {
      newArray.push(arr1Item);
    } else {
      // If exist replace it
      newArray[index] = arr1Item;
    }
  });
  // Return merged array
  return newArray;
}
