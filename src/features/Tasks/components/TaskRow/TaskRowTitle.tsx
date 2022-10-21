import styled from '@emotion/styled';
import { TextArea } from 'components/TextArea';
import {
  ComponentProps,
  forwardRef,
  KeyboardEventHandler,
  useCallback,
} from 'react';

type Props = ComponentProps<'textarea'>;

const StyledTextArea = styled(TextArea)`
  &,
  & > textarea,
  &::after {
    padding: 0;
  }

  [data-status='completed'] {
    &,
    & > textarea,
    &::after {
      color: var(--text-tertiary);
    }
  }
`;

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
      <StyledTextArea
        ref={ref}
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
