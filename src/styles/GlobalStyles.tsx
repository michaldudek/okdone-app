import { css, Global } from '@emotion/react';
import reset from 'emotion-reset';
import { FunctionComponent } from 'react';
import { MediaQuery } from './breakpoints';
import { pxToRem } from './pxToRem';

export const GlobalStyles: FunctionComponent = () => (
  <Global
    styles={css`
      ${reset}

      html {
        font-size: 16px;
      }

      * {
        box-sizing: border-box;
      }

      :root {
        ${[
          8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 50, 52, 56, 60, 64,
          70, 80, 90, 100, 120,
        ].map((px) => `--${px}px: ${pxToRem(px)}\n`)}

        /* colors */
        --bg-primary: white;
      }

      #root {
        width: 100vw;
        height: 100vh;

        background-color: #4158d0;
        background-image: linear-gradient(
          43deg,
          #4158d0 0%,
          #c850c0 46%,
          #ffcc70 100%
        );

        ${MediaQuery.Tablet} {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    `}
  />
);
