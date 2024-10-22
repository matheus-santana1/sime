import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import { View } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import Wave from 'react-native-waves';
import logo from '../../assets/sime_logo.png';
import Theme from '../../colors';

const { width, height } = Dimensions.get('window');

export default function Home() {
  return (
    <>
      <Wave gap={20} speed={8} maxPoints={12} delta={40} height={height / 8} />
      <View className="flex-1 items-center justify-center gap-20">
        <Image style={styles.image} source={logo} contentFit="contain" />
        <Button
          textColor={Theme.colors.wave}
          buttonColor={Theme.colors.white}
          mode="elevated"
          labelStyle={{ fontSize: 30, minHeight: 50, textAlignVertical: 'center', paddingTop: 15 }}
          onPress={() => console.log('Navegar ate pagina de intro')}>
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
