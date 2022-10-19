import styled from '@emotion/styled';
import {
  FocusEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react';
import { setCaretAtEnd } from 'utils/caret';

type Props = {
  children: string;
  isFocused?: boolean;
  onBlur?: () => void;
  onChange?: (text: string) => void;
};

const Title: FunctionComponent<Props> = ({
  children,
  isFocused = false,
  onBlur,
  onChange,
  ...otherProps
}) => {
  const refEl = useRef<HTMLDivElement>(null);

  // if focus requested then set text caret at the end of the title
  // (unless it already has focus)
  useEffect(() => {
    if (
      isFocused &&
      refEl.current &&
      refEl.current !== document.activeElement
    ) {
      setCaretAtEnd(refEl.current);
    }
  }, [isFocused]);

  const handleBlur: FocusEventHandler = (event) => {
    onChange?.(event.target.textContent ?? '');
    onBlur?.();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    switch (event.key) {
      case ' ':
      case 'Space':
      case 'Backspace':
        event.stopPropagation();
        break;

      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        refEl.current?.blur();
        break;

      case 'Escape':
        refEl.current?.blur();
        break;
    }
  };

  return (
    <div
      ref={refEl}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      tabIndex={-1}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export const TaskRowTitle = styled(Title)`
  flex: 1;
  outline: none;

  &[data-status='completed'] {
    color: var(--text-tertiary);
  }
`;
