import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuWrap,
} from 'components/DropdownMenu';
import { Logo } from 'components/Logo';
import { FunctionComponent } from 'react';
import { AppInfo } from '../../components/AppInfo';
import { AppMenuButton } from '../../components/AppMenuButton';

export const Settings: FunctionComponent = () => {
  return (
    <DropdownMenuWrap>
      <DropdownMenuTrigger asChild>
        <AppMenuButton tabIndex={0} title="Toggle settings">
          <Logo size={28} />
        </AppMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenu sideOffset={20}>
        <DropdownMenuItem disabled>
          <AppInfo />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLinkItem href="https://github.com/michaldudek/okdone-app">
          View on GitHub
        </DropdownMenuLinkItem>

        <DropdownMenuLinkItem href="https://okletsbuild.substack.com/">
          Read Newsletter
        </DropdownMenuLinkItem>
      </DropdownMenu>
    </DropdownMenuWrap>
  );
};
