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
  graph: {
    backgroundColor: 'rgba(190,190,190,0.0)',
    brushZoomColor: 'rgba(190,190,190,0.6)',
    axisLineColor: '#000000',
    textColor: '#000000',
    lineColor: '#005c99',
    splitLineColor: '#ffffff',
    buttonColor: '#d1d5db',
    on: '#32a852',
    off: 'red',
    yellow: 'yellow',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default Theme;
