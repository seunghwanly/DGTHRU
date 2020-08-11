import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Verify from './Verify';
//sign in
import auth from '@react-native-firebase/auth';
import appleAuth, {
    AppleButton,
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

enableScreens();

async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        // user is authenticated
    }
}

function Intro({ navigation }) {

    // _onChangeText() {

    // }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white'

        }}>
            <View style={styles.header}>
                <Text style={styles.title}>DGTHRU</Text>
                <Text style={styles.subTitle}>동국대학교 스마트오더</Text>
            </View>
            <View style={
                [styles.body, {
                    height: '30%'
                }]
            }>

            </View>
            <View style={styles.footer}>
                {/* TextInput 값을 props 넘겨야함 */}
                <TextInput
                    style={
                        [styles.components, styles.phoneNumber]
                    }
                    placeholder='010-1234-1234'
                    onChangeText={text => onChangeText(text)}
                />
                <Button
                    style={styles.components}
                    title='로그인'
                    onPress={() => navigation.navigate('Verify')}
                />
                <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                        width: 200,
                        height: 45,
                        justifyContent: 'center',
                        marginStart: 'auto',
                        marginEnd: 'auto',
                        marginTop: 10
                    }}
                    onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        header: {
            height: '20%',
            margin: '20%'

        },
        body: {
            backgroundColor: 'red'
        },
        footer: {
            height: '30%'
        },
        title: {
            fontSize: 44,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        subTitle: {
            fontSize: 20,
            color: 'gray',
            textAlign: 'center'
        },
        components: {
            fontSize: 20,
        },
        phoneNumber: {
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            backgroundColor: 'white',
            paddingBottom: 10,
            paddingTop: 10,
            paddingStart: 40,
            paddingEnd: 40,
            margin: 10,
            fontSize: 15,
            width: '50%'
        }
    }
);
export default Intro;