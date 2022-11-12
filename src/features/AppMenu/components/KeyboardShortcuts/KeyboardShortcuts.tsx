import { Preferences, usePreference } from 'features/Preferences';
import { Keyboard } from 'phosphor-react';
import { FunctionComponent, useEffect } from 'react';
import { platformKey, platformKeys, SpecialKey } from 'services/Platform';
import { AppMenuButton } from '../../components/AppMenuButton';
import styles from './KeyboardShortcuts.module.scss';

const shortcuts: { label: string; keys: (SpecialKey | string)[] }[] = [
  {
    label: 'Add new task',
    keys: ['ctrl', 'n'],
  },
  {
    label: 'Move up the list',
    keys: ['up'],
  },
  {
    label: 'Move down the list',
    keys: ['down'],
  },
  {
    label: 'Toggle task complete',
    keys: ['space'],
  },
  {
    label: 'Add new task after current',
    keys: ['enter'],
  },
  {
    label: 'Toggle open task',
    keys: ['shift', 'enter'],
  },
  {
    label: 'Close open task or unselect task',
    keys: ['escape'],
  },
  {
    label: 'Remove empty task',
    keys: ['backspace'],
  },
  {
    label: 'Remove task',
    keys: ['shift', 'backspace'],
  },
  {
    label: 'Toggle this helper',
    keys: ['ctrl', 'shift', 'k'],
  },
];

export const KeyboardShortcuts: FunctionComponent = () => {
  const [isVisible, setVisible] = usePreference<boolean>(
    Preferences.ShowKeyboardHelper,
    true,
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === 'k') {
        setVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, setVisible]);

  return (
    <div className={styles.wrap}>
      <AppMenuButton
        tabIndex={0}
        title={`Show keyboard shortcuts (${platformKeys([
          'ctrl',
          'shift',
          'k',
        ])})`}
        onClick={() => setVisible(!isVisible)}
      >
        <Keyboard
          size={28}
          color={isVisible ? 'var(--color-accent)' : undefined}
        />
      </AppMenuButton>

      <div
        className={styles.container}
        data-state={isVisible ? 'open' : 'closed'}
        data-side="top"
      >
        {shortcuts.map(({ label, keys }) => (
          <div className={styles.item} key={label}>
            {label}
            <span className={styles.keys}>
              {keys.map((key) => (
                <span className={styles.key} key={key}>
                  {platformKey(key)}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
