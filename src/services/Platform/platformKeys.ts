import { isMac } from './platform';

export type SpecialKey =
  | 'ctrl'
  | 'alt'
  | 'meta'
  | 'shift'
  | 'escape'
  | 'backspace'
  | 'enter'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'space';

const WindowsKeys: Record<SpecialKey | string, string> = {
  ctrl: 'Ctrl',
  alt: 'Alt',
  meta: 'Win',
  shift: 'Shift',
  escape: 'Esc',
  backspace: 'Backspace',
  enter: 'Enter',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  space: 'Space',
};

const MacKeys: Record<SpecialKey | string, string> = {
  ctrl: '⌃',
  alt: '⌥',
  meta: '⌘',
  shift: '⇧',
  escape: '⎋',
  backspace: '⌫',
  enter: '↵',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
  space: 'Space',
};

export const platformKey = (key: SpecialKey | string): string => {
  if (isMac()) {
    return MacKeys[key] ?? key.toUpperCase();
  }

  return WindowsKeys[key] ?? key.toUpperCase();
};

export const platformKeys = (keys: (SpecialKey | string)[]): string =>
  keys.map(platformKey).join(isMac() ? '' : '+');
