import { CheckboxProps, Indicator, Root } from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Check } from 'phosphor-react';
import { FunctionComponent } from 'react';
import { WithClassName } from 'types/PropTypes';
import styles from './Checkbox.module.scss';

type Props = WithClassName<CheckboxProps>;

export const Checkbox: FunctionComponent<Props> = ({ className, ...props }) => (
  <Root className={clsx(styles.checkbox, className)} {...props}>
    <Indicator className={styles.indicator}>
      <Check size={12} color="white" weight="regular" />
    </Indicator>
  </Root>
);
