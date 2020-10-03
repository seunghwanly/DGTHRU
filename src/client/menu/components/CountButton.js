import React from 'react';
import {
    Text,
    Pressable
} from 'react-native';

export const MinusButton = (props) => {
    return (
        <Pressable
            style={
                ({ pressed }) => [
                    props.style,
                    {
                        backgroundColor: pressed
                            ? '#eaaf9d'
                            : '#e2e2e2'
                    }
                ]
            }
            onPress={props.onPress}
        >
            <Text style={{
                fontSize: 20,
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold'
            }}>-</Text>
        </Pressable>
    )
}
export const PlusButton = (props) => {
    return (
        <Pressable
            style={
                ({ pressed }) => [
                    props.style,
                    {
                        backgroundColor: pressed
                            ? '#eaaf9d'
                            : '#e2e2e2'
                    }
                ]
            }
            onPress={props.onPress}
        >
            <Text style={{
                fontSize: 20,
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold'
            }}>+</Text>
        </Pressable>
    )
}