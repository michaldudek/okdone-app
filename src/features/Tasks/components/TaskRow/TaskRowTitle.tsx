import styled from '@emotion/styled';
import {
  FocusEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { setCaretAtEnd, setCaretAtStart } from 'utils/caret';

type Props = {
  children: string;
  isFocused?: boolean | 'start' | 'end';
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (text: string) => void;
};

const StyledTitle = styled.div`
  flex: 1;
  outline: none;

  &[data-status='completed'] {
    color: var(--text-tertiary);
  }

  &::after {
    content: attr(data-placeholder);
    color: var(--text-tertiary);
    font-weight: 300;
  }

  &:focus::after {
    display: none;
  }
`;

export const TaskRowTitle: FunctionComponent<Props> = ({
  children,
  isFocused = false,
  onBlur,
  onFocus,
  onChange,
  ...otherProps
}) => {
  const refEl = useRef<HTMLDivElement>(null);
  const [hasContent, setHasContent] = useState(children.length > 0);

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

  const handleBlur: FocusEventHandler = (event) => {
    onChange?.(event.target.textContent ?? '');
    onBlur?.();
  };

  const handleFocus: FocusEventHandler = (event) => {
    onFocus?.();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (refEl.current) {
      setHasContent(!!refEl.current.textContent);
    }

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
    <StyledTitle
      ref={refEl}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onFocus={handleFocus}
      tabIndex={-1}
      data-placeholder={!hasContent ? 'What do you want to do?' : undefined}
      {...otherProps}
    >
      {children}
    </StyledTitle>
  );
};
