import { TextArea } from 'components/TextArea';
import {
  ComponentProps,
  forwardRef,
  KeyboardEventHandler,
  useCallback,
} from 'react';
import { useForwardedRef } from 'utils/useForwardedRef';

type Props = Omit<ComponentProps<'textarea'>, 'value'> & {
  value: string | null | undefined;
};

export const TaskRowNotes = forwardRef<HTMLTextAreaElement, Props>(
  ({ value = '', ...props }, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef);

    // TODO this renders on every keystroke, debug! (onChange???)
    // console.log('render TaskRowNotes');

    // stop propagation of most keys, so we can write freely
    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> =
      useCallback((event) => {
        // ESCAPE closes the task and sets focus on it
        // SHIFT+ENTER toggles the open state
        if (
          event.key === 'Escape' ||
          (event.key === 'Enter' && event.shiftKey)
        ) {
          event.preventDefault();
          return;
        }

        event.stopPropagation();
      }, []);

    return (
      <TextArea
        ref={ref}
        value={value ?? ''}
        onKeyDown={handleKeyDown}
        placeholder="Notes"
        {...props}
      />
    );
  },
);
