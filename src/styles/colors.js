import { DefaultTheme } from "@react-navigation/native";

const commonColor = {
  colors: {
    commonWhite: '#FFFFFF',
    commonBlack: '#000000',
    commonGreen: 'green',
    commonBtn: '#457FD4',
    YellowBGButton: '#ECE447',
    greyBgColor: '#C1C1E2',


    activeColor: '#DE5E69',
    deactiveColor: '#DE5E6950',
    boxActiveColor: '#DE5E6940',
    primaryRedHex: '#DC3535',
    primaryOrangeHex: '#D17842',
    primaryBlackHex: '#0C0F14',
    primaryDarkGreyHex: '#141921',
    secondaryDarkGreyHex: '#21262E',
    primaryGreyHex: '#252A32',
    secondaryGreyHex: '#252A32',
    primaryLightGreyHex: '#52555A',
    secondaryLightGreyHex: '#AEAEAE',
    primaryWhiteHex: '#FFFFFF',
    primaryBlackRGBA: 'rgba(12,15,20,0.5)',
    secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
    black: 'rgba(20,19,19,1)',
    blackOpacity10: 'rgba(0,0,0,0.1)',
    blackOpacity12: 'rgba(0,0,0,0.12)',
    blackOpacity15: 'rgba(0,0,0,0.15)',
    blackOpacity20: 'rgba(0,0,0,0.20)',
    blackOpacity25: 'rgba(0,0,0,0.25)',
    blackOpacity40: 'rgba(0,0,0,0.4)',
    blackOpacity50: 'rgba(0,0,0,0.5)',
    blackOpacity60: 'rgba(0,0,0,0.6)',
    blackOpacity70: 'rgba(0,0,0,0.7)',
    blackOpacity80: 'rgba(0,0,0,0.8)',
    blackOpacity90: 'rgba(0,0,0,0.9)',
    white: '#FFFFFFFF',
    whiteOpacity50: 'rgba(255, 255, 255, 0.5)',
    whiteOpacity70: 'rgba(255, 255, 255, 0.7)',
    // appColor
    pendingBtn: '#FFDCA8',
    grey300: '#BFBFBF',
    grey900: '#1E1E1E',
    YellowBtn: '#ECE447',
    red: 'red'
  },
  fonts: DefaultTheme.fonts,

};

const light = {
  colors: {
    themeColor: '#FDEECC',
    white: '#000000',
    sky: '#DE5E69',
    gray: 'gray',
    ...commonColor.colors,
  },
  fonts: DefaultTheme.fonts,

};

const dark = {
  colors: {
    themeColor: '#FDEECC',
    white: '#FFFFFF',
    sky: '#831a23',
    gray: 'white',
    ...commonColor.colors,
  },
  fonts: DefaultTheme.fonts,

};

export default { light, dark };
