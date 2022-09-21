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
        color: var(--text-primary);
      }

      * {
        box-sizing: border-box;
      }

      :root {
        ${[
          2, 3, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 50, 52,
          56, 60, 64, 70, 80, 90, 100, 120,
        ].map((px) => `--${px}px: ${pxToRem(px)}\n`)}

        /* color pallete */
        --color-black-full: #000;
        --color-black: #111;
        --color-gray-dark: #666;
        --color-gray: #aaa;
        --color-white: #fff;
        --color-white-bg: #f2f4f8;
        --color-blue: #32cbff;
        --color-green: #60a561;
        --color-red: #b02e0c;

        /* default theme */
        --bg-primary: var(--color-white-bg);
        --bg-content: var(--color-white);
        --bg-done: var(--color-blue);

        --border-subtle: var(--color-gray);
        --border-focus: var(--color-blue);

        --text-primary: var(--color-black);
        --text-highlight: var(--color-black-full);
        --text-disabled: var(--color-gray-dark);
        --text-inverse: var(--color-white);

        --shadow-focus: 0 0 0 2px var(--border-focus);
        --shadow-focus-alt: 0 0 0 2px var(--border-subtle);
        --shadow-light: 0 2px 10px var(--color-gray-dark);
      }

      #root {
        width: 100vw;
        height: 100vh;

        /* gradient copied from grabient.com */
        background-color: #8bc6ec;
        background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);

        ${MediaQuery.Tablet} {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    `}
  />
);
