import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

import auth from '@react-native-firebase/auth';

import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

enableScreens();

function Shops({navigation}) {

    signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User Signed Out !'));
    }

    return(
        <>
            <View style={styles.background}>
                <Text style={styles.text}>Welcome !</Text>
                <Button 
                    title='로그아웃'
                    onPress={() => signOut()}
                />
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    text : {
        fontSize:44,
        fontWeight:'bold',
        textAlign:'center'
    }
});
export default Shops;