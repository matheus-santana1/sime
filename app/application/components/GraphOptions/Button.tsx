import { Pressable, Animated, GestureResponderEvent } from 'react-native';
import { Icon } from 'react-native-paper';
import { useState, useRef } from 'react';
import Theme from 'theme';

interface ButtonProps {
  type: 'button' | 'switch';
  onClick: (event: GestureResponderEvent | boolean) => void;
  disabled?: boolean;
  icon: string;
  size: number;
}

const Button = (props: ButtonProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onToggleSwitch = () => {
    const newState = !isSwitchOn;
    setIsSwitchOn(newState);
    props.onClick(newState);
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
    outputRange: [Theme.graph.buttonColor, Theme.graph.on],
  });

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
        <Icon source={props.icon} color={Theme.colors.wave} size={props.size} />
      </Animated.View>
    </Pressable>
  );
};

export default Button;
