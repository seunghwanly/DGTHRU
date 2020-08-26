import React, { useState, useEffect } from 'react';

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

//import { createNativeStackNavigator } from '@react-navigation/native-stack'; //>> 예전버전 !
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { enableScreens } from 'react-native-screens';
import auth from '@react-native-firebase/auth';

import {
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

enableScreens();

//const Stack = createNativeStackNavigator(); //>>예전 버전 !

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

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (user) {
    return (
      <Stack.Navigator initialRouteName='Shops'>
        {Object.entries({
          ...IntroScreen, ...commonScreen, ...menuScreen, ...payScreen, ...supervisorScreens
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component}
            options=
            {
              ({ navigation, route }) => ({

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
                          route.amount === undefined ?
                            <>
                              <View style={{ backgroundColor: 'deepskyblue', width: 15, height: 15, borderRadius: 15, marginEnd: 8, marginBottom: 20, position: 'relative' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 10 }}>!</Text>
                              </View>
                            </>
                            :
                            <View style={{ backgroundColor: 'deepskyblue', width: 15, height: 15, borderRadius: 15, marginEnd: 8, marginBottom: 20, position: 'relative' }}>
                              <Text style={{ textAlign: 'center', color: 'white', fontSize: 10, fontWeight: 'bold' }}>{route.amount}</Text>
                            </View>

                        }

                      </TouchableOpacity>
                    )
                  }
                },

                headerLeft: () => {

                  if (auth().currentUser !== null) {

                    return (
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
                    )
                  }
                }

              })
            }
          />
        ))}

      </Stack.Navigator>
    )
  }
  else {
    return (
      <Stack.Navigator initialRouteName='Intro'>
        {Object.entries({
          ...IntroScreen
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component} />))}
      </Stack.Navigator>
    )
  }
}

const DrawerStack = createDrawerNavigator();


//TODO : 관리자모드 팀
// 여기서 부터 새로운 stack navigator 나 tab이나 등등 원하는 대로 만들면 될거 같아
// 참고할 사이트를 적어줄게 >> https://reactnavigation.org/docs/nesting-navigators
// nested navigator 로 만드는게 수월할 거야 내가 위에다가 예시로 코드 만들었어
// 그러면 화이팅 종하 석운
// 최종적으로 렌더링 되는 곳은 밑에 부분이니까 추가하면 될거같아 !

function CustomDrawerContent(props) {

  signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User Signed Out !'))
      .catch(() => console.log('already signed out !'));
  }

  return (
    <>
      <DrawerContentScrollView {...props}
        style={{ flex: 1 }}>
        <DrawerItem
          label={() => <Text style={{ fontSize: 14 }}>{
            auth().currentUser !== null ?
              auth().currentUser.phoneNumber + ' 님'
              :
              ''
          }</Text>}
        />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        style={{ marginBottom: 40, marginStart: 20 }}
        label='로그아웃'
        // onPress={() => { [ signOut(), navigation.reset({ index:0, routes :  [{ name : 'HOME' }] })] }}
        onPress={() => { [signOut(), DrawerActions.closeDrawer()] }}
      />
    </>
  );
}

export default App = ({ navigation }) => {

  // // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState(null);

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;

  // if (user !== null) {
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
            drawerIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('../image/basket_outline.png')} />),
          }}
        />
        <DrawerStack.Screen name='Receipt/History' component={Bill}
          options={{
            drawerIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('../image/reader-outline.png')} />),
          }}
        />
        <DrawerStack.Screen name='Coupon' component={Coupon}
          options={{
            drawerIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('../image/star-outline.png')} />),
          }}
        />
      </DrawerStack.Navigator>
    </NavigationContainer>
  );
  //}  
}
