import {
  Portal,
  Sub,
  SubContent,
  SubTrigger,
} from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { CaretRight } from 'phosphor-react';
import { ComponentProps, FunctionComponent } from 'react';
import styles from './DropdownMenu.module.scss';

export const DropdownSubMenuWrap = Sub;

export const DropdownSubMenu: FunctionComponent<
  ComponentProps<typeof SubContent>
> = ({ className, children, ...props }) => {
  return (
    <Portal>
      <SubContent className={clsx(styles.content, className)} {...props}>
        {children}
      </SubContent>
    </Portal>
  );
};

export const DropdownMenuItemWithSubMenu: FunctionComponent<
  ComponentProps<typeof SubTrigger>
> = ({ className, children, ...props }) => (
  <SubTrigger className={clsx(styles.itemWithSubMenu, className)} {...props}>
    {children}
    <span className={styles.itemMeta}>
      <CaretRight color="var(--text-primary)" />
    </span>
  </SubTrigger>
);
