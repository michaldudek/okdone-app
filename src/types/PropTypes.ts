import { ReactNode } from 'react';

export type WithClassName<T> = T & {
  className?: string;
};

export type WithChildren<T> = T & {
  children?: ReactNode;
};
