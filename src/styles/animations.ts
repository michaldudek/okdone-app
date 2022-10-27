import { css, keyframes } from '@emotion/react';

export const MotionEnabled = `@media (prefers-reduced-motion: no-preference)`;

export const slideUpAndFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(var(--slide-length, 25%));
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideRightAndFade = keyframes`
  0% {
    opacity: 0;
    transform: translateX(var(--slide-length, 25%));
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideDownAndFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(var(--slide-length, 25%));
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideLeftAndFade = keyframes`
  0% {
    opacity: 0;
    transform: translateX(var(--slide-length, 25%));
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInStyles = css`
  ${MotionEnabled} {
    will-change: transform, opacity;
    animation-duration: var(--transition-accent);
    animation-timing-function: var(--ease-regular);

    &[data-state='open'] {
      &[data-side='top'] {
        animation-name: ${slideUpAndFade};
      }
      &[data-side='right'] {
        animation-name: ${slideLeftAndFade};
      }
      &[data-side='bottom'] {
        animation-name: ${slideDownAndFade};
      }
      &[data-side='left'] {
        animation-name: ${slideRightAndFade};
      }
    }
  }
`;
