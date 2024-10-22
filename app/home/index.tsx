import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { StyleSheet, Dimensions } from 'react-native';
import Wave from 'react-native-waves';
import logo from '../../assets/sime_logo.png';
import Theme from '../../theme';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  const handleAnimationComplete = () => {
    console.log('Animação concluiu');
    router.navigate('intro');
  };

  return (
    <>
      <Wave
        gap={20}
        speed={8}
        maxPoints={12}
        delta={40}
        height={height / 8}
        shouldAnimate={animate}
        onAnimationComplete={handleAnimationComplete}
      />
      <View className="flex-1 items-center justify-center gap-20">
        <Image style={styles.image} source={logo} contentFit="contain" />
        <Button
          textColor={Theme.colors.wave}
          buttonColor={Theme.colors.white}
          labelStyle={{
            lineHeight: 55,
            paddingVertical: 15,
            fontSize: 55,
            fontFamily: 'PlusJakartaSans_700Bold',
            height: 80,
          }}
          mode="elevated"
          onPress={() => setAnimate(true)}>
          INICIAR
        </Button>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    width: width,
    height: width,
  },
});
