import styled from '@emotion/styled';
import { Keyboard, Plus } from 'phosphor-react';
import { ComponentProps, FunctionComponent } from 'react';
import { AppMenuButton } from '../../components/AppMenuButton';
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
      <AppMenuButton tabIndex={0} title="Add new task">
        <Plus size={28} />
      </AppMenuButton>
      <AppMenuButton tabIndex={0} title="Show keyboard shortcuts">
        <Keyboard size={28} />
      </AppMenuButton>
    </StyledNav>
  );
};
