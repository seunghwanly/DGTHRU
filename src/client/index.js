import React, { useState, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import { createStackNavigator, } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

//common
import Intro from '../Intro';
import Shops from './menu/Shops';
import Verify from './Verify';

//shops
import Menu from './menu/Menu';
import MenuDetail from './menu/MenuDetail';

//Bakset
import Basket from './menu/Basket';
import BasketDetail from './menu/BasketDetail';

//Payment
import KakaoPay from './payment/KakaoPay';
import Loading from './payment/Loading';
import PaymentResult from './payment/PaymetResult';

//Supervisor
import example from '../supervisor/example';
import SupervisorOrderList from '../supervisor/SupervisorOrderList';
import SupervisorShops from '../supervisor/SupervisorShops';

import HeaderRight from './HeaderRight';

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
    Menu: Menu,
    MenuDetail: MenuDetail,
    SelectMenu: Basket
};

const payScreen = {
    Loading: Loading,
    Paying: KakaoPay,
    Result: PaymentResult
};

const supervisorScreens = {
    SupervisorShops: SupervisorShops,
    example: example,
    SupervisorOrderList: SupervisorOrderList
};

export default StackContainer = ({ navigation }) => {
    
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [refresh, setRefresh] = useState(false);

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
        console.log('[index] : refreshed ! ');
        return () => setRefresh(false);
    }, []);

    if (initializing) return null;

    if (user) {
        console.log('current user : ' + user.phoneNumber);
        return (
            <Stack.Navigator initialRouteName='Shops'>
                {Object.entries({
                    ...IntroScreen, ...commonScreen, ...menuScreen, ...payScreen, ...supervisorScreens
                }).map(([name, component]) => (
                    <Stack.Screen name={name} component={component}
                        options=
                        {
                            {
                                //name changed
                            },
                            ({ navigation }) => ({

                                headerRight: () => {
                                    if (name === "Shops" || name === "Menu" || name === "MenuDetail" || name === "SelectMenu") {
                                        return (
                                            <HeaderRight navigation={navigation} shopInfo={'hyehwa_roof'} />
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
                                                            onPress={() => [navigation.goBack(), setRefresh(true)]}
                                                        >
                                                            <Image
                                                                style={{ height: 20, width: 25, marginStart: 10, alignSelf: 'center' }}
                                                                resizeMode='cover'
                                                                source={require('../../image/chevron-back-outline.png')}
                                                            />
                                                        </TouchableOpacity>
                                                        :

                                                        <></>
                                                }
                                            </View>
                                        )
                                    }

                                },

                                animationTypeForReplace: true,

                                gestureEnabled: name === 'Shops' || name === 'SupervisorShops' ? false : true
                                // gestureEnabled: false

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
};