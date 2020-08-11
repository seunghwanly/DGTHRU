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
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection:'column',
            backgroundColor:'white'

        }}>
            <View style={styles.header}>
                <Text style={styles.title}>DGTHRU</Text>
                <Text style={styles.subTitle}>동국대학교 스마트오더</Text>
            </View>
            <View style={
                [ styles.body, {
                    height:'30%'
                } ]
                }>
                
            </View>
            <View style={styles.footer}>
                {/* TextInput 값을 props 넘겨야함 */}
                <TextInput
                    style={
                        [ styles.components, styles.phoneNumber ]
                    }
                    placeholder='010-1234-1234'
                    onChangeText={text => onChangeText(text)}
                />
                <Button 
                    style={styles.components}
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
            height:'20%',
            margin:'20%'

        },
        body:{
            backgroundColor:'red'
        },
        footer:{
            height:'30%'
        },
        title: {
            fontSize:44,
            fontWeight: 'bold',
            textAlign:'center'
        },
        subTitle: {
            fontSize: 20,
            color: 'gray',
            textAlign:'center'
        },
        components:{
            fontSize:20,
        },
        phoneNumber : {
            borderWidth:1,
            borderColor:'gray',
            borderRadius:5,
            backgroundColor:'white',
            paddingBottom:10,
            paddingTop:10,
            paddingStart:40,
            paddingEnd:40,
            margin:10,
            fontSize:15,
            width:'50%'
        }
    }
);
export default Intro;