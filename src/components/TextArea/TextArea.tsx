import {
  ComponentProps,
  FormEventHandler,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useRef,
} from 'react';
import styles from './TextArea.module.scss';

type Props = ComponentProps<'textarea'>;

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
    <div className={className}>
      <div ref={wrapRef} data-val={value} className={styles.wrap}>
        <textarea
          ref={ref}
          defaultValue={value}
          {...otherProps}
          onInput={handleInput}
        />
      </div>
    </div>
  );
};

export const TextArea = forwardRef(TextAreaBase);
