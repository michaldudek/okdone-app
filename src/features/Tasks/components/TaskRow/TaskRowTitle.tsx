import styled from '@emotion/styled';
import { ComponentProps, forwardRef } from 'react';

type Props = ComponentProps<'input'>;

const StyledInput = styled.input`
  flex: 1;
  font: inherit;
  border: none;
  outline: none;
  background: transparent;

  &[data-status='completed'] {
    color: var(--text-tertiary);
  }
`;

export const TaskRowTitle = forwardRef<HTMLInputElement, Props>(
  ({ value, ...props }, ref) => {
    return (
      <StyledInput
        ref={ref}
        // need to keep tabIndex=-1 and manage focus in another way
        // because TABbing into input field auto selects all its content!
        tabIndex={-1}
        placeholder="What do you want to do?"
        defaultValue={value}
        {...props}
      />
    );
  },
);
