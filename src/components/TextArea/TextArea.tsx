import clsx from 'clsx';
import {
  ComponentPropsWithoutRef,
  FormEventHandler,
  forwardRef,
  FunctionComponent,
  useCallback,
  useRef,
} from 'react';
import styles from './TextArea.module.scss';

type Props = ComponentPropsWithoutRef<'textarea'>;

export const TextArea: FunctionComponent<Props> = forwardRef<
  HTMLTextAreaElement,
  Props
>(({ className, onInput, value, ...otherProps }, ref) => {
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
    <div
      ref={wrapRef}
      data-val={value}
      className={clsx(styles.wrap, className)}
    >
      <textarea
        ref={ref}
        defaultValue={value}
        {...otherProps}
        onInput={handleInput}
      />
    </div>
  );
});
