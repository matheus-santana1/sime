import { DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'PlusJakartaSans_400Regular',
};

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7257ff',
    accent: '#',
    background: '#3498db',
    text: '#',
    wave: '#005c99',
    white: '#ffffff',
    black: '#000000',
    error: '#e74c3c',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default Theme;
