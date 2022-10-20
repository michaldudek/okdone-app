import { TextArea } from 'components/TextArea';
import {
  FocusEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
} from 'react';
import { setCaretAtEnd } from 'utils/caret';

type Props = {
  value: string | null | undefined;
  isFocused?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (text: string) => void;
};

export const TaskRowNotes: FunctionComponent<Props> = ({
  value = '',
  isFocused,
  onBlur,
  onFocus,
  onChange,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (
      isFocused &&
      textAreaRef.current &&
      textAreaRef.current !== document.activeElement
    ) {
      setCaretAtEnd(textAreaRef.current);
    }
  }, [isFocused]);

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    onChange?.(event.target.value);
    onBlur?.();
  };

  const handleFocus: FocusEventHandler = (event) => {
    onFocus?.();
  };

  const handleClick: MouseEventHandler = (event) => {
    onFocus?.();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    // TODO figure these out properly

    if (event.key === 'Escape') {
      textAreaRef.current?.blur();
      return;
    }

    if (!event.ctrlKey && !event.metaKey) {
      event.stopPropagation();
      return;
    }
  };

  return (
    <TextArea
      ref={textAreaRef}
      value={value ?? ''}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      placeholder="Notes"
    />
  );
};
