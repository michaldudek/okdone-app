import styled from '@emotion/styled';
import {
  FocusEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  useRef,
} from 'react';

type Props = {
  children: string;
  onChange?: (text: string) => void;
};

const Title: FunctionComponent<Props> = ({
  children,
  onChange,
  ...otherProps
}) => {
  const refEl = useRef<HTMLDivElement>(null);

  const handleBlur: FocusEventHandler = (event) => {
    onChange?.(event.target.textContent ?? '');
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
