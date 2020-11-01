import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { isPortrait } from './utils/checkOrientation';

import auth from '@react-native-firebase/auth';

import { enableScreens } from 'react-native-screens';
enableScreens();

function Intro({ navigation }) {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        if (isPortrait()) {
            return (
                <View style={styles.background}>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={styles.title}>DGTHRU</Text>
                        <Text style={styles.subTitle}>동국대학교 스마트오더</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => navigation.navigate('Verify')}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>시작하기</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View style={styles.background}>
                    <View style={{
                        alignItems:'center'
                    }}>
                        <Text style={{color:'white'}}>DGTHRU</Text>
                        <Text style={{color:'white'}}>동국대학교 스마트오더</Text>
                    </View>
                    <TouchableOpacity
                        style={{marginVertical:10, width:300, backgroundColor:'#eeaf9d', alignItems:'center', borderRadius:8, padding:10}}
                        onPress={() => navigation.navigate('Verify')}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>시작하기</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    if (isPortrait()) {
        return (
            <View style={styles.background}>
                <View style={{ marginBottom: 30 }}>
                    <Text style={styles.title}>DGTHRU</Text>
                    <Text style={styles.subTitle}>동국대학교 스마트오더</Text>
                </View>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                        user.phoneNumber === '+821011112222' || user.phoneNumber ==='+821022221111' ? navigation.replace('SupervisorOrderList') : navigation.replace('Shops')
                    }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>시작하기</Text>
                </TouchableOpacity>
            </View>
        )
    }
    else {
        return (
            <View style={styles.background}>
                <View style={{}}>
                    <Text style={styles.title}>DGTHRU</Text>
                    <Text style={styles.subTitle}>동국대학교 스마트오더</Text>
                </View>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                        user.phoneNumber === '+821011112222' || user.phoneNumber ==='+821022221111' ? navigation.replace('SupervisorOrderList') : navigation.replace('Shops')
                    }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>시작하기</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Intro;