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

    const { item }= route.params; 

    return (
        <View>
            <Text>{item}</Text>
        </View>
    )
}


