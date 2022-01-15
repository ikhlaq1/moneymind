import { scale } from './scale.utils';

// only use this when you dont want to scale the font or if you want to scale with a different percentage
export const defaultFontSize = Object.freeze({
  h1: 22.4, //28 * 0.8
  h2: 19.2, //24 * 0.8
  h3: 14.4, //18 * 0.8
  h4: 12.8, //16 * 0.8
  body: 11.2, //14 * 0.8
  small: 10.4, //13 * 0.8
  xSmall: 9.6, //12 * 0.8
  xxSmall: 8, //10 * 0.8
});

const FontSize = Object.freeze({
  h1: scale(defaultFontSize.h1),
  h2: scale(defaultFontSize.h2),
  h3: scale(defaultFontSize.h3),
  h4: scale(defaultFontSize.h4),
  body: scale(defaultFontSize.body),
  small: scale(defaultFontSize.small),
  xSmall: scale(defaultFontSize.xSmall),
  xxSmall: scale(defaultFontSize.xxSmall),
});

export default FontSize;
