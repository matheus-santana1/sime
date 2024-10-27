import { DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'PlusJakartaSans_400Regular',
};

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    initGradient: '#3498db',
    wave: '#005c99',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default Theme;
