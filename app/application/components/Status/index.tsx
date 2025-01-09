import { View, Linking, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useSystem } from 'WebSocket';
import React from 'react';
import Theme from 'theme';

const callNumber = (phoneNumber: number) => {
  const url = `tel:${phoneNumber}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Erro', 'Seu dispositivo não pode fazer chamadas telefônicas');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('Erro ao abrir o discador:', err));
};

export default function Status() {
  const { conectado, conectando, conectar, desconectar } = useSystem();
  const onClick = () => {
    if (conectado) {
      desconectar();
    } else {
      conectar();
    }
  };

  return (
    <View className="flex w-full flex-row justify-end px-3">
      <Button
        className="mr-4"
        mode="contained"
        buttonColor={Theme.graph.off}
        textColor={Theme.graph.splitLineColor}
        onPress={() => callNumber(199)}>
        Emergência
      </Button>
      <Button
        loading={conectando}
        labelStyle={conectando && { marginHorizontal: 15 }}
        mode="contained"
        buttonColor={conectado ? Theme.colors.wave : Theme.graph.on}
        textColor={Theme.graph.splitLineColor}
        onPress={onClick}>
        {!conectando ? (conectado ? 'Desconectar' : 'Conectar') : ''}
      </Button>
    </View>
  );
}

/*
//{!conectando ? (conectado ? 'Desconectar' : 'Conectar') : ''}
<View className="bg-red-600 flex items-center justify-center m-1">
<Text>Status</Text>
</View>
*/
