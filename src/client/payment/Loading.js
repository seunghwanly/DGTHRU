import React from 'react';
import {
    View,
    Text
} from 'react-native';

export default Loading = () => (
    <View style={{
        backgroundColor:'white',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }}>
        <Text style={{
            fontSize:44,
            fontWeight:'bold',
            textAlign:'center'
        }}>잠시만{'\n'}기다려주세요 !</Text>
    </View>
)