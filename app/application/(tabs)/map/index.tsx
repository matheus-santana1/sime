import {
  Dimensions,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Text } from 'react-native-paper';
import ViewGradient from 'app/application/components/ViewGradient';
import Theme from 'theme';
import Animated, {
  BounceInDown,
  BounceIn,
  Easing,
  BounceInUp,
  BounceOut,
} from 'react-native-reanimated';
import { useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MapIcon from 'assets/icons/MapIcon';
import slides, { MapaItem } from '../../../intro/slides';
import { useState } from 'react';

const originalWidth = 3024;
const originalHeight = 4032;

export default function Mapa() {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [pins, setPins] = useState<{ x: number; y: number }[] | null>([]);

  const handlePress = (item: MapaItem) => {
    setSelectedItem(item.id === selectedItem ? null : item.id);
    setPins(item.id === selectedItem ? null : item.positionPin);
  };

  const navigationState = useNavigationState((state) => state);
  const screenKey = navigationState?.routes[navigationState.index]?.key;
  const insets = useSafeAreaInsets();
  //const route = useRoute();
  //const { key }: any = route.params;
  const key = 1;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setImageDimensions({ width, height });
  };

  const calculatePinPosition = (value: { x: number; y: number }) => {
    const scaleX = imageDimensions.width / originalWidth;
    const scaleY = imageDimensions.height / originalHeight;
    const pinX = value.x * scaleX;
    const pinY = value.y * scaleY;
    return { x: pinX, y: pinY, scaleY };
  };

  return (
    <ViewGradient>
      <View
        style={{
          height: Dimensions.get('screen').height,
          top: (StatusBar.currentHeight || 0 || insets.top) + 52,
        }}
        className="flex absolute w-full">
        <Animated.View key={screenKey + 1} style={{ flex: 1 }} entering={BounceInUp.duration(1000)}>
          <ReactNativeZoomableView
            maxZoom={2}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}>
            <Image
              onLayout={handleLayout}
              className="flex-1 w-full"
              source={require('../../../../assets/simeville.png')}
              contentFit="contain"
            />
            <View className="flex-1 w-full h-full absolute">
              {pins?.map((pin, index) => {
                let position = calculatePinPosition({ x: pin.x, y: pin.y });
                return (
                  <Animated.View
                    key={Math.random()}
                    entering={BounceIn.duration(500).easing(Easing.inOut(Easing.quad))}
                    exiting={BounceOut.duration(200).easing(Easing.inOut(Easing.quad))}
                    collapsable={false}
                    style={{
                      left: position.x,
                      top: position.y,
                      position: 'absolute',
                    }}>
                    <FontAwesome
                      key={index}
                      name="map-marker"
                      color="red"
                      size={position.scaleY * 250}
                    />
                  </Animated.View>
                );
              })}
            </View>
          </ReactNativeZoomableView>
        </Animated.View>
        <Animated.View
          key={screenKey}
          entering={BounceInDown.duration(800)}
          style={{
            height: moderateVerticalScale(350),
            backgroundColor: Theme.colors.wave,
            paddingBottom: moderateVerticalScale(250, 0.2),
            top: -1,
          }}
          className="flex w-full rounded-2xl px-5 pt-2">
          <Text className="text-white text-center" style={{ fontSize: moderateScale(25) }}>
            Mapa
          </Text>
          <View style={{ height: 1 }} className="bg-white w-full mt-2"></View>
          <View className="bg-white w-full h-full mt-3 p-3">
            <FlatList
              data={slides[key - 1].mapa as any}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedItem === item.id;
                return (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => handlePress(item)}
                    className="flex-1 items-center flex-row rounded-lg"
                    style={{
                      backgroundColor: isSelected ? '#929599' : '#d1d5db',
                      height: moderateVerticalScale(30),
                      margin: moderateVerticalScale(4),
                      paddingHorizontal: moderateScale(10),
                      gap: moderateScale(10),
                    }}>
                    <MapIcon name={item.nameIcon} size={moderateVerticalScale(20)} color="black" />
                    <Text className="text-black" style={{ fontSize: moderateScale(12) }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Animated.View>
      </View>
    </ViewGradient>
  );
}
