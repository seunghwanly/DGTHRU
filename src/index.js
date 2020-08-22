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

//import { createNativeStackNavigator } from '@react-navigation/native-stack'; //>> 예전버전 !
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

//Supervisor
import supervisorShop from './supervisor/supervisorShop';
import example from './supervisor/example';

import {
  TouchableHighlight,
  Image, Button
} from 'react-native';

enableScreens();

//const Stack = createNativeStackNavigator(); //>>예전 버전 !

const ClientStack = createStackNavigator();
const SupervisorStack = createStackNavigator();

const commonScreen = {
  Intro : Intro,
  Verify : Verify,
  Basket : BasketDetail
};

const menuScreen = {
  Shops : Shops,
  Menu :  HyehwaDessert,
  MenuDetail : HyehwaDessertDetail,
  SelectMenu : Basket 
};

const payScreen = {
  Loading : Loading,
  Paying : KakaoPay,
  Result : PaymentResult
};

const supervisorScreens = {
    supervisorShop : supervisorShop,
    example : example
};

const Client = () => {
  return (
      <ClientStack.Navigator>
        {Object.entries({
          ...commonScreen,...menuScreen,...payScreen,...supervisorScreens
        }).map(([name, component]) => (
          <ClientStack.Screen name={name} component={component} 
            options=
            {
              name === "Shops" || name === "Menu" || name === "MenuDetail" || name === "SelectMenu" ?
              
                ({ navigation, route }) => ({
                  headerRight: () => (
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
                }):
                name === "Result" ? {headerLeft:null} : {}
            }
          />
        ))}
      </ClientStack.Navigator>
    
  );
}

const SuperVisor = () => {
   return (
       <SupervisorStack.Navigator>
        <SupervisorStack.Screen name="supervisorShop" component={supervisorShop} />
        <SupervisorStack.Screen name="example" component={example} />
       </SupervisorStack.Navigator>
   );
 }


//TODO : 관리자모드 팀
// 여기서 부터 새로운 stack navigator 나 tab이나 등등 원하는 대로 만들면 될거 같아
// 참고할 사이트를 적어줄게 >> https://reactnavigation.org/docs/nesting-navigators
// nested navigator 로 만드는게 수월할 거야 내가 위에다가 예시로 코드 만들었어
// 그러면 화이팅 종하 석운
// 최종적으로 렌더링 되는 곳은 밑에 부분이니까 추가하면 될거같아 !

export default App = () => {
  return (
    <NavigationContainer>
      <Client />
    </NavigationContainer>
  );
}
