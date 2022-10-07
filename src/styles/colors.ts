export type RgbColor = [number, number, number];

const rgb = (r: number, g: number, b: number): RgbColor => [r, g, b];
export const rgba = ([r, g, b]: RgbColor, a: number) =>
  `rgba(${r}, ${g}, ${b}, ${a})`;

const toHex = (num: number) => {
  const hex = num.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export const rgbToHex = (rgb: RgbColor) => `#${rgb.map(toHex).join('')}`;

export const nameToVar = (str: string): string =>
  str
    .replace(/[A-Z]/, (match) => `-${match.toLocaleLowerCase()}`)
    .replace(/[0-9]+/, (match) => `-${match}`);

export const Color: Record<string, RgbColor> = {
  Blue: rgb(97, 175, 244),
  Green: rgb(96, 165, 97),
  Yellow: rgb(235, 169, 0),
  Red: rgb(176, 46, 12),
  Black: rgb(0, 0, 0),
  Dark: rgb(26, 38, 57),
  Dark1: rgb(27, 38, 57),
  Dark2: rgb(25, 33, 47),
  Dark3: rgb(26, 38, 57),
  Dark4: rgb(26, 38, 57),
  Dark5: rgb(26, 38, 57),
  Dark6: rgb(26, 38, 57),
  Dark7: rgb(26, 38, 57),
  White: rgb(255, 255, 255),
  Gray: rgb(131, 137, 149),
  Gray1: rgb(131, 137, 149),
  Gray2: rgb(172, 176, 185),
  Gray3: rgb(184, 187, 194),
  Gray4: rgb(198, 201, 206),
  Gray5: rgb(225, 226, 229),
  Gray6: rgb(247, 247, 248),
  Gray7: rgb(250, 250, 251),
} as const;
