import { Slot } from 'expo-router';
import { Dimensions, StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Theme from '../colors';

const { height } = Dimensions.get('window');

export default function Layout() {
  return (
    <PaperProvider>
      <ExpoStatusBar style="light" />
      <SafeAreaView className="flex-1">
        <LinearGradient
          className="absolute inset-x-0 top-0"
          style={{ height: height + (StatusBar.currentHeight || 0) }}
          colors={[Theme.colors.background, Theme.colors.white]}
        />
        <Slot />
      </SafeAreaView>
    </PaperProvider>
  );
}
