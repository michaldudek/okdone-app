import { Separator } from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { ComponentProps, FunctionComponent } from 'react';
import styles from './DropdownMenu.module.scss';

export const DropdownMenuSeparator: FunctionComponent<
  ComponentProps<typeof Separator>
> = ({ className, children, ...props }) => {
  return (
    <Separator className={clsx(styles.separator, className)} {...props}>
      {children}
    </Separator>
  );
};
