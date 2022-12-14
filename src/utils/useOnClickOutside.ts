import { RefObject, useEffect } from 'react';

type HandlerFn = (event: MouseEvent) => void;

export const useOnClickOutside = (
  handler: HandlerFn,
  ref: RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, ref]);
};
