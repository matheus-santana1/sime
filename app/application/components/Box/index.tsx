import { View, Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import React from 'react';
import Theme from 'theme';

export default function Box() {
  return (
    <View
      className="flex-1 h-full m-2 rounded-lg items-center justify-center"
      style={{ backgroundColor: Theme.colors.wave }}>
      <Text className="text-white" style={{ fontSize: moderateScale(18, 0.3) }}>
        Nível 22 metros às 18:30hrs
      </Text>
    </View>
  );
}
