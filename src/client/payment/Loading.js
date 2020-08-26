import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { paymentStyles } from './styles';

export default Loading = () => (
    <View style={paymentStyles.background}>
        <Text style={paymentStyles.notifyText}>잠시만{'\n'}기다려주세요 !</Text>
    </View>
)