import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Dimensions } from 'react-native';
import Wave from 'react-native-waves';
import logo from '../../assets/sime_logo.png';
import Theme from '../../theme';
import { useState } from 'react';
import Animated from 'react-native-reanimated';
import { BounceInUp, Easing } from 'react-native-reanimated';

export default function Home() {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);
  const [buttonZIndex, setButtonZIndex] = useState(3);

  const handleAnimationComplete = () => {
    console.log('Animação concluiu');
    router.navigate('intro');
  };

  return (
    <>
      <Animated.View
        entering={BounceInUp.duration(600).easing(Easing.inOut(Easing.cubic))}
        className="flex-1 items-center justify-center gap-20"
        style={{ zIndex: buttonZIndex }}>
        <Image style={styles.image} source={logo} contentFit="contain" />
        <Button
          style={{ position: 'relative' }}
          textColor={Theme.colors.wave}
          labelStyle={{
            lineHeight: 50,
            fontSize: 30,
            fontFamily: 'PlusJakartaSans_700Bold',
            height: 55,
          }}
          mode="elevated"
          onPress={() => {
            setAnimate(true);
            setButtonZIndex(1);
          }}>
          INICIAR
        </Button>
      </Animated.View>
      <Wave
        gap={20}
        speed={8}
        maxPoints={12}
        delta={40}
        height={height / 1.5}
        shouldAnimate={animate}
        onAnimationComplete={handleAnimationComplete}
      />
    </>
  );
}

const { width, height } = Dimensions.get('window');
const image_width = width * 0.7;
const styles = StyleSheet.create({
  image: {
    width: image_width,
    height: 769 * (image_width / 652),
  },
});
