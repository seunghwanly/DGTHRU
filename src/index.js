import React, { useState } from 'react';
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

//import { createNativeStackNavigator } from '@react-navigation/native-stack'; //>> 예전버전 !
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';

//Supervisor
import example from './supervisor/example';
import supervisorShops from './supervisor/supervisorShops';

import {
  TouchableHighlight,
  Image,
  View
} from 'react-native';

enableScreens();

//const Stack = createNativeStackNavigator(); //>>예전 버전 !

const Stack = createStackNavigator();

const commonScreen = {
  Intro: Intro,
  Verify: Verify,
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
  supervisorShops: supervisorShops,
  example: example
};

const StackContainer = () => {
  return (
    <Stack.Navigator initialRouteName='Intro'>
      {Object.entries({
        ...commonScreen, ...menuScreen, ...payScreen, ...supervisorScreens
      }).map(([name, component]) => (
        <Stack.Screen name={name} component={component}
          options=
          {
            ({ navigation, route }) => ({
              
              headerRight: () => {
                if (name === "Shops" || name === "Menu" || name === "MenuDetail" || name === "SelectMenu") {

                  return (
                    <TouchableHighlight
                      style={{ flexDirection: 'row-reverse' }}
                      onPress={() => navigation.navigate('Basket', { shopInfo: 'hyehwa_roof' })}
                    >
                      <Image
                        style={{ height: 30, width: 30, marginEnd: 10 }}
                        resizeMode='cover'
                        source={require('../image/cart-outline.png')}
                      />
                    </TouchableHighlight>
                  )
                }
              },

              headerLeft: () => (
                <TouchableHighlight
                  style={{ flexDirection: 'row-reverse' }}
                  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                  <Image
                    style={{ height: 30, width: 30, marginEnd: 10 }}
                    resizeMode='cover'
                    source={require('../image/basket_outline.png')}
                  />
                </TouchableHighlight>
              )

            })
          }
        />
      ))}

    </Stack.Navigator>
  )
}

const DrawerStack = createDrawerNavigator();


//TODO : 관리자모드 팀
// 여기서 부터 새로운 stack navigator 나 tab이나 등등 원하는 대로 만들면 될거 같아
// 참고할 사이트를 적어줄게 >> https://reactnavigation.org/docs/nesting-navigators
// nested navigator 로 만드는게 수월할 거야 내가 위에다가 예시로 코드 만들었어
// 그러면 화이팅 종하 석운
// 최종적으로 렌더링 되는 곳은 밑에 부분이니까 추가하면 될거같아 !

export default App = () => {
  return (

    <NavigationContainer>
      <DrawerStack.Navigator initialRouteName='HOME'
        drawerType='front'>
        <DrawerStack.Screen name='HOME' component={StackContainer} />
        <DrawerStack.Screen name='Bill' component={Bill} />
      </DrawerStack.Navigator>
    </NavigationContainer>
  );
}
