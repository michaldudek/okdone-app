import {
  CheckboxItem,
  Item,
  ItemIndicator,
  RadioItem,
} from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { ArrowSquareOut, Check } from 'phosphor-react';
import {
  ComponentProps,
  FunctionComponent,
  ReactNode,
  useCallback,
} from 'react';
import { platformKeys, SpecialKey } from 'services/Platform';
import { WithChildren } from 'types/PropTypes';
import styles from './DropdownMenu.module.scss';

const DropdownMenuItemCheck: FunctionComponent = () => (
  <ItemIndicator className={styles.indicator}>
    <Check size={20} color="var(--text-primary)" />
  </ItemIndicator>
);

export const DropdownMenuItem: FunctionComponent<
  ComponentProps<typeof Item>
> = ({ className, children, ...props }) => {
  return (
    <Item className={clsx(styles.item, className)} {...props}>
      {children}
    </Item>
  );
};

type LinkItemProps = WithChildren<ComponentProps<typeof DropdownMenuItem>> & {
  href: string;
};

export const DropdownMenuLinkItem: FunctionComponent<LinkItemProps> = ({
  children,
  href,
  ...props
}) => {
  const handleSelect = useCallback(() => {
    window.open(href, '_blank');
  }, [href]);

  return (
    <DropdownMenuItem onSelect={handleSelect} {...props}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <DropdownMenuItemKeyShortcut>
          <ArrowSquareOut size={18} />
        </DropdownMenuItemKeyShortcut>
      </a>
    </DropdownMenuItem>
  );
};

export const DropdownMenuCheckboxItem: FunctionComponent<
  ComponentProps<typeof CheckboxItem>
> = ({ children, className, ...props }) => (
  <CheckboxItem
    className={clsx(styles.itemWithIndicator, className)}
    {...props}
  >
    <DropdownMenuItemCheck />
    {children}
  </CheckboxItem>
);

export const DropdownMenuRadioItem: FunctionComponent<
  ComponentProps<typeof RadioItem>
> = ({ children, className, ...props }) => (
  <RadioItem className={clsx(styles.itemWithIndicator, className)} {...props}>
    <DropdownMenuItemCheck />
    {children}
  </RadioItem>
);

type ItemKeyShortcutProps = WithChildren<{
  keys?: SpecialKey | (SpecialKey | string)[] | string;
}>;

export const DropdownMenuItemKeyShortcut: FunctionComponent<
  ItemKeyShortcutProps
> = ({ children: childrenProp, keys: keysProp }) => {
  let children: ReactNode;
  if (keysProp) {
    const keys = typeof keysProp === 'string' ? [keysProp] : keysProp;
    children = platformKeys(keys);
  } else {
    children = childrenProp;
  }
  return <span className={styles.itemKeyShortcut}>{children}</span>;
};
