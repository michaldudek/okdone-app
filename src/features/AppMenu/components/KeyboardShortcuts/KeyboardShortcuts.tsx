import styled from '@emotion/styled';
import { Keyboard } from 'phosphor-react';
import { FunctionComponent, useEffect, useState } from 'react';
import { platformKey, SpecialKey } from 'services/Platform';
import { slideInStyles } from 'styles';
import { AppMenuButton } from '../../components/AppMenuButton';

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
    keys: ['meta', 'shift', 'k'],
  },
];

const StyledWrap = styled.div`
  position: relative;
`;

const StyledContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: calc(100% + var(--20px));
  display: none;
  color: var(--text-disabled);
  text-align: right;
  min-width: var(--250px);
  line-height: 1.5;
  font-weight: 300;

  &[data-state='open'] {
    display: block;
  }

  ${slideInStyles}
`;

const StyledItem = styled.div`
  margin-bottom: var(--8px);
`;

const StyledKeys = styled.span`
  display: inline-block;
  margin-left: var(--8px);
`;

const StyledKey = styled.span`
  display: inline-block;
  margin-left: var(--2px);
  background: var(--color-active);
  border: 1px solid var(--border-element);
  border-radius: var(--border-radius-small);
  padding: 0 var(--4px);
  font-size: var(--12px);
`;

export const KeyboardShortcuts: FunctionComponent = () => {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.metaKey && event.key === 'k') {
        setVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <StyledWrap>
      <AppMenuButton
        tabIndex={0}
        title="Show keyboard shortcuts"
        onClick={() => setVisible((prev) => !prev)}
      >
        <Keyboard
          size={28}
          color={isVisible ? 'var(--color-accent)' : undefined}
        />
      </AppMenuButton>

      <StyledContainer
        data-state={isVisible ? 'open' : 'closed'}
        data-side="top"
      >
        {shortcuts.map(({ label, keys }) => (
          <StyledItem key={label}>
            {label}
            <StyledKeys>
              {keys.map((key) => (
                <StyledKey key={key}>{platformKey(key)}</StyledKey>
              ))}
            </StyledKeys>
          </StyledItem>
        ))}
      </StyledContainer>
    </StyledWrap>
  );
};
