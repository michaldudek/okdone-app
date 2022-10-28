import { Arrow, Content, Portal } from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { ComponentProps, FunctionComponent } from 'react';
import styles from './DropdownMenu.module.scss';

type Props = ComponentProps<typeof Content> & {
  showArrow?: boolean;
};

export const DropdownMenu: FunctionComponent<Props> = ({
  className,
  children,
  showArrow = false,
  collisionPadding = 16,
  ...props
}) => {
  return (
    <Portal>
      <Content
        collisionPadding={collisionPadding}
        className={clsx(styles.content, className)}
        {...props}
      >
        {children}
        {showArrow && <Arrow className={styles.arrow} />}
      </Content>
    </Portal>
  );
};
