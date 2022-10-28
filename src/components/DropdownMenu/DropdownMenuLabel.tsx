import { Label } from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { ComponentProps, FunctionComponent } from 'react';
import styles from './DropdownMenu.module.scss';

export const DropdownMenuLabel: FunctionComponent<
  ComponentProps<typeof Label>
> = ({ className, children, ...props }) => {
  return (
    <Label className={clsx(styles.label, className)} {...props}>
      {children}
    </Label>
  );
};
