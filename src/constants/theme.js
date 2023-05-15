import { Dimensions, Platform, PixelRatio } from "react-native";
const { width, height } = Dimensions.get("window");


export const Normalize = (size) => {
  const isLandscape = width > height ? true : false;
  const scale = !isLandscape ? width : height / 320
  const newSize = size * scale

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export const Resize = (size) => {
  const newSize = width / size

  return Math.round(newSize)
}

export const COLORS = {
  // base colors
  primary: "#24C16B", // green
  secondary: "#F0F0F0",   // dark green
  white: "#FFFFFF",
  black: "#000000",
  blackLighten: "#4d4d4d",
  blackLighten2: "#262626",

  Red: "#F44336",
  lightRed: "#EF5350",
  darkRed: "#B71C1C",
  accentRed: "#D50000",

  Pink: "#E91E63",
  lightPink: "#EC407A",
  darkPink: "#880E4F",
  accentPink: "#C51162",

  Purple: "#9C27B0",
  lightPurple: "#AB47BC",
  darkPurple: "#4A148C",
  accentPurple: "#AA00FF",

  Indigo: "#3F51B5",
  lightIndigo: "#5C6BC0",
  darkIndigo: "#1A237E",
  accentIndigo: "#304FFE",

  Blue: "#2196F3",
  lightBlue: "#42A5F5",
  darkBlue: "#0D47A1",
  accentBlue: "#2962FF",

  Cyan: "#00BCD4",
  lightCyan: "#26C6DA",
  darkCyan: "#006064",
  accentCyan: "#00B8D4",

  Teal: "#009688",
  lightTeal: "#26A69A",
  darkTeal: "#004D40",
  accentTeal: "#00BFA5",

  Green: "#4CAF50",
  lightGreen: "#66BB6A",
  darkGreen: "#1B5E20",
  accentGreen: "#00C853",

  Lime: "#CDDC39",
  lightLime: "#D4E157",
  darkLime: "#827717",
  accentLime: "#AEEA00",

  Yellow: "#FFEB3B",
  lightYellow: "#FFEE58",
  darkYellow: "#F57F17",
  accentYellow: "#FFD600",

  Amber: "#FFC107",
  lightAmber: "#FFCA28",
  darkAmber: "#FF6F00",
  accentAmber: "#FFAB00",

  Orange: "#FF9800",
  lightOrange: "#FFA726",
  darkOrange: "#E65100",
  accentOrange: "#FF6D00",

  Grey: "#9E9E9E",
  lightGrey: "#EAEAEA",
  darkGrey: "#212121",

  baseColor: "#FA0670",
  secondaryColor: "#F7941D",

  transparent: "transparent",
};

export const SIZES = {
  // global sizes
  base: Resize(60),
  font: Resize(34),
  radius: Resize(16),
  padding: Resize(48),
  padding2: Resize(40),
  padding3: Resize(30),
  padding4: Resize(24),
  padding5: Resize(20),

  // font sizes
  largeTitle: Normalize(50),
  h1: Normalize(30),
  h2: Normalize(22),
  h3: Normalize(20),
  h4: Normalize(18),
  h5: Normalize(16),
  h6: Normalize(14),
  body1: Normalize(30),
  body2: Normalize(20),
  body3: Normalize(16),
  body4: Normalize(14),
  body5: Normalize(12),
  body6: Normalize(10),

  // SIZING
  large: Normalize(50),
  medium: Normalize(35),
  small: Normalize(20),

  // app dimensions
  width,
  height
};

export const FONTS = {
  largeTitle: { fontFamily: "Roboto-Regular", fontSize: SIZES.largeTitle, lineHeight: Normalize(55) },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: Normalize(36) },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: Normalize(30) },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: Normalize(22) },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: Normalize(22) },
  h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight: Normalize(22) },
  h6: { fontFamily: "Roboto-Bold", fontSize: SIZES.h6, lineHeight: Normalize(22) },
  body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: Normalize(36) },
  body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: Normalize(30) },
  body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: Normalize(22) },
  body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: Normalize(22) },
  body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: Normalize(22) },
  body6: { fontFamily: "Roboto-Regular", fontSize: SIZES.body6, lineHeight: Normalize(22) },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
