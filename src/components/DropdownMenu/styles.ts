import { css } from '@emotion/react';
import {
  MediaQuery,
  MotionEnabled,
  slideDownAndFade,
  slideLeftAndFade,
  slideRightAndFade,
  slideUpAndFade,
} from 'styles';

export const contentStyle = css`
  width: 100vw;
  background-color: var(--background-active);
  border-radius: var(--border-radius-regular);
  padding: var(--5px);
  box-shadow: var(--shadow-elevated);

  ${MediaQuery.Tablet} {
    width: auto;
    min-width: var(--220px);
  }

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

export const itemStyle = css`
  font-size: var(--14px);
  line-height: 1;
  border-radius: var(--border-radius-small);
  min-height: var(--24px);
  padding: 0 var(--5px);
  position: relative;
  user-select: none;

  &,
  & > a {
    display: flex;
    align-items: center;
    outline: none;
  }

  & > a {
    flex: 1;
  }

  &[data-disabled] {
    color: var(--text-disabled);
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: var(--background-hover);
  }
`;

export const indicatorItemStyle = css`
  ${itemStyle}
  padding-left: var(--20px);
`;
