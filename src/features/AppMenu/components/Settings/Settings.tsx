import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuWrap,
} from 'components/DropdownMenu';
import { Logo } from 'components/Logo';
import {
  AppearanceMode,
  Preferences,
  usePreference,
} from 'features/Preferences';
import { FunctionComponent, useEffect, useState } from 'react';
import { platformKeys } from 'services/Platform';
import { AppInfo } from '../AppInfo';
import { AppMenuButton } from '../AppMenuButton';

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

  const [appearance, setAppearance] = usePreference<AppearanceMode>(
    Preferences.Appearance,
    AppearanceMode.System,
  );

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

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={appearance}
          onValueChange={(value) => setAppearance(value as AppearanceMode)}
        >
          <DropdownMenuRadioItem value={AppearanceMode.System}>
            System (auto)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={AppearanceMode.Light}>
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={AppearanceMode.Dark}>
            Dark
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenu>
    </DropdownMenuWrap>
  );
};
