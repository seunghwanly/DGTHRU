import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Verify from './Verify';

enableScreens();

function Intro({navigation}) {

    // _onChangeText() {

    // }

    return (
        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
            <View >
                <Text style={styles.title}>DGTHRU</Text>
                <Text style={styles.subTitle}>동국대학교 스마트오더</Text>
            </View>
            <View ></View>
            <View >
                {/* TextInput 값을 props 넘겨야함 */}
                <TextInput
                    placeholder='010-1234-1234'
                    onChangeText={text => onChangeText(text)}
                />
                <Button 
                    title='로그인' 
                    onPress={() => navigation.navigate('Verify')}

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        header : {
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection:'column'
        },
        body:{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'red',
            flexDirection:'column'
        },
        footer:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection:'column'
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
        },
        subTitle: {
            fontSize: 20,
            color: 'gray'
        }
    }
);
export default Intro;