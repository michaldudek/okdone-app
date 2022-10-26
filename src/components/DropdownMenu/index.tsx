import styled from '@emotion/styled';
import {
  Label,
  RadioGroup,
  Root,
  Separator,
  Trigger,
} from '@radix-ui/react-dropdown-menu';

export * from './DropdownMenu';
export * from './DropdownMenuItem';
export * from './DropdownSubMenu';

export const DropdownMenuWrap = Root;
export const DropdownMenuTrigger = Trigger;
export const DropdownMenuRadioGroup = RadioGroup;

export const DropdownMenuLabel = styled(Label)`
  padding-left: var(--20px);
  font-size: var(--12px);
  line-height: var(--24px);
  color: var(--text-secondary);
`;

export const DropdownMenuSeparator = styled(Separator)`
  height: 1px;
  background-color: var(--border-element);
  margin: var(--5px) 0;
`;
