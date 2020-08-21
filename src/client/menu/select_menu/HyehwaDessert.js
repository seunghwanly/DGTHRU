import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet, Button
} from 'react-native';
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
        <View style={styles.background}>
            <ScrollView>
                <Text style={styles.subtitle}>DRINKS</Text>
                {/* drink data */}
                <FlatList
                    data={drinkData}
                    renderItem={

                        ({ item }) => {
                        
                            if(item.category_name !== 'Others') {
                                return (
                                <TouchableOpacity
                                    style={styles.radiusIcon}
                                    onPress={() => navigation.navigate('MenuDetail', { items: item.menu, shopInfo : shopInfo })}
                                >
                                    <Text style={styles.radiusText}>
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
                <Text style={styles.subtitle}>BAKERY</Text>
                {/* bakery data */}
                <FlatList
                    data={bakeryData}
                    renderItem={
                        ({ item }) => (
                            <TouchableOpacity style={styles.radiusIcon}
                                onPress={() => navigation.navigate('MenuDetail', { items: item.menu, shopInfo : shopInfo })}
                            >
                                <Text style={styles.radiusText}>
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

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '10%',
        flex: 1
    },
    radiusIcon: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: 'deepskyblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    radiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 22,
        color: 'gray',
        textAlign: 'center',
        marginStart: 5,
        marginEnd: 5,
        marginBottom: 10,
        marginTop:10
    },
})