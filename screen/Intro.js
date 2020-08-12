import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Verify from './Verify';

import appleAuth, {
    AppleButton,
    AppleAuthError,
    AppleAuthRequestScope,
    AppleAuthRealUserStatus,
    AppleAuthCredentialState,
    AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

/**
 * You'd technically persist this somewhere for later use.
 */
let user = null;

/**
 * Fetches the credential state for the current user, if any, and updates state on completion.
 */
async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    if (user === null) {
        updateCredentialStateForUser('N/A');
    } else {
        const credentialState = await appleAuth.getCredentialStateForUser(user);
        if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
            updateCredentialStateForUser('AUTHORIZED');
        } else {
            updateCredentialStateForUser(credentialState);
        }
    }
}

/**
* Starts the Sign In flow.
*/
async function onAppleButtonPress(updateCredentialStateForUser) {
    console.warn('Beginning Apple Authentication');

    // start a login request
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
        });

        console.log('appleAuthRequestResponse', appleAuthRequestResponse);

        const {
            user: newUser,
            email,
            nonce,
            identityToken,
            realUserStatus /* etc */,
        } = appleAuthRequestResponse;

        user = newUser;

        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
            updateCredentialStateForUser(`Error: ${error.code}`),
        );

        if (identityToken) {
            // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
            console.log(nonce, identityToken);
        } else {
            // no token - failed sign-in?
        }

        if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
            console.log("I'm a real person!");
        }

        console.warn(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error) {
        if (error.code === AppleAuthError.CANCELED) {
            console.warn('User canceled Apple Sign in.');
        } else {
            console.error(error);
        }
    }
}



enableScreens();

function Intro({ navigation }) {

    // _onChangeText() {

    // }

    const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
    useEffect(() => {
        if (!appleAuth.isSupported) return

        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
            updateCredentialStateForUser(`Error: ${error.code}`),
        );
    }, []);

    useEffect(() => {
        if (!appleAuth.isSupported) return

        return appleAuth.onCredentialRevoked(async () => {
            console.warn('Credential Revoked');
            fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
                updateCredentialStateForUser(`Error: ${error.code}`),
            );
        });
    }, []);

    if (!appleAuth.isSupported) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <Text>Apple Authentication is not supported on this device.</Text>
            </View>
        );
    }

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
                    style={styles.appleButton}
                    cornerRadius={5}
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
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
        },
        appleButton: {
            width: 200,
            height: 45,
            margin: 'auto',
          },
    }
);
export default Intro;