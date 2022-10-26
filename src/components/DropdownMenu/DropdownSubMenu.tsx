import styled from '@emotion/styled';
import {
  Portal,
  Sub,
  SubContent,
  SubTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItemShortcut } from 'components/DropdownMenu/DropdownMenuItem';
import { CaretRight } from 'phosphor-react';
import { ComponentProps, FunctionComponent } from 'react';
import { contentStyle, itemStyle } from './styles';

type Props = ComponentProps<typeof SubContent>;

export const DropdownSubMenuWrap = Sub;

const StyledSubTrigger = styled(SubTrigger)`
  ${itemStyle}

  &[data-state='open'] {
    background-color: var(--background-active);
  }
`;

const StyledSubMenu = styled(SubContent)`
  ${contentStyle}
`;

export const DropdownMenuItemWithSubMenu: FunctionComponent<
  ComponentProps<typeof SubTrigger>
> = ({ children, ...props }) => (
  <StyledSubTrigger {...props}>
    {children}
    <DropdownMenuItemShortcut>
      <CaretRight color="var(--text-primary)" />
    </DropdownMenuItemShortcut>
  </StyledSubTrigger>
);

export const DropdownSubMenu: FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return (
    <Portal>
      <StyledSubMenu {...props}>{children}</StyledSubMenu>
    </Portal>
  );
};
