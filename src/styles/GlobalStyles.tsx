import { css, Global } from '@emotion/react';
import reset from 'emotion-reset';
import { FunctionComponent } from 'react';
import { bgImage } from './bgImage';
import { MediaQuery } from './breakpoints';

export const GlobalStyles: FunctionComponent = () => (
  <Global
    styles={css`
      ${reset}

      html {
        font-size: 16px;
      }

      :root {
        --16px: 1rem;

        /* colors */
        --bg-primary: white;
      }

      #root {
        width: 100vw;
        height: 100vh;

        ${bgImage}

        ${MediaQuery.Tablet} {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    `}
  />
);
