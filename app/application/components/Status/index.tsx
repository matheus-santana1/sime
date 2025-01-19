import { View, Linking, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Text } from 'react-native-paper';
import { useSystem } from 'WebSocket';
import React from 'react';
import Theme from 'theme';
import { moderateScale } from 'react-native-size-matters';

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
        style={{marginRight: moderateScale(5)}}
        mode="contained"
        buttonColor={Theme.graph.off}
        textColor={Theme.graph.splitLineColor}
        onPress={() => callNumber(199)}>
        <View style={{gap: moderateScale(7)}} className='flex-row items-center justify-center'>
          <Ionicons name="call" size={18} color="white"/>
          <Text className='text-white'>Emergência</Text>
        </View>
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
