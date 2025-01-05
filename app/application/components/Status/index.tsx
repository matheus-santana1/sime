import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSystem } from 'WebSocket';
import React from 'react';
import Theme from 'theme';

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
    <View className="mr-3 flex w-36">
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
