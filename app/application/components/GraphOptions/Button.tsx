import { Pressable, Animated, GestureResponderEvent } from 'react-native';
import { Icon } from 'react-native-paper';
import { useState, useRef, useEffect } from 'react';
import { useSystem } from 'WebSocket';
import Theme from 'theme';

interface ButtonProps {
  type: 'button' | 'switch' | 'playpause';
  onClick?: (event: GestureResponderEvent | boolean) => void;
  disabled?: boolean;
  icon: string;
  size: number;
  usePlayPauseState?: boolean;
}

const Button = (props: ButtonProps) => {
  const localIsSwitchOn = useState(false);
  const isSwitchOn = props.usePlayPauseState
    ? useSystem((state) => state.isPlaying)
    : localIsSwitchOn[0];
  const setIsSwitchOn = props.usePlayPauseState
    ? useSystem((state) => state.setSystem)
    : localIsSwitchOn[1];
  const [animation] = useState(new Animated.Value(0));
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onToggleSwitch = () => {
    const newState = !isSwitchOn;
    if (!props.usePlayPauseState && props.onClick) {
      setIsSwitchOn(newState);
      props.onClick(newState);
    } else {
      setIsSwitchOn({ isPlaying: newState } as any);
    }
    Animated.timing(animation, {
      toValue: newState ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 1.15,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const backgroundButton = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [Theme.graph.buttonColor, Theme.colors.wave],
  });

  useEffect(() => {
    if (props.usePlayPauseState) {
      Animated.timing(animation, {
        toValue: isSwitchOn ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isSwitchOn]);

  return (
    <Pressable
      className="flex-1 items-center flex-row bg-slate-300 rounded-lg m-2 justify-center"
      disabled={props.disabled}
      onTouchEnd={props.type === 'switch' ? onToggleSwitch : props.onClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={{ backgroundColor: backgroundButton, transform: [{ scale: scaleValue }] }}
        className="flex-1 items-center justify-center p-3 rounded-lg">
        <Icon
          source={props.icon}
          color={isSwitchOn ? '#ffffff' : Theme.colors.wave}
          size={props.size}
        />
      </Animated.View>
    </Pressable>
  );
};

export default Button;
