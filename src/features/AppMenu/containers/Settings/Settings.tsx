import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuWrap,
} from 'components/DropdownMenu';
import { Logo } from 'components/Logo';
import { FunctionComponent, useEffect, useState } from 'react';
import { platformKeys } from 'services/Platform';
import { AppInfo } from '../../components/AppInfo';
import { AppMenuButton } from '../../components/AppMenuButton';

export const Settings: FunctionComponent = () => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'h') {
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <DropdownMenuWrap open={isOpen} onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger asChild>
        <AppMenuButton
          tabIndex={0}
          title={`Toggle settings (${platformKeys(['ctrl', 'shift', 'h'])})`}
        >
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
