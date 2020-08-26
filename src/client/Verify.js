import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { clientStyles } from './styles';

import { enableScreens } from 'react-native-screens';

import appleAuth, {
    AppleButton,
    AppleAuthError,
    AppleAuthRequestScope,
    AppleAuthRealUserStatus,
    AppleAuthCredentialState,
    AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

import auth from '@react-native-firebase/auth';

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

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned';
        }

        //apple ID >> FIREBASE
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        if (identityToken) {
            // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
            console.log(nonce, identityToken);

            return auth().signInWithCredential(appleCredential);
        } else {
            // no token - failed sign-in?
            alert('no identityToken available');
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

function Verify({ navigation, number }) {

    const [confirm, setConfirm] = useState(null);
    //var admin = false;
    const [admin, setAdmin] = useState(null);
    const [code, setCode] = useState('');

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

    function onNumberChange(inputNumber) {
        number = inputNumber;
    }

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        console.log('phoneNumber : ' + phoneNumber);
        if(phoneNumber == "+8201041282470" || phoneNumber == "+8201011112222") setAdmin(true);
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        
        console.log('signInWith~~ confirmation : ' + confirmation.confirm + "\tID : " + confirmation.verificationId);
        setConfirm(confirmation);
        console.log('signInWith~~ smsSetConfirm(): ' + setConfirm(confirmation));
    }

    async function confirmCode() {
        console.log('admin : ' + admin);
        if(admin){
        try {
            await confirm.confirm(code)
                .then(() => navigation.navigate('SupervisorShops', { navigation: navigation }));
            console.log('smscode : ' + code);
        } catch (error) {
            console.log('Invalid code.' + error);
        }
    }
    else{
        try {
            await confirm.confirm(code)
                .then(() => navigation.navigate('Shops', { navigation: navigation }));
            console.log('smscode : ' + code);
        } catch (error) {
            console.log('Invalid code.' + error);
        }
    }
    }
    if (!confirm) {
        return (
            <View style={clientStyles.background}>
                <ScrollView>
                    <View style={clientStyles.header}>
                        <Text style={clientStyles.title}>DGTHRU</Text>
                        <Text style={clientStyles.subTitle}>동국대학교 스마트오더</Text>
                    </View>
                    <View style={clientStyles.body}>
                        <KeyboardAvoidingView
                            behavior='position'
                            keyboardVerticalOffset={30}
                            style={clientStyles.background}
                        >
                            <TextInput
                                style={
                                    [clientStyles.components, clientStyles.phoneNumber]
                                }
                                placeholder='010-1234-1234'
                                onChangeText={text => onNumberChange(text)}
                            />
                            <Button
                                style={[clientStyles.components, { width: '50%' }]}
                                title='인증번호 보내기'
                                onPress={() => signInWithPhoneNumber('+82' + number)}
                            />
                        </KeyboardAvoidingView>

                    </View>
                    <View style={clientStyles.footer}>
                            {
                                appleAuth.isSupported === false ? 

                                <View style={clientStyles.footer}>
                                    <Text>Apple Authentication is not supported on this device.</Text>
                                </View>

                                :
                            <AppleButton
                                style={clientStyles.appleButton}
                                cornerRadius={5}
                                buttonStyle={AppleButton.Style.WHITE}
                                buttonType={AppleButton.Type.CONTINUE}
                                onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
                            />
                            }
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={clientStyles.background}>
            <ScrollView>
                <View style={clientStyles.header}>
                    <Text style={clientStyles.title}>DGTHRU</Text>
                    <Text style={clientStyles.subTitle}>동국대학교 스마트오더</Text>
                </View>
                <View style={clientStyles.body}>
                    <Text style={clientStyles.subTitle}>{number}</Text>
                    <KeyboardAvoidingView
                        behavior='position'
                        keyboardVerticalOffset={20}
                        style={clientStyles.background}
                    >
                        <TextInput
                            style={clientStyles.phoneNumber}
                            placeholder='인증번호를 입력해주세요.'
                            onChangeText={text => setCode(text)}
                        />
                        <Button
                            title='인증하기'
                            onPress={() => confirmCode()}
                        />
                    </KeyboardAvoidingView>
                </View>
                <View style={[clientStyles.footer, clientStyles.subTitle]}>
                    <Text style={{ margin: 15, textAlign: 'center' }}>위 번호로 회원가입을 진행합니다.</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default Verify;