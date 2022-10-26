import styled from '@emotion/styled';
import { ComponentProps, forwardRef } from 'react';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-active);
  border-radius: var(--border-radius-small);
  text-align: center;
  min-width: var(--32px);
  outline: none;

  &:hover,
  &:focus {
    background-color: var(--background-hover);
  }
`;

type Props = ComponentProps<'button'>;

export const AppMenuButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, type = 'button', ...props }, ref) => {
    return (
      <StyledButton type={type} {...props} ref={ref}>
        {children}
      </StyledButton>
    );
  },
);
