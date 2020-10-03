import React, { useState, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import { createStackNavigator, } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';


//common
import Intro from '../Intro';
import Shops from './menu/Shops';
import Verify from './Verify';

//shops
import Menu from './menu/Menu';
import MenuDetail from './menu/MenuDetail';
import MenuTabview from './menu/MenuTabView';
import Favorites from './menu/Favorites';

//Bakset
import Basket from './menu/Basket';
import BasketDetail from './menu/BasketDetail';
import BeforePayment from './menu/BeforePayment';

//Payment
import KakaoPay from './payment/KakaoPay';
import Loading from './payment/Loading';
import PaymentResult from './payment/PaymetResult';

//Supervisor
import example from '../supervisor/example';
import SupervisorOrderList from '../supervisor/SupervisorOrderList';
import SupervisorShops from '../supervisor/SupervisorShops';
import HeaderRight from './HeaderRight';
import SupervisorTabview from '../supervisor/SupervisorTabview';

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
    Favorites: Favorites,
    Menu: Menu,
    MenuTabView: MenuTabview,
    MenuDetail: MenuDetail,
    SelectMenu: Basket,
    BeforePayment: BeforePayment
};

const payScreen = {
    Loading: Loading,
    Paying: KakaoPay,
    Result: PaymentResult
};

const supervisorScreens = {
    SupervisorShops: SupervisorShops,
    example: example,
    SupervisorOrderList: SupervisorOrderList,
    SupervisorTabview: SupervisorTabview,
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
            <Stack.Navigator
                initialRouteName={user.phoneNumber === '+821011112222' ? 'SupervisorShops' : 'Shops'}
                screenOptions={{
                    headerTitle: 'DONGGUCKS.',
                }}
            >
                {Object.entries({
                    ...IntroScreen, ...commonScreen, ...menuScreen, ...payScreen, ...supervisorScreens
                }).map(([name, component]) => (
                    <Stack.Screen name={name} component={component}
                        options=
                        {
                            ({ navigation }) => ({

                                headerRight: () => {
                                    if (name === "Shops" || name === "MenuTabView" || name === "Menu" ||
                                        name === "MenuDetail" || name === "SelectMenu" || name === "Result" ||
                                        name === "Favorites") {

                                        return (
                                            <HeaderRight navigation={navigation} page={name} />
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
                                                    name === 'Menu' || name === "MenuTabView" || name === 'MenuDetail' ||
                                                        name === 'SelectMenu' || name === 'Basket' || name === 'Favorites' ||
                                                        name === 'SupervisorOrderList' ?

                                                        <TouchableOpacity
                                                            style={{ flexDirection: 'row-reverse' }}
                                                            // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                                                            onPress={() => [navigation.goBack(), setRefresh(true)]}
                                                        >
                                                            {
                                                                name === 'MenuTabView' || name === "Result" || name === 'SupervisorOrderList' 
                                                                || name === 'Basket'?
                                                                    <Image
                                                                        style={{ height: 20, width: 25, marginStart: 10, alignSelf: 'center' }}
                                                                        resizeMode='cover'
                                                                        source={require('../../image/chevron-back-white.png')}
                                                                    />
                                                                    :
                                                                    <Image
                                                                        style={{ height: 20, width: 25, marginStart: 10, alignSelf: 'center' }}
                                                                        resizeMode='cover'
                                                                        source={require('../../image/chevron-back-outline.png')}
                                                                    />
                                                            }
                                                        </TouchableOpacity>
                                                        :

                                                        <></>
                                                }
                                            </View>
                                        )
                                    }

                                },

                                animationTypeForReplace: true,

                                gestureEnabled: name === 'Shops' || name === 'SupervisorShops' || name === "Result" ? false : true,
                                // gestureEnabled: false
                                headerStyle: {
                                    backgroundColor:
                                        name === "Shops" || name === 'MenuTabView' || name === 'Basket' ||
                                            name === 'SupervisorOrderList' || name === 'SupervisorShops' ?
                                            '#182335'
                                            :
                                            name === 'Result' || name === 'Loading' ?
                                                '#eeaf9d'
                                                :
                                                '#fff',
                                    shadowColor: 'transparent',
                                },
                                headerTitleStyle: {
                                    color: name === "Shops" || name === "MenuTabView" || name === "Result" || name === 'Basket' || name === 'Loading' || name ==='SupervisorShops' || name === 'SupervisorOrderList' ? '#fff' : '#000',
                                    fontWeight: 'bold',
                                },
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
            <Stack.Navigator
                initialRouteName='Intro'
                screenOptions={{
                    title: '',
                }}>
                {Object.entries({
                    ...IntroScreen
                }).map(([name, component]) => (
                    <Stack.Screen
                        name={name}
                        component={component}
                        options={
                            ({ navigation }) => ({
                                headerLeft: () => (
                                    name === 'Verify' ?
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Image
                                                style={{ height: 20, width: 25, marginStart: 10, alignSelf: 'center' }}
                                                resizeMode='cover'
                                                source={require('../../image/chevron-back-white.png')}
                                            />
                                        </TouchableOpacity>
                                        :
                                        <></>
                                ),
                                headerStyle: { backgroundColor: '#182335', shadowColor: 'transparent' }
                            })
                        }
                    />))}
            </Stack.Navigator>
        )
    }
};