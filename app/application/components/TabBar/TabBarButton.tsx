import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Globe from 'assets/icons/globe';
import Graph from 'assets/icons/graph';
import Water from 'assets/icons/water';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  style: {};
}

const icon: any = {
  map: (props: any) => <Globe size={40} {...props} />,
  graph: (props: any) => <Graph size={40} {...props} />,
  data: (props: any) => <Water size={40} {...props} />,
};

const TabBarButton = ({ onPress, onLongPress, isFocused, routeName, color, style }: Props) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
    };
  });

  return (
    <Pressable style={[styles.tabbarItem, style]} onPress={onPress} onLongPress={onLongPress}>
      <Animated.View style={animatedIconStyle}>{icon[routeName]({ color: color })}</Animated.View>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
