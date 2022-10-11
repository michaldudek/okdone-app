import styled from '@emotion/styled';

export const TaskRowContainer = styled.div`
  min-height: var(--20px);
  padding: var(--4px) var(--16px);
  margin-bottom: var(--2px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  outline: none;
  border-radius: var(--border-radius-small);
  transition: all var(--transition-regular) var(--ease-regular),
    background-color 0s;

  &:focus {
    background-color: var(--highlight-background);
  }

  &[aria-expanded='true'] {
    margin-bottom: var(--16px);
    padding-top: var(--16px);
    background-color: var(--background-active);
    box-shadow: var(--shadow-elevated);
  }
`;
