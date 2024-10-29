import { StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListRenderItemInfo } from 'react-native';
import { useEffect } from 'react';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SlideItem, slides } from './slides';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  SlideInUp,
} from 'react-native-reanimated';
import Theme from 'theme';

export default function Intro() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withDelay(400, withTiming(1, { duration: 400 }));
  }, []);

  const renderSlide = ({ item }: ListRenderItemInfo<SlideItem>) => {
    return (
      <>
        <Animated.View entering={SlideInUp.duration(400)}>
          <Shadow offset={[0, -insets.top]} distance={20}>
            <Image
              source={item.image}
              contentFit="contain"
              style={[styles.image, { top: -insets.top }]}
            />
          </Shadow>
        </Animated.View>
        <Animated.View
          className="flex-1 items-center mb-20 relative"
          style={[{ top: -insets.top + 30, opacity }, animatedStyle]}>
          <Text
            style={{ fontFamily: 'PlusJakartaSans_700Bold' }}
            className="text-3xl text-white text-center">
            {item.title}
          </Text>
          <View className="flex-1 h-full mt-5 text-justify w-full pl-5 pr-5">
            <Text className="text-lg text-center text-white w-full">{item.text}</Text>
          </View>
          <Button
            mode="elevated"
            className="w-1/2"
            labelStyle={{ fontSize: 20 }}
            disabled={item.disable_button}
            onPress={() => {
              router.navigate('application');
            }}>
            {item.button_text}
          </Button>
        </Animated.View>
      </>
    );
  };

  return (
    <>
      <BlurView intensity={4} style={[styles.blurContainer, { height: insets.top }]}></BlurView>
      <View className="flex-1 pb-2" style={{ backgroundColor: Theme.colors.wave }}>
        <AppIntroSlider
          data={slides}
          renderItem={renderSlide}
          renderNextButton={() => {
            return false;
          }}
          renderDoneButton={() => {
            return false;
          }}
        />
      </View>
    </>
  );
}

const { width } = Dimensions.get('window');
const image_width = width;
const styles = StyleSheet.create({
  image: {
    position: 'relative',
    width: image_width,
    height: 1024 * (image_width / 1024),
    borderRadius: 50,
  },
  blurContainer: {
    position: 'absolute',
    width: width,
    zIndex: 10,
  },
});
