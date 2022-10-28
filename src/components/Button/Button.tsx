import clsx from 'clsx';
import { ComponentProps, FunctionComponent } from 'react';
import { WithClassName } from 'types/PropTypes';
import styles from './Button.module.scss';

type Props = WithClassName<ComponentProps<'button'>> & {
  variant: 'accent' | 'success' | 'warning' | 'danger' | 'disabled';
};

export const Button: FunctionComponent<Props> = ({
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.button, className)}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  );
};
