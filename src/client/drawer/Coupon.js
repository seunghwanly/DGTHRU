import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default Coupon = ({ navigation }) => {
    return(
        <SafeAreaView
        style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Text>정인이화이팅</Text>
        </SafeAreaView>
    )
}