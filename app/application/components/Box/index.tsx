import { View, Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import React from 'react';
import Theme from 'theme';
import { useSystem } from 'WebSocket';

export default function Box() {
  const { nivelAtual, horaAtual } = useSystem();

  return (
    <View
      className="flex-1 h-full m-2 rounded-lg items-center justify-center"
      style={{ backgroundColor: Theme.colors.wave }}>
      <Text className="text-white" style={{ fontSize: moderateScale(18, 0.3) }}>
        Nível {nivelAtual} metros às {horaAtual}hrs
      </Text>
    </View>
  );
}
