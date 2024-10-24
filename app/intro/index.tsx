import { Text } from 'react-native-paper';
import { View } from 'react-native';
import Theme from 'theme';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function Intro() {
  return (
    <>
      <ExpoStatusBar style="light" backgroundColor={Theme.colors.wave} />
      <View
        style={{ backgroundColor: Theme.colors.wave }}
        className="flex-1 justify-center items-center">
        <Text className="text-3xl">Olá mundo!</Text>
      </View>
    </>
  );
}
