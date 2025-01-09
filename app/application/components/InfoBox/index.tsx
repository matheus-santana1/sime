import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Text } from 'react-native-paper';
import React, { useEffect } from 'react';
import Theme from 'theme';
import { useSystem } from 'WebSocket';
import { AnimatedRollingNumber } from 'react-native-animated-rolling-numbers';
import { Easing } from 'react-native-reanimated';

export default function Box() {
  const { nivelAtual, horaAtual, variacao, risco, setSystem } = useSystem();

  useEffect(() => {
    setSystem({ nivelAtual: 0, variacao: 0 });
  }, []);

  return (
    <>
      <View
        className="flex h-16 w-full rounded-2xl justify-center"
        style={{ backgroundColor: Theme.colors.wave, marginTop: moderateScale(15) }}>
        <View className="flex-row flex-1 items-center justify-center">
          <Text className=" text-white" style={{ fontSize: moderateScale(20) }}>
            Risco de enchentes:&nbsp;
          </Text>
          <Text
            style={{
              fontSize: moderateScale(20),
              color:
                risco == 'IMINENTE'
                  ? Theme.graph.off
                  : risco == 'PROVÁVEL'
                    ? Theme.graph.yellow
                    : Theme.graph.on,
            }}>
            {risco}
          </Text>
        </View>
      </View>
      <View
        className="flex-auto w-full rounded-2xl justify-center items-center"
        style={{ backgroundColor: Theme.colors.wave, marginTop: moderateScale(15) }}>
        <Text className="text-white text-center" style={{ fontSize: moderateScale(30) }}>
          NÍVEL
        </Text>
        <View className="flex items-end flex-row gap-2">
          <AnimatedRollingNumber
            value={Number(nivelAtual)}
            textStyle={{
              fontSize: moderateScale(70, 1.3),
              color: 'white',
            }}
            toFixed={2}
            locale={'de-DE'}
            spinningAnimationConfig={{ duration: 500, easing: Easing.circle }}
          />
          <Text className="text-white" style={{ fontSize: moderateScale(70, 1.3) }}>
            m
          </Text>
        </View>
        <Text className="text-white text-center" style={{ fontSize: moderateScale(25) }}>
          Às {horaAtual}.
        </Text>
      </View>
      <View
        className="flex-auto w-full rounded-2xl justify-center items-center"
        style={{ backgroundColor: Theme.colors.wave, marginTop: moderateScale(15) }}>
        <Text className="text-white text-center" style={{ fontSize: moderateScale(30) }}>
          VARIAÇÃO
        </Text>
        <View className="flex items-end flex-row gap-2">
          <AnimatedRollingNumber
            value={Number(variacao)}
            textStyle={{
              fontSize: moderateScale(60, 1.3),
              color: 'white',
            }}
            toFixed={2}
            showPlusSign
            showMinusSign
            locale={'de-DE'}
            signStyle={{
              fontSize: moderateScale(60, 1.3),
              color: variacao >= 0 ? Theme.graph.on : Theme.graph.off,
              marginRight: 10,
            }}
            spinningAnimationConfig={{ duration: 500, easing: Easing.circle }}
          />
          <Text className="text-white" style={{ fontSize: moderateScale(60, 1.3) }}>
            m
          </Text>
        </View>
        <Text className="text-white text-center" style={{ fontSize: moderateScale(25) }}>
          Nos últimos 10 segundos.
        </Text>
      </View>
    </>
  );
}
