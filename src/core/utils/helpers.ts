/*
  AirBnb recommend instead of obj.hasOwnProperty(key)
  has.call(object, property)
*/
export const has = Object.prototype.hasOwnProperty;

/* Generate numbers between */
export function between(
  start: number,
  finish: number,
  order: "asc" | "desc" = "asc",
  inc: number = 1
): number[] {
  const numbers: number[] = [];
  if (order === "asc") {
    for (let i = start; i <= finish; i = i + inc) {
      numbers.push(i);
    }
  } else {
    for (let i = finish; i >= start; i = i - inc) {
      numbers.push(i);
    }
  }

  return numbers;
}

/* Generate years betwen startYear and current year */
export function generateYears(startYear: number): number[] {
  const currentYear = new Date().getFullYear();
  return between(startYear, currentYear, "desc");
}

/*
  Trim all strings in provided object.
  If property is not string it will be ignored
*/
export function trimObjectStrings<T extends Record<string, any>>(
  untrimedObject: T
): T {
  const cloned = { ...untrimedObject };

  for (const key in cloned) {
    if (has.call(cloned, key)) {
      const element = cloned[key];
      if (typeof element === "string") {
        cloned[key] = element.trim();
      }
    }
  }

  return cloned;
}

/* Remove items from object that are empty strings, nulls or undefined */
export function removeEmptyItems<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  const validItems: any = {};

  for (const key in obj) {
    if (has.call(obj, key)) {
      if (obj[key] !== "" && obj[key] !== null && obj[key] !== undefined) {
        validItems[key] = obj[key];
      }
    }
  }

  return validItems;
}

/* Pause execution for provided time in miliseconds */
export default function wait(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export async function asyncForEach<T = any>(
  array: T[],
  callback: (item: T, index?: number, array?: T[]) => Promise<any>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

interface WithId {
  id: string | number;
  [key: string]: any;
}

/* This will merge 2 array, for example 2 db responses. It will
   compare each item id and add to new array if does not exist
   It will always put item from first array in new array
 */
export function mergeArrayWithIds<T extends WithId>(
  firstArray: T[],
  secondArray: T[]
) {
  let newArray: T[] = [...secondArray];
  // For every item in first array
  firstArray.forEach(firstArrayItem => {
    // Check if second array has item with same id
    const exist = secondArray.findIndex(
      secondArrayItem => firstArrayItem.id === secondArrayItem.id
    );
    // If doesn't exist just push at last place
    if (exist === -1) {
      newArray.push(firstArrayItem);
    } else {
      // If exist replace it
      newArray[exist] = firstArrayItem;
    }
  });
  // Return merged array
  return newArray;
}
