import { keyframes } from '@emotion/react';

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
