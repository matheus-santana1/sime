import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import useWebSocketDefault, { Options } from 'react-use-websocket';
import { useSystem, MessagePayload } from '../../../WebSocket';
import TabBar from '../components/TabBar';
import { View, StatusBar } from 'react-native';
import { IconButton } from 'react-native-paper';
import Theme from 'theme';
import Status from '../components/Status';
import { useEffect } from 'react';
import moment from 'moment';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  //const { urlWebsocket } = useLocalSearchParams();
  const urlWebsocket = '192.168.0.13:8080';

  const { url, setSystem, desconectar, conectar, chartRef } = useSystem();
  const socketOptions: Options = {
    onClose: () => {
      desconectar();
    },
    onMessage: (message) => {
      onMessageAction(JSON.parse(message.data));
    },
  };

  const { sendJsonMessage } = useWebSocketDefault(url, socketOptions);
  useEffect(() => {
    setSystem({ defaultUrl: 'ws://' + urlWebsocket, sendMessage: sendJsonMessage });
    conectar();
  }, []);

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
      <Tabs tabBar={(props) => <TabBar {...props} />} initialRouteName="data/index">
        <Tabs.Screen name="graph/index" options={{ title: 'Gráfico', headerShown: false }} />
        <Tabs.Screen name="data/index" options={{ title: 'Dados', headerShown: false }} />
        <Tabs.Screen name="map/index" options={{ title: 'Mapa', headerShown: false }} />
      </Tabs>
    </View>
  );

  function onMessageAction(data: MessagePayload) {
    if ('conectado' in data) {
      setSystem({ conectado: true, isPlaying: true });
    }
    if ('prevNiveis' in data) {
      const now = moment();
      const times = [];
      for (let i = 6; i >= 0; i--) {
        times.push(
          now
            .clone()
            .subtract(i * 10, 'minutes')
            .format('HH:mm:ss')
        );
      }
      const graphOptions = {
        xAxis: [
          {
            data: times,
          },
        ],
        series: [
          {
            data: data.prevNiveis,
          },
        ],
      };
      setSystem({ prevNiveis: graphOptions });
    }
    if (data.nivel !== undefined && data.nivel !== null) {
      const horaAtual = moment().format('HH:mm:ss');
      chartRef?.current?.updateChart({ x: horaAtual, y: data.nivel });
      setSystem({ nivelAtual: data.nivel, horaAtual });
    }
    if (data.variacao !== undefined && data.variacao !== null) {
      setSystem({ variacao: data.variacao });
    }
  }
}
