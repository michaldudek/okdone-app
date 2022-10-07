import { css, Global } from '@emotion/react';
import reset from 'emotion-reset';
import { FunctionComponent } from 'react';
import { Color, rgba, rgbToHex } from 'styles/colors';
import { MediaQuery } from './breakpoints';
import { pxToRem } from './pxToRem';

export const GlobalStyles: FunctionComponent = () => (
  <Global
    styles={css`
      ${reset}

      html {
        font-size: 16px;
        color: var(--text-primary);
        background-color: var(--background-primary);
      }

      * {
        box-sizing: border-box;
      }

      /* handy pixels to rems */
      :root {
        ${[
          2, 3, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 50, 52,
          56, 60, 64, 70, 80, 90, 100, 120,
        ].map((px) => `--${px}px: ${pxToRem(px)}\n`)}
      }

      /* color pallete */
      :root {
        /* color-scheme: light; */

        --color-accent: ${rgbToHex(Color.Blue)};
        --color-success: ${rgbToHex(Color.Green)};
        --color-warning: ${rgbToHex(Color.Yellow)};
        --color-error: ${rgbToHex(Color.Red)};

        --accent-primary: var(--color-accent);
        --accent-secondary: var(--color-success);
        --accent-tertiary: var(--color-warning);
        --accent-quarternary: var(--color-error);

        --background-accent: var(--accent-primary);
        --background-primary: ${rgbToHex(Color.White)};
        --background-secondary: ${rgbToHex(Color.Gray6)};
        --text-primary: ${rgbToHex(Color.Dark)};
        --text-secondary: ${rgba(Color.Dark, 0.6)};
        --text-tertiary: ${rgba(Color.Dark, 0.3)};
        --text-quaternary: ${rgba(Color.Dark, 0.18)};
        --text-inverse: ${rgbToHex(Color.White)};
        --divider: ${rgbToHex(Color.Gray4)};
        --fill-primary: ${rgba(Color.Gray, 0.2)};
        --fill-secondary: ${rgba(Color.Gray, 0.16)};
        --fill-tertiary: ${rgba(Color.Gray, 0.12)};
        --fill-quarternary: ${rgba(Color.Gray, 0.08)};
        --fill-accent-primary: ${rgba(Color.Blue, 0.08)};
        --fill-accent-success: ${rgba(Color.Green, 0.12)};
        --fill-accent-warning: ${rgba(Color.Yellow, 0.1)};
        --fill-accent-error: ${rgba(Color.Red, 0.1)};

        --button-primary: var(--accent-primary);
        --button-label: var(--text-inverse);

        --highlight-shadow: 0 0 0 2px var(--divider);
      }

      #root {
        width: 100vw;
        height: 100vh;

        ${MediaQuery.Tablet} {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    `}
  />
);
