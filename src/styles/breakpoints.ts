import { pxToRem } from './utils/pxToRem';

const toMediaQuery = (px: number): string =>
  `@media (min-width: ${pxToRem(px)})`;

export enum Breakpoints {
  Phone = 0,
  Landscape = 576,
  Tablet = 768,
  Laptop = 1200,
  Monitor = 1400,
}

/**
 * Helper media queries.
 *
 * Use with emotion:
 *
 *    css`
 *      ${MediaQuery.Landscape} {
 *        color: black;
 *      }
 *    `
 */
export const MediaQuery: Record<keyof typeof Breakpoints, string> = {
  Phone: toMediaQuery(Breakpoints.Phone),
  Landscape: toMediaQuery(Breakpoints.Landscape),
  Tablet: toMediaQuery(Breakpoints.Tablet),
  Laptop: toMediaQuery(Breakpoints.Laptop),
  Monitor: toMediaQuery(Breakpoints.Monitor),
};
