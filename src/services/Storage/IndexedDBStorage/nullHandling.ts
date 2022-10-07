export const NULL_VALUE = '@@__==NULL==__@@';

/**
 * Replace null values with a string token that can be searched inside idb.
 *
 * @param data
 */
export const transformOnWrite = <T>(data: Record<string, unknown>): T => {
  if (typeof data !== 'object') {
    return data;
  }

  const newData = { ...data };

  Object.keys(data).forEach((key) => {
    newData[key] = data[key] ?? NULL_VALUE;
  });

  return newData as T;
};

/**
 * Replace null string token values with actual null values.
 *
 * @param data
 */
export const transformOnRead = <T>(data: Record<string, unknown>): T => {
  if (typeof data !== 'object') {
    return data;
  }

  const newData = { ...data };

  Object.keys(data).forEach((key) => {
    newData[key] = newData[key] === NULL_VALUE ? null : newData[key];
  });

  return newData as T;
};
