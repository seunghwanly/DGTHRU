import React from 'react';
import Intro from './screen/Intro';
import Shops from './screen/Shops';
import Verify from './screen/Verify';

//shops
import Hyehwa from './screen/menu/Hyehwa';
import HyehwaDessert from './screen/menu/select_menu/HyehwaDessert';
import HyehwaDessertDetail from './screen/menu/select_menu/HyehwaDessertDetail';
import Dorm from './screen/menu/Dorm';
import DormaDessert from './screen/menu/select_menu/DormDessert';
import DormDessertDetail from './screen/menu/select_menu/DormDessertDetail';


//import { createNativeStackNavigator } from '@react-navigation/native-stack'; //>> 예전버전 !
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

enableScreens();

//const Stack = createNativeStackNavigator(); //>>예전 버전 !
const Stack = createStackNavigator();

export default App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="Shops" component={Shops} />
        <Stack.Screen name="Hyehwa" component={Hyehwa} />
        <Stack.Screen name="HyehwaDessert" component={HyehwaDessert} />
        <Stack.Screen name="HyehwaDessertDetail" component={HyehwaDessertDetail} />
        <Stack.Screen name="Dorm" component={Dorm} />
        <Stack.Screen name="DormDessert" component={DormDessert} />
        <Stack.Screen name="DormDessertDetail" component={DormDessertDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}