import React, { useState, useEffect, useLayoutEffect } from 'react';

//common
import Intro from './Intro';
import Shops from './client/Shops';
import Verify from './client/Verify';

//shops
import Hyehwa from './client/menu/Hyehwa';
import HyehwaDessert from './client/menu/select_menu/HyehwaDessert';
import HyehwaDessertDetail from './client/menu/select_menu/HyehwaDessertDetail';

//Bakset
import Basket from './client/Basket';
import BasketDetail from './client/BasketDetail';

//Payment
import KakaoPay from './client/payment/KakaoPay';
import Loading from './client/payment/Loading';
import PaymentResult from './client/payment/PaymetResult';

//drawer
import Bill from './client/drawer/Bill';
import Coupon from './client/drawer/Coupon';

//Supervisor
import example from './supervisor/example';
import SupervisorShops from './supervisor/SupervisorShops';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './utils/CustomNavigator';

import { getData } from './utils/asyncStorage';

import { enableScreens } from 'react-native-screens';

import auth from '@react-native-firebase/auth';

import {
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

enableScreens();

const Stack = createStackNavigator();

const IntroScreen = {
  Intro: Intro,
  Verify: Verify,
};

const commonScreen = {
  Basket: BasketDetail
};

const menuScreen = {
  Shops: Shops,
  Menu: HyehwaDessert,
  MenuDetail: HyehwaDessertDetail,
  SelectMenu: Basket
};

const payScreen = {
  Loading: Loading,
  Paying: KakaoPay,
  Result: PaymentResult
};

const supervisorScreens = {
  SupervisorShops: SupervisorShops,
  example: example
};

const StackContainer = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(0);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    console.log('=======useEffect========');
    const readBakset = async() => {
      getData().then((result) => setAmount(result));
    }
    readBakset();
  });
  

  

  if (initializing) return null;

  if (user) {
    console.log('exist user');
    return (
      <Stack.Navigator initialRouteName='Shops'>
        {Object.entries({
          ...IntroScreen, ...commonScreen, ...menuScreen, ...payScreen, ...supervisorScreens
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component}
            options=
            {
              ({ navigation }) => ({

                headerRight: () => {
                  if (name === "Menu" || name === "MenuDetail" || name === "SelectMenu") {

                    return (
                      <TouchableOpacity
                        style={{ flexDirection: 'row-reverse' }}
                        onPress={() => navigation.navigate('Basket', { shopInfo: 'hyehwa_roof' })}
                      >
                        <Image
                          style={{ height: 30, width: 30, marginEnd: 10, position: "absolute", alignSelf: 'center' }}
                          resizeMode='cover'
                          source={require('../image/cart-outline.png')}
                        />
                        {
                          amount !== null ?
                            <View style={{ backgroundColor: 'deepskyblue', width: 15, height: 15, borderRadius: 15, marginEnd: 8, marginBottom: 20, position: 'relative' }}>
                              <Text style={{ textAlign: 'center', color: 'white', fontSize: 10, fontWeight: 'bold' }}>{amount}</Text>
                            </View>
                            :
                            <></>
                        }
                      </TouchableOpacity>
                    )
                  }
                },

                headerLeft: () => {

                  if (auth().currentUser !== null) {

                    return (
                      // {
                      //   // <- 화살표 추가 Menu 부터
                      // }
                      <View style={{ flexDirection: 'row' }}>
                        {
                          name === 'Menu' || name === 'MenuDetail' || name === 'SelectMenu' || name === 'Basket' ?

                            <TouchableOpacity
                              style={{ flexDirection: 'row-reverse' }}
                              // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                              onPress={() => navigation.goBack()}

                            >
                              <Image
                                style={{ height: 20, width: 25, marginStart: 10, alignSelf: 'center' }}
                                resizeMode='cover'
                                source={require('../image/chevron-back-outline.png')}
                              />
                            </TouchableOpacity>

                            :

                            <></>
                        }
                        <TouchableOpacity
                          style={{ flexDirection: 'row-reverse' }}
                          // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                          onPress={() => navigation.toggleDrawer()}
                        >
                          <Image
                            style={{ height: 30, width: 30, marginStart: 10 }}
                            resizeMode='cover'
                            source={require('../image/menu-outline.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    )
                  }
                  
                },

                animationTypeForReplace: true,

                gestureEnabled: name === 'Shops' || name === 'SupervisorShops' ? false : true

              })
            }
          />
        ))}

      </Stack.Navigator>
    )
  }
  else {
    console.log('null user');
    return (
      <Stack.Navigator initialRouteName='Intro' screenOptions={{ gestureEnabled: false }}>
        {Object.entries({
          ...IntroScreen
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component} />))}
      </Stack.Navigator>
    )
  }
}

const DrawerStack = createDrawerNavigator();

export default App = () => {

  return (
    
      <NavigationContainer>
        <DrawerStack.Navigator
          initialRouteName='Home'
          drawerType='front'
          drawerStyle={{ width: '60%' }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <DrawerStack.Screen name='Home' component={StackContainer}
            options={{
              drawerIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('../image/home-outline.png')} />),
            }}
          //Home onPress () >> reset 애들한테 물어보자 이건
          />
          <DrawerStack.Screen name='Receipt/History' component={Bill}
            options={
              {
                drawerIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('../image/reader-outline.png')} />)
              }
            }
          />
          <DrawerStack.Screen name='Coupon' component={Coupon}
            options={{
              drawerIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('../image/star-outline.png')} />),
            }}
          />
        </DrawerStack.Navigator>
      </NavigationContainer>
  );
}
