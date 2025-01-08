import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import React from 'react';
import Theme from 'theme';
import { useSystem, parseDotToComma } from 'WebSocket';
import { Text } from 'react-native-paper';

export default function Box() {
  const { nivelAtual, horaAtual } = useSystem();

  return (
    <View
      className="flex-1 h-full m-2 rounded-lg items-center justify-center"
      style={{ backgroundColor: Theme.colors.wave }}>
      <Text className="text-white" style={{ fontSize: moderateScale(18, 0.3) }}>
        Nível: {parseDotToComma(nivelAtual)} metros às {horaAtual}.
      </Text>
    </View>
  );
}
