import { IDBPCursorWithValue } from 'idb';
import { Resource } from '../Resource';

/**
 * Convert idb cursoro to an array by reading all its data.
 *
 * @param cursorParam
 */
export const cursorToArray = async <T>(
  cursorParam: IDBPCursorWithValue,
): Promise<T[]> => {
  let cursor: typeof cursorParam | null = cursorParam;
  const result = [];
  while (cursor) {
    result.push(cursor.value);
    cursor = await cursor.continue();
  }
  return result;
};

/**
 * Combines results of multiple queries into one result set.
 *
 * The resulting array contains only items that are present in ALL result sets.
 *
 * Think of it as result of AND operators.
 *
 * @param resultSets
 */
export const combineResults = <T extends Resource>(
  resultSets: Array<T[]>,
): T[] => {
  return resultSets?.reduce((res, items) => {
    return res.filter((item) => items.find((i) => i.id === item.id));
  }, resultSets[0]);
};

/**
 * Merges results of multiple queries into one result set.
 *
 * The resulting array contains unique items from all result sets.
 *
 * This of it as result of OR operators.
 *
 * @param resultSets
 */
export const mergeResults = <T extends Resource>(
  resultSets: Array<T[]>,
): T[] => {
  return resultSets?.reduce((res, items) => {
    return [
      ...res,
      ...items.filter((item) => !res.find((i) => i.id === item.id)),
    ];
  }, resultSets[0]);
};
