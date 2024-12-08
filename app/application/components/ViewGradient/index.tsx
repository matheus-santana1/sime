import { View, StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Theme from 'theme';

export default function ViewGradient({ children }: { children?: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: 50 + (StatusBar.currentHeight || 0 || insets.top) }]}>
      <LinearGradient
        className="absolute inset-x-0 top-0"
        style={{ height: height + (StatusBar.currentHeight || 0) + getNavigationBarHeight() }}
        colors={[Theme.colors.initGradient, Theme.colors.background]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.wave,
    marginBottom: 110,
  },
});

const { height } = Dimensions.get('window');
function getNavigationBarHeight() {
  if (Platform.OS === 'android') {
    const screenHeight = Dimensions.get('screen').height;
    const windowHeight = Dimensions.get('window').height;
    return screenHeight - windowHeight - (StatusBar.currentHeight || 0);
  }
  return 0;
}
