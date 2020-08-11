import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { enableScreens } from 'react-native-screens';
enableScreens();

const Verify = ({navigation}) => {

    // _onChangeText() {

    // }

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.textBold}>로그인할 번호를 입력해주세요</Text>
                    {/* TextInput 값을 props 넘겨야함 */}
                    <TextInput 
                        placeholder='010-1234-1234' 
                        onChangeText={text => onChangeText(text)}

                        />
                    <TextInput style={styles.verifyInput}
                        placeholder='인증번호를 입력해주세요' 
                        onChangeText={text => onChangeText(text)}
                        />
                </View>
                <View>
                    <Button title='인증하기'></Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create(
    {
        container : {
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        textBold : {
            fontSize:25,
            fontWeight:'bold',
        },
        verifyInput : {
            borderWidth:1,
            borderRadius:10,
            borderColor:'gray'
        }
    }
);
export default Verify;