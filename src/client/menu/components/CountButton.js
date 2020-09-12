import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native';

export const MinusButton = (props) => {
    return (
            <TouchableOpacity
                style={props.style}
                onPress={props.onPress}
            >
                <Text style={{ 
                fontSize: 14, 
                color: '#FFF', 
                textAlign: 'center',
                fontWeight:'bold'
            }}>-</Text>
            </TouchableOpacity>
    )
}
export const PlusButton = (props) => {
    return (
        <TouchableOpacity
            style={props.style}
            onPress={props.onPress}
        >
            <Text style={{ 
                fontSize: 14, 
                color: '#FFF', 
                textAlign: 'center',
                fontWeight:'bold'
            }}>+</Text>
        </TouchableOpacity>
    )
}