import React from 'react';
import Intro from './screen/Intro';
import Verify from './screen/Verify';
//import { createNativeStackNavigator } from '@react-navigation/native-stack'; //>> 예전버전 !
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

enableScreens();

//const Stack = createNativeStackNavigator(); //>>예전 버전 !
const Stack = createStackNavigator();

export default App = () => {

  return (
    <NavigationContainer

      >
      <Stack.Navigator>
      
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Verify" component={Verify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}