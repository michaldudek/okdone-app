import { Brand } from './Brand';

type YYYY = `20${number}${number}`;
type MM = `0${number}` | '10' | '11' | '12';
type DD = `0${number}` | `1${number}` | `2${number}` | '30' | '31';

type RawDateString = `${YYYY}-${MM}-${DD}`;

export type DateString = Brand<RawDateString, 'DateString'>;

export const dateToDateString = (date: Date): DateString => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }` as DateString;
};

export const dateStringToDate = (dateString: DateString): Date => {
  return new Date(dateString);
};

export const todayToDateString = (): DateString => {
  return dateToDateString(new Date());
};

export const toDateString = (str: RawDateString): DateString =>
  str as DateString;

export const isDateString = (str: RawDateString): str is DateString => true;
