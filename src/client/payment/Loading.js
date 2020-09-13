import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { paymentStyles } from './styles';

export default Loading = (props) => {
    if(props.style !== null) {
        return(
            <View style={[paymentStyles.background, { justifyContent: 'center' }, props.style]}>
                <Text style={[paymentStyles.notifyText,{color:'#fff'}]}>잠시만{'\n'}기다려주세요 !</Text>
            </View>
        )
    }
    else {
        return(
            <View style={[paymentStyles.background, { justifyContent: 'center' }]}>
                <Text style={paymentStyles.notifyText}>잠시만{'\n'}기다려주세요 !</Text>
            </View>
        )
    }
    
}