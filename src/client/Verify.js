import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { clientStyles } from './styles';
import { isPortrait } from '../utils/checkOrientation';

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
        if (phoneNumber == "+8201041282470" || phoneNumber == "+8201011112222") setAdmin(true);
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

        console.log('signInWith~~ confirmation : ' + confirmation.confirm + "\tID : " + confirmation.verificationId);
        setConfirm(confirmation);
        console.log('signInWith~~ smsSetConfirm(): ' + setConfirm(confirmation));
    }

    async function confirmCode() {
        console.log('admin : ' + admin);
        if (admin) {
            try {
                await confirm.confirm(code)
                    .then(() => navigation.navigate('SupervisorShops', { navigation: navigation }));
                console.log('smscode : ' + code);
            } catch (error) {
                console.log('Invalid code.' + error);
            }
        }
        else {
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
        if (isPortrait()) {
            return (
                <View style={clientStyles.background}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        style={{ width: '100%' }}
                    >
                        <View style={clientStyles.header}>
                            <Text style={clientStyles.title}>DGTHRU</Text>
                            <Text style={clientStyles.subTitle}>동국대학교 스마트오더</Text>
                        </View>
                        <View style={clientStyles.body}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS == "ios" ? "padding" : "height"}
                                keyboardVerticalOffset={30}
                                style={clientStyles.background}
                            >
                                <TextInput
                                    style={
                                        [clientStyles.phoneNumber]
                                    }
                                    placeholder='01012345678'
                                    onChangeText={text => onNumberChange(text)}
                                    keyboardType='phone-pad'
                                    returnKeyType='done'
                                />
                                <TouchableOpacity
                                    style={clientStyles.components}
                                    onPress={() => signInWithPhoneNumber('+82' + number)}
                                >
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>인증번호 보내기</Text>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>

                        </View>
                        <View style={clientStyles.footer}>
                            {
                                appleAuth.isSupported === false ?

                                    <View style={clientStyles.footer}>
                                        <Text>애플로그인이 지원되지않습니다.</Text>
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
        } else {
            return (
                <View style={clientStyles.background}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        style={{ width: '100%' }}
                    >

                        <Text style={clientStyles.title}>DGTHRU</Text>
                        <Text style={clientStyles.subTitle}>동국대학교 스마트오더</Text>


                        <KeyboardAvoidingView
                            behavior={Platform.OS == "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={30}
                            style={clientStyles.background}
                        >
                            <TextInput
                                style={
                                    [clientStyles.phoneNumber]
                                }
                                placeholder='01012345678'
                                onChangeText={text => onNumberChange(text)}
                                keyboardType='phone-pad'
                                returnKeyType='done'
                            />
                            <TouchableOpacity
                                style={clientStyles.components}
                                onPress={() => signInWithPhoneNumber('+82' + number)}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>인증번호 보내기</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>



                        {
                            appleAuth.isSupported === false ?

                                <View style={clientStyles.footer}>
                                    <Text>애플로그인이 지원되지않습니다.</Text>
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

                    </ScrollView>
                </View>
            )
        }
    }

    if (isPortrait()) {
        return (
            <View style={clientStyles.background}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    style={{ width: '100%' }}
                >

                    <View style={clientStyles.header}>
                        <Text style={clientStyles.title}>DGTHRU</Text>
                        <Text style={clientStyles.subTitle}>동국대학교 스마트오더</Text>
                    </View>
                    <View style={clientStyles.body}>
                        <Text style={clientStyles.subTitle}>{number}</Text>
                        <KeyboardAvoidingView
                            behavior={Platform.OS == "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={20}
                            style={clientStyles.background}
                        >
                            <TextInput
                                style={clientStyles.phoneNumber}
                                placeholder='인증번호를 입력해주세요.'
                                onChangeText={text => setCode(text)}
                                keyboardType='phone-pad'
                            />
                            <TouchableOpacity
                                style={clientStyles.components}
                                onPress={() => confirmCode()}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>인증하기</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                    <View style={[clientStyles.footer]}>
                        <Text style={{ color: '#ddd', textAlign: 'center' }}>위 번호로 로그인을 진행합니다.</Text>
                    </View>
                </ScrollView>
            </View>
        );
    } else {
        return (
            <View style={clientStyles.background}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    style={{ width: '100%' }}
                >


                    <Text style={clientStyles.title}>DGTHRU</Text>
                    <Text style={clientStyles.subTitle}>동국대학교 스마트오더</Text>


                    <Text style={clientStyles.subTitle}>{number}</Text>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={20}
                        style={clientStyles.background}
                    >
                        <TextInput
                            style={clientStyles.phoneNumber}
                            placeholder='인증번호를 입력해주세요.'
                            onChangeText={text => setCode(text)}
                            keyboardType='phone-pad'
                        />
                        <TouchableOpacity
                            style={clientStyles.components}
                            onPress={() => confirmCode()}
                        >
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>인증하기</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>

                    <View style={[clientStyles.footer]}>
                        <Text style={{ color: '#ddd', textAlign: 'center' }}>위 번호로 로그인을 진행합니다.</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Verify;