import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from 'screens/Home';
import IntroScreen from 'screens/Intro';
import AppScreen from 'screens/App';

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <>
      <StatusBar translucent style="auto"></StatusBar>
      <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Intro" component={IntroScreen} />
              <Stack.Screen name="App" component={AppScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </>
  );
}

export default Main;
