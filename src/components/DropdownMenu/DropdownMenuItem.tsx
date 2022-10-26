import styled from '@emotion/styled';
import {
  CheckboxItem,
  Item,
  ItemIndicator,
  RadioItem,
} from '@radix-ui/react-dropdown-menu';
import { ArrowSquareOut, Check } from 'phosphor-react';
import {
  ComponentProps,
  FunctionComponent,
  ReactNode,
  useCallback,
} from 'react';
import { indicatorItemStyle, itemStyle } from './styles';

const StyledItemIndicator = styled(ItemIndicator)`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCheckboxItem = styled(CheckboxItem)`
  ${indicatorItemStyle}
`;

const StyledRadioItem = styled(RadioItem)`
  ${indicatorItemStyle}
`;

export const DropdownMenuItemCheck: FunctionComponent = () => (
  <StyledItemIndicator>
    <Check size={20} color="var(--text-primary)" />
  </StyledItemIndicator>
);

export const DropdownMenuItem = styled(Item)`
  ${itemStyle}
`;

type LinkItemProps = {
  children: ReactNode;
  href: string;
};

export const DropdownMenuLinkItem: FunctionComponent<LinkItemProps> = ({
  children,
  href,
}) => {
  const handleSelect = useCallback(() => {
    window.open(href, '_blank');
  }, [href]);

  return (
    <DropdownMenuItem onSelect={handleSelect}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <DropdownMenuItemShortcut>
          <ArrowSquareOut size={18} />
        </DropdownMenuItemShortcut>
      </a>
    </DropdownMenuItem>
  );
};

export const DropdownMenuCheckboxItem: FunctionComponent<
  ComponentProps<typeof CheckboxItem>
> = ({ children, ...props }) => (
  <StyledCheckboxItem {...props}>
    <DropdownMenuItemCheck />
    {children}
  </StyledCheckboxItem>
);

export const DropdownMenuRadioItem: FunctionComponent<
  ComponentProps<typeof RadioItem>
> = ({ children, ...props }) => (
  <StyledRadioItem {...props}>
    <DropdownMenuItemCheck />
    {children}
  </StyledRadioItem>
);

export const DropdownMenuItemShortcut = styled.span`
  margin-left: auto;
  padding-left: var(--20px);
  color: var(--text-tertiary);

  &[data-highlighted] {
    color: var(--text-inverse);
  }

  &[data-disabled] {
    color: var(--text-disabled);
  }
`;
