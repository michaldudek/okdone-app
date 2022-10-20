import { ForwardedRef, useEffect, useRef } from 'react';

/**
 * Create a RefObject that will keep the same value os forwardedRef.
 *
 * Use it when creating a forwardRef() component that needs to use the same ref
 * inside.
 */
export const useForwardedRef = <T>(forwardedRef: ForwardedRef<T>) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!forwardedRef) {
      return;
    }

    if (typeof forwardedRef === 'function') {
      forwardedRef(ref.current);
    } else {
      forwardedRef.current = ref.current;
    }
  }, [forwardedRef]);

  return ref;
};
