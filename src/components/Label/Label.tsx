import clsx from 'clsx';
import { ComponentProps, FunctionComponent } from 'react';
import { WithChildren, WithClassName } from 'types/PropTypes';
import styles from './Label.module.scss';

type Props = WithClassName<WithChildren<ComponentProps<'span'>>> & {
  variant: 'accent' | 'success' | 'warning' | 'danger' | 'disabled';
};

export const Label: FunctionComponent<Props> = ({
  className,
  children,
  variant,
  ...props
}) => {
  return (
    <span
      className={clsx(styles.label, className)}
      data-variant={variant}
      {...props}
    >
      {children}
    </span>
  );
};
