import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { paymentStyles } from './styles';
import { Header } from 'react-native-elements';

export default Loading = (props) => {
    if(props.style !== null) {
        return(
            <>
            <Header containerStyle={[{ backgroundColor:'#eeaf9d', borderBottomColor:'transparent' }, props.style]}/>
            <View style={[paymentStyles.background, { justifyContent: 'center' }, props.style]}>
                <Text style={[paymentStyles.notifyText,{color:'#fff'}, props.fontStyle]}>잠시만{'\n'}기다려주세요 !</Text>
            </View>
            </>
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