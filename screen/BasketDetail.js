import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

import { enableScreens } from 'react-native-screens';

enableScreens();

export default BasketDetail = ({ navigation, route }) => { 

    const { orderArray }= route.params; 

    var BasketData = new Array();

    var BasketJson = new Object();
    

    return (
        <View>
            <Text>{orderArray}</Text>
            <Button title='더 담기' onPress={() => navigation.navigate('HyehwaDessert', {orderList : orderArray})}></Button>
        </View>
    )
}


