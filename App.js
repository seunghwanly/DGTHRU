import React, { useState } from 'react';
import Intro from './screen/Intro';
import Shops from './screen/Shops';
import Verify from './screen/Verify';

//shops
import Hyehwa from './screen/menu/Hyehwa';
import HyehwaDessert from './screen/menu/select_menu/HyehwaDessert';
import HyehwaDessertDetail from './screen/menu/select_menu/HyehwaDessertDetail';

//Bakset
import Basket from './screen/Basket';
import BasketDetail from './screen/BasketDetail';

//import { createNativeStackNavigator } from '@react-navigation/native-stack'; //>> 예전버전 !
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import {
  TouchableHighlight,
  Image, Button
} from 'react-native';

enableScreens();

//const Stack = createNativeStackNavigator(); //>>예전 버전 !
const Stack = createStackNavigator();

export default App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" component={Intro}/>
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="Shops" component={Shops} />
        <Stack.Screen name="Hyehwa" component={Hyehwa} />
        <Stack.Screen name="HyehwaDessert" component={HyehwaDessert} 
          options={
            ({ navigation, route }) => ({
              headerRight: () => (
                <TouchableHighlight
                  style={{flexDirection:'row-reverse'}}
                  onPress={() => navigation.navigate('BasketDetail', {shopInfo : 'hyehwa_roof'})}
                >
                  <Image
                    style={{height:30, width:30, marginEnd:10}}
                    resizeMode='cover'
                    source={require('./image/basket_outline.png')}
                  />
                </TouchableHighlight>
              )
            })
          }
        />
        <Stack.Screen name="HyehwaDessertDetail" component={HyehwaDessertDetail} 
          options={
            ({ navigation, route }) => ({
              headerRight: () => (
                <TouchableHighlight
                  style={{flexDirection:'row-reverse'}}
                  onPress={() => navigation.navigate('BasketDetail', {shopInfo : 'hyehwa_roof'})}
                >
                  <Image
                    style={{height:30, width:30, marginEnd:10}}
                    resizeMode='cover'
                    source={require('./image/basket_outline.png')}
                  />
                </TouchableHighlight>
              )
            })
          }
        />
        <Stack.Screen name="Basket" component={Basket} 
          options={
            ({ navigation, route }) => ({
              headerRight: () => (
                <TouchableHighlight
                  style={{flexDirection:'row-reverse'}}
                  onPress={() => navigation.navigate('BasketDetail', {shopInfo : 'hyehwa_roof'})}
                >
                  <Image
                    style={{height:30, width:30, marginEnd:10}}
                    resizeMode='cover'
                    source={require('./image/basket_outline.png')}
                  />
                </TouchableHighlight>
              )
            })
          }
        />
        <Stack.Screen name="BasketDetail" component={BasketDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}