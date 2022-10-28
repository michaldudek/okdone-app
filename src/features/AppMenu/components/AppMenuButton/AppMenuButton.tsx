import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';
import styles from './AppMenuButton.module.scss';

type Props = ComponentProps<'button'>;

export const AppMenuButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, type = 'button', ...props }, ref) => {
    return (
      <button
        type={type}
        className={clsx(styles.button, className)}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
