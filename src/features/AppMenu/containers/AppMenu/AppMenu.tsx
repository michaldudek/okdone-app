import styled from '@emotion/styled';
import { ComponentProps, FunctionComponent } from 'react';
import { AddTask } from '../../components/AddTask';
import { KeyboardShortcuts } from '../../components/KeyboardShortcuts';
import { Settings } from '../Settings';

const StyledNav = styled.nav`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: var(--50px);
  padding: 0 var(--16px);
  background-color: var(--background-active);
  border-top: 1px solid var(--border-element);
`;

export const AppMenu: FunctionComponent<ComponentProps<'nav'>> = ({
  ...props
}) => {
  return (
    <StyledNav {...props}>
      <Settings />
      <AddTask />
      <KeyboardShortcuts />
    </StyledNav>
  );
};
