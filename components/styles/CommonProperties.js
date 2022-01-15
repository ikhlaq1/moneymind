import FontSize from './FontSize';
import { scale } from './scale.utils';
import Color from './Color';

const base = scale(12 * 0.8);
const borderRadiusBase = base / 2;
const fontFamily = 'poppins';
const fontItalic = 'poppinsItalic';

const properties = {
  m: 'margin',
  p: 'padding',
};

const sides = {
  t: 'Top',
  b: 'Bottom',
  l: 'Left',
  r: 'Right',
  x: 'Horizontal',
  y: 'Vertical',
  '': '',
};

const sizes = {
  0: 0,
  1: base * 0.25,
  2: base * 0.5,
  3: base,
  4: base * 1.5,
  5: base * 2,
};

const getSpacing = () => {
  return Object.entries(properties).reduce((acum, [property, propertyValue]) => {
    Object.entries(sides).forEach(([side, sideValue]) => {
      Object.entries(sizes).forEach(([size, sizeValue]) => {
        acum[property + side + size] = {
          [propertyValue + sideValue]: sizeValue,
        };
      });
    });

    return acum;
  }, {});
};

const spacing = getSpacing();

const CommonProperties = {
  defaultContainer: {
    flex: 1,
    backgroundColor: Color.accent,
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    width: '50%',
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shrink: {
    flexShrink: 1,
  },
  centerItems: {
    alignItems: 'center',
  },
  centerAlignment: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
  borderRadius: {
    borderRadius: borderRadiusBase,
  },
  borderTopRadius: {
    borderTopRightRadius: borderRadiusBase,
    borderTopLeftRadius: borderRadiusBase,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  fontFamily: {
    fontFamily,
  },
  fontItalic: {
    fontFamily: fontItalic,
  },
  alignSelfToEnd: {
    alignSelf: 'flex-end',
  },
  h1: {
    fontSize: FontSize.h1,
  },
  h2: {
    fontSize: FontSize.h2,
  },
  h3: {
    fontSize: FontSize.h3,
  },
  h4: {
    fontSize: FontSize.h4,
  },
  body: {
    fontSize: FontSize.body,
  },
  small: {
    fontSize: FontSize.small,
  },
  xSmall: {
    fontSize: FontSize.xSmall,
  },
  xxSmall: {
    fontSize: FontSize.xxSmall,
  },
  borderRadius1: {
    borderRadius: sizes['2'], // ~6
  },
  borderRadius2: {
    borderRadius: sizes['3'], // ~12
  },
  borderRadius3: {
    borderRadius: sizes['5'], // ~24
  },
  borderRadius4: {
    borderRadius: sizes['5'] * 2, // ~ 48
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  ...spacing,
};

export default CommonProperties;
