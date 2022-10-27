import styled from '@emotion/styled';
import { MediaQuery } from 'styles';

export const TaskRowContainer = styled.div`
  min-height: var(--20px);
  padding: var(--4px) var(--16px);
  margin-bottom: var(--6px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  outline: none;
  font-weight: normal;
  border-radius: var(--border-radius-small);
  transition: all var(--transition-regular) var(--ease-regular),
    background-color 0s;

  &:focus,
  &[data-focused='true'] {
    background-color: var(--highlight-background);
  }

  &[aria-expanded='true'] {
    margin-bottom: var(--16px);
    padding-top: var(--16px);
    background-color: var(--background-active);
    box-shadow: var(--shadow-elevated);
  }

  ${MediaQuery.Tablet} {
    margin-bottom: var(--2px);
  }
`;
