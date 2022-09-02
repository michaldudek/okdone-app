import { css } from '@emotion/react';
import { MediaQuery } from './breakpoints';

// seed for picum.photos to keep the same photo when resizing window
const seed = Number(Math.random() * 1000).toFixed(0);

export const bgImage = css`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: overlay;

  ${MediaQuery.Tablet} {
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url('https://picsum.photos/seed/${seed}/768/1024/');
  }

  ${MediaQuery.Laptop} {
    background-image: url('https://picsum.photos/seed/${seed}/1200/800/');
  }

  ${MediaQuery.Monitor} {
    background-image: url('https://picsum.photos/seed/${seed}/1800/1200/');
  }
`;
