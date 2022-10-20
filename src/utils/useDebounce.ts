import debounce from 'lodash.debounce';
import { useEffect, useRef } from 'react';

type Fn = Parameters<typeof debounce>[0];
type Options = Parameters<typeof debounce>[2];

/**
 * Use lodash.debounce in a React friendly way.
 */
export const useDebounce = (fn: Fn, wait = 250, options?: Options): Fn => {
  const ref = useRef(debounce(fn, wait, options));

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current.flush();
    };
  });

  return ref.current;
};
