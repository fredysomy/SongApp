import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator ,DefaultTheme} from '@react-navigation/native-stack';
import { View ,Text} from 'react-native';
import MainScreen from './components/MainScreen';
export default function App() {
  const MyTheme = {
    
    colors: {
     
      primary: 'rgb(255, 45, 85)',
    },
  };
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Songs" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

