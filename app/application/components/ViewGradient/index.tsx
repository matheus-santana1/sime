import { View, StyleSheet, Dimensions, StatusBar, Platform, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Theme from 'theme';

export default function ViewGradient({
  children,
  style,
}: {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        { paddingTop: 50 + (StatusBar.currentHeight || 0 || insets.top) },
        style,
      ])}>
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
