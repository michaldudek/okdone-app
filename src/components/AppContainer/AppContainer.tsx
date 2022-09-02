import { FunctionComponent, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const AppContainer: FunctionComponent<Props> = ({ children }) => {
  return <main>{children}</main>;
};
