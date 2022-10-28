import clsx from 'clsx';
import { ComponentProps, FunctionComponent } from 'react';
import { AddTask } from '../../components/AddTask';
import { KeyboardShortcuts } from '../../components/KeyboardShortcuts';
import { Settings } from '../../components/Settings';
import styles from './AppMenu.module.scss';

type Props = ComponentProps<'nav'>;

export const AppMenu: FunctionComponent<Props> = ({ className, ...props }) => {
  return (
    <nav className={clsx(styles.nav, className)} {...props}>
      <Settings />
      <AddTask />
      <KeyboardShortcuts />
    </nav>
  );
};
