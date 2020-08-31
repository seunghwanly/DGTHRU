import React, { useState, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import { createStackNavigator, } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { getData } from '../utils/asyncStorage';


//common
import Intro from '../Intro';
import Shops from './menu/Shops';
import Verify from './Verify';

//shops
import HyehwaDessert from './menu/HyehwaDessert';
import HyehwaDessertDetail from './menu/HyehwaDessertDetail';

//Bakset
import Basket from './menu/Basket';
import BasketDetail from './menu/BasketDetail';

//Payment
import KakaoPay from './payment/KakaoPay';
import Loading from './payment/Loading';
import PaymentResult from './payment/PaymetResult';

//Supervisor
import example from '../supervisor/example';
import SupervisorShops from '../supervisor/SupervisorShops';

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

export default StackContainer = () => {
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
        const readBakset = async () => {
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
                                                    source={require('../../image/cart-outline.png')}
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
                                                                source={require('../../image/chevron-back-outline.png')}
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
                                                        source={require('../../image/menu-outline.png')}
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
};