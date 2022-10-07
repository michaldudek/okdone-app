import { Resource } from './Resource';

const BRAND = 'FindFilterOperator';

export type FindFilterValue = string | number | null;
type BaseFindFilterOperator = { __brand: 'FindFilterOperator' };
export type FindFilterOperator = InFindFilterOperator | EqFindFilterOperator;
export type FindFilter<T> = T | FindFilterOperator | null;

export type FindCriteria<T extends Resource> = {
  where?: { [K in keyof T]?: T | FindFilterOperator | null };
  orderBy?: keyof T;
  orderDir?: 'asc' | 'desc';
  limit?: number;
  start?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFindFilterOperator = (val: any): val is FindFilterOperator => {
  return (
    val && typeof val === 'object' && val.__brand === BRAND && val.operator
  );
};

type InFindFilterOperator = BaseFindFilterOperator & {
  operator: 'in';
  value: FindFilterValue[];
};

export const In = (...values: FindFilterValue[]): InFindFilterOperator => ({
  __brand: BRAND,
  operator: 'in',
  value: values,
});

type EqFindFilterOperator = BaseFindFilterOperator & {
  operator: 'eq';
  value: FindFilterValue;
};

export const Eq = (value: FindFilterValue): EqFindFilterOperator => ({
  __brand: BRAND,
  operator: 'eq',
  value,
});
