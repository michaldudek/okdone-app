import { css, Global } from '@emotion/react';
import reset from 'emotion-reset';
import { FunctionComponent } from 'react';

export const GlobalStyles: FunctionComponent = () => (
  <Global
    styles={css`
      ${reset}
    `}
  />
);
