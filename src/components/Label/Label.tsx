import styled from '@emotion/styled';
import { FunctionComponent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  variant: 'accent' | 'success' | 'warning' | 'danger' | 'disabled';
};

const StyledLabel = styled.span`
  --label-background: var(--background-element);
  --label-font-color: var(--text-secondary);
  display: inline-block;
  border-radius: var(--border-radius-regular);
  background: var(--label-background);
  color: var(--label-font-color);
  padding: var(--3px) var(--6px);
  font-size: var(--12px);

  &[data-variant='accent'] {
    --label-background: var(--color-accent);
  }
  &[data-variant='success'] {
    --label-background: var(--color-success);
  }
  &[data-variant='warning'] {
    --label-background: var(--color-warning);
    --label-font-color: var(--text-inverse);
  }
  &[data-variant='danger'] {
    --label-background: var(--color-danger);
    --label-font-color: var(--text-inverse);
  }
  &[data-variant='disabled'] {
    --label-background: var(--background-element);
  }
`;

export const Label: FunctionComponent<Props> = ({
  children,
  variant,
  ...props
}) => {
  return (
    <StyledLabel data-variant={variant} {...props}>
      {children}
    </StyledLabel>
  );
};
