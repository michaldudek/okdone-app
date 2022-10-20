import styled from '@emotion/styled';
import {
  ComponentProps,
  FormEventHandler,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useRef,
} from 'react';

type Props = ComponentProps<'textarea'>;

const StyledWrap = styled.div`
  display: grid;

  &::after {
    content: attr(data-val) ' ';
    white-space: pre-wrap;
    visibility: hidden;
  }

  & > textarea {
    outline: none;
    resize: none;
    overflow: hidden;
    border: none;
    background: transparent;
  }

  & > textarea,
  &::after {
    padding-top: var(--16px);
    padding-bottom: var(--16px);
    font: inherit;
    line-height: 1.3;
    grid-area: 1 / 1 / 2 / 2;
  }
`;

const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  { className, onInput, value, ...otherProps },
  ref,
) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(
    (event) => {
      if (wrapRef.current) {
        wrapRef.current.dataset.val = event.currentTarget.value;
      }
      onInput?.(event);
    },
    [onInput],
  );

  return (
    <StyledWrap ref={wrapRef} data-val={value} className={className}>
      <textarea
        ref={ref}
        defaultValue={value}
        {...otherProps}
        onInput={handleInput}
      />
    </StyledWrap>
  );
};

export const TextArea = forwardRef(TextAreaBase);
