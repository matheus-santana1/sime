import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs, useRouter } from 'expo-router';
import TabBar from '../components/TabBar';
import { View, StatusBar } from 'react-native';
import { IconButton } from 'react-native-paper';
import Theme from 'theme';
import Status from '../components/Status';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="relative flex-1">
      <View
        className="absolute z-[1] flex-row justify-between w-full items-center"
        style={{ top: StatusBar.currentHeight || 0 || insets.top }}>
        <IconButton
          className="m-0"
          icon="arrow-left-circle"
          iconColor={Theme.colors.wave}
          onPress={() => router.navigate('intro')}
          size={42}
        />
        <Status />
      </View>
      <Tabs tabBar={(props) => <TabBar {...props} />} initialRouteName="graph/index">
        <Tabs.Screen name="graph/index" options={{ title: 'Gráfico', headerShown: false }} />
        <Tabs.Screen name="data/index" options={{ title: 'Dados', headerShown: false }} />
        <Tabs.Screen name="map/index" options={{ title: 'Mapa', headerShown: false }} />
      </Tabs>
    </View>
  );
}
