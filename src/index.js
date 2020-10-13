import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './utils/CustomNavigator';

import { enableScreens } from 'react-native-screens';

import { Image } from 'react-native';

//drawer
import Bill from './client/drawer/Bill'
import Coupon from './client/drawer/Coupon';

import StackContainer from './client/index.js';

enableScreens();

const DrawerStack = createDrawerNavigator();

export default App = () => {

  return (
      <NavigationContainer>
        <DrawerStack.Navigator
          initialRouteName='Home'
          drawerType='front'
          drawerStyle={{ width: '60%' }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerPosition='right'
        >
          <DrawerStack.Screen name='Home' component={StackContainer}
            options={{
              drawerIcon: ({focused}) => (<Image style={{ width: 20, height: 20 }} source={focused ? require('../image/home-white.png') : require('../image/home-outline.png')} />),
            }}
            
          //Home onPress () >> reset 애들한테 물어보자 이건
          />
          <DrawerStack.Screen name='e-Receipt/History' component={Bill}
            options={
              {
                drawerIcon: ({focused}) => (<Image style={{ width: 20, height: 20 }} source={focused ? require('../image/reader-white.png') : require('../image/reader-outline.png')} />)
              }
            }
          />
          <DrawerStack.Screen name='Coupon' component={Coupon}
            options={{
              drawerIcon: ({focused}) => (<Image style={{ width: 20, height: 20 }} source={focused ? require('../image/star-white.png') : require('../image/star-outline.png')} />),
            }}
          />
        </DrawerStack.Navigator>
      </NavigationContainer>
  );
}
