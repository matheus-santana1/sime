import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Theme from 'theme';

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const buttonWidth = (dimensions.width - 20) / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
    tabPositionX.value = ((e.nativeEvent.layout.width - 20) / state.routes.length) * state.index;
  };

  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View
        style={[
          animatedStyle,
          styles.circle,
          { height: dimensions.height - 15, width: buttonWidth },
        ]}
      />
      {state.routes.map((route, index) => {
        const route_name: string = route.name.replace(/\/index$/, '');
        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const conditionalStyle = index === 0 || index === 2 ? { paddingHorizontal: 15 } : {};
        return (
          <TabBarButton
            key={route_name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route_name}
            color={isFocused ? 'white' : Theme.colors.primary}
            style={conditionalStyle}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    alignSelf: 'center',
    elevation: 1,
  },
  circle: {
    position: 'absolute',
    backgroundColor: Theme.colors.wave,
    borderRadius: 30,
    marginHorizontal: 10,
  },
});
