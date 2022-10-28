import { TextArea } from 'components/TextArea';
import {
  ComponentProps,
  forwardRef,
  KeyboardEventHandler,
  useCallback,
} from 'react';
import styles from './TaskRow.module.scss';

type Props = ComponentProps<'textarea'>;

export const TaskRowTitle = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, onKeyDown, ...props }, ref) => {
    const handleKeyDown = useCallback<
      KeyboardEventHandler<HTMLTextAreaElement>
    >(
      (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }

        if (event.key === ' ' || event.key === 'Space') {
          event.stopPropagation();
        }

        onKeyDown?.(event);
      },
      [onKeyDown],
    );

    return (
      <TextArea
        ref={ref}
        className={styles.title}
        value={value}
        // set initial dimensions minimal
        rows={1}
        cols={1}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  },
);
