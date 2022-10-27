import styled from '@emotion/styled';
import { ComponentProps, FunctionComponent } from 'react';

type Props = ComponentProps<'button'> & {
  variant: 'accent' | 'success' | 'warning' | 'danger' | 'disabled';
};

const StyledButton = styled.button`
  --button-background: var(--background-element);
  --button-font-color: var(--text-secondary);
  display: inline-block;
  border-radius: var(--border-radius-regular);
  background: var(--button-background);
  color: var(--button-font-color);
  padding: var(--6px) var(--16px);

  &:hover {
    box-shadow: var(--highlight-shadow);
  }

  &[data-variant='accent'] {
    --button-background: var(--color-accent);
    --button-font-color: var(--text-inverse);
  }
  &[data-variant='success'] {
    --button-background: var(--color-success);
  }
  &[data-variant='warning'] {
    --button-background: var(--color-warning);
    --button-font-color: var(--text-inverse);
  }
  &[data-variant='danger'] {
    --button-background: var(--color-danger);
    --button-font-color: var(--text-inverse);
  }
  &[data-variant='disabled'] {
    --button-background: var(--background-element);
  }
`;

export const Button: FunctionComponent<Props> = ({
  variant,
  children,
  ...props
}) => {
  return (
    <StyledButton data-variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};
