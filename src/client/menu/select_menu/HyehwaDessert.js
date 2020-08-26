import React from 'react';
import {
    View,
    Text,
    FlatList,
} from 'react-native';
import { menuStyles } from './styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';

//json
import * as data from '../data/HyehwaDessert.json';

//firebase
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import moment from 'moment';

enableScreens();

//drink and bakery
const drinkData = data.categories_drink;
const bakeryData = data.categories_bakery;


export default HyehwaDessert = ({ navigation, route }) => {

    const { shopInfo } = route.params;

    const userPhoneNumber = auth().currentUser.phoneNumber;
    const reference = database().ref('users/' + moment().format('YYYY_MM_DD') + '/' + userPhoneNumber);

    handleBasket = () => {

        let userBasketData = new Map();

        reference
            .once('value')
            .then(
                (snapshot) => {
                    snapshot.forEach((childSnapShot) => {
                        var key = childSnapShot.key;
                        var val = childSnapShot.val();
                        
                        console.log(key, val);

                        userBasketData.set(key, val);
                    });
                }
            )

    }

    return (
        <View style={menuStyles.background}>
            <ScrollView>
                <Text style={menuStyles.subTitle}>DRINKS</Text>
                {/* drink data */}
                <FlatList
                    data={drinkData}
                    renderItem={

                        ({ item }) => {
                        
                            if(item.category_name !== 'Others') {
                                return (
                                <TouchableOpacity
                                    style={menuStyles.radiusIcon}
                                    onPress={() => navigation.navigate('MenuDetail', { items: item.menu, shopInfo : shopInfo })}
                                >
                                    <Text style={menuStyles.radiusText}>
                                        {item.category_name}
                                    </Text>
                                </TouchableOpacity>
                                )
                            } else {
                                return(
                                    <></>
                                )
                            }
                        }
                    }
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={menuStyles.subTitle}>BAKERY</Text>
                {/* bakery data */}
                <FlatList
                    data={bakeryData}
                    renderItem={
                        ({ item }) => (
                            <TouchableOpacity style={menuStyles.radiusIcon}
                                onPress={() => navigation.navigate('MenuDetail', { items: item.menu, shopInfo : shopInfo })}
                            >
                                <Text style={menuStyles.radiusText}>
                                    {item.category_name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        </View>
    )
}