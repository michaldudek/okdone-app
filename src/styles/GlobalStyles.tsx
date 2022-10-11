import { css, Global } from '@emotion/react';
import { blue, lime, slate, tomato, yellow } from '@radix-ui/colors';
import reset from 'emotion-reset';
import { FunctionComponent } from 'react';
import { MediaQuery } from './breakpoints';
import { font } from './font';
import { pxToRem } from './utils/pxToRem';

export const GlobalStyles: FunctionComponent = () => (
  <Global
    styles={css`
      ${reset}
      ${font}

      html {
        font-family: 'Noto Sans', sans-serif;
        font-size: 16px;
        color: var(--text-primary);
        background-color: var(--background-app);
      }

      body {
        font-size: var(--14px);
      }

      * {
        box-sizing: border-box;
      }

      /* handy pixels to rems */
      :root {
        ${[
          2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 30, 32, 36, 40, 44, 48,
          50, 52, 56, 60, 64, 70, 80, 90, 100, 120,
        ].map((px) => `--${px}px: ${pxToRem(px)}\n`)}
      }

      /* color pallete */
      :root {
        /* color-scheme: light; */

        --color-brand: ${blue.blue9};
        --color-accent: var(--color-brand);
        --color-success: ${lime.lime9};
        --color-warning: ${yellow.yellow9};
        --color-danger: ${tomato.tomato9};
        --color-active: #ffffff;

        --accent-primary: var(--color-accent);
        --accent-success: var(--color-success);
        --accent-warning: var(--color-warning);
        --accent-danger: var(--color-danger);

        --background-accent: var(--accent-primary);
        --background-app: ${slate.slate1};
        --background-subtle: ${slate.slate2};
        --background-element: ${slate.slate3};
        --background-hover: ${slate.slate4};
        /* --background-active: ${slate.slate5}; */
        --background-active: var(--color-active);
        --background-solid: ${slate.slate9};
        --background-solid-hover: ${slate.slate10};
        --text-primary: ${slate.slate12};
        --text-secondary: ${slate.slate11};
        --text-tertiary: ${slate.slate10};
        --text-inverse: ${slate.slate1};
        --border-subtle: ${slate.slate6};
        --border-element: ${slate.slate7};
        --border-hover: ${slate.slate8};
        --divider: var(--border-subtle);
        --fill-accent-primary: ${blue.blue3};
        --fill-accent-success: ${lime.lime3};
        --fill-accent-warning: ${yellow.yellow3};
        --fill-accent-danger: ${tomato.tomato3};

        --button-primary: var(--accent-primary);
        --button-primary-label: var(--text-inverse);
        --button-secondary: var(--background-element);
        --button-secondary-label: var(--text-primary);

        --highlight-background: var(--background-hover);
        --highlight-shadow: 0 0 0 2px var(--border-subtle);

        --border-radius-small: var(--4px);
        --border-radius-regular: var(--8px);
        --border-radius-large: var(--16px);
        --border-radius-full: 100%;

        --shadow-none: rgba(0, 0, 0, 0) 0 0 0;
        --shadow-elevated: rgba(0, 0, 0, 0.16) 0px 1px 4px;

        --transition-regular: 0.15s;
        --ease-regular: ease-in-out;
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
