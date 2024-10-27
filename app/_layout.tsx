import { Slot } from 'expo-router';
import { Dimensions, StatusBar, Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { setVisibilityAsync, setBehaviorAsync } from 'expo-navigation-bar';
import {
  useFonts,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_400Regular,
} from '@expo-google-fonts/plus-jakarta-sans';
import Theme from '../theme';

const { height } = Dimensions.get('window');

export default function Layout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (Platform.OS == 'android') {
    setVisibilityAsync('hidden');
    setBehaviorAsync('overlay-swipe');
  }

  return (
    <PaperProvider theme={Theme}>
      <ExpoStatusBar style="light" />
      <LinearGradient
        className="absolute inset-x-0 top-0"
        style={{ height: height + (StatusBar.currentHeight || 0) }}
        colors={[Theme.colors.initGradient, Theme.colors.background]}
      />
      <Slot />
    </PaperProvider>
  );
}
