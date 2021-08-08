import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator ,DefaultTheme} from '@react-navigation/native-stack';
import { View ,Text} from 'react-native';
import MainScreen from './components/MainScreen';
import PlayerScreen from './components/PlayerScreen';
export default function App() {
  const MyTheme = {
    
    colors: {
     
      primary: 'rgb(255, 45, 85)',
    },
  };
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Search Songs" component={MainScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

