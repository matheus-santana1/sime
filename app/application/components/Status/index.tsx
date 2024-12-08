import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import Theme from 'theme';

export default function Status() {
  return (
    <View className="mr-3 flex w-36">
      <Button
        mode="contained"
        icon="check-bold"
        buttonColor={Theme.graph.on}
        textColor={Theme.graph.textColor}
        onPress={() => {}}>
        Conectado
      </Button>
    </View>
  );
}

/*
<View className="bg-red-600 flex items-center justify-center m-1">
<Text>Status</Text>
</View>
*/
