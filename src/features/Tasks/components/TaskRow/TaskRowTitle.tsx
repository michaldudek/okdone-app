import styled from '@emotion/styled';
import {
  FocusEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react';
import { setCaretAtEnd, setCaretAtStart } from 'utils/caret';

type Props = {
  isFocused?: boolean | 'start' | 'end';
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (text: string) => void;
  value: string;
};

const StyledInput = styled.input`
  flex: 1;
  font: inherit;
  border: none;
  outline: none;
  background: transparent;

  &[data-status='completed'] {
    color: var(--text-tertiary);
  }
`;

export const TaskRowTitle: FunctionComponent<Props> = ({
  isFocused = false,
  onBlur,
  onFocus,
  onChange,
  value,
  ...props
}) => {
  const refEl = useRef<HTMLInputElement>(null);

  // if focus requested then set text caret at the end of the title
  // (unless it already has focus)
  useEffect(() => {
    if (
      isFocused &&
      refEl.current &&
      refEl.current !== document.activeElement
    ) {
      if (isFocused === 'start') {
        setCaretAtStart(refEl.current);
      } else {
        setCaretAtEnd(refEl.current);
      }
    }
  }, [isFocused]);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.value ?? '');
    onBlur?.();
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    onFocus?.();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
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
    <StyledInput
      ref={refEl}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onFocus={handleFocus}
      tabIndex={-1}
      placeholder="What do you want to do?"
      defaultValue={value}
      {...props}
    />
  );
};
