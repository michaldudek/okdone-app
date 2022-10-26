import { Check } from 'phosphor-react';
import { ComponentProps, FunctionComponent } from 'react';

type Props = ComponentProps<typeof Check>;

export const Logo: FunctionComponent<Props> = ({
  color = 'var(--color-brand)',
  ...props
}) => {
  return <Check color={color} weight="light" {...props} />;
};
