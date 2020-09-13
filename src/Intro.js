import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';

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

    return (
        <View style={styles.background}>
            <View style={{ marginBottom: 30 }}>
                <Text style={styles.title}>DGTHRU</Text>
                <Text style={styles.subTitle}>동국대학교 스마트오더</Text>
            </View>
            <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                    user.phoneNumber === '+821011112222' ? navigation.replace('SupervisorShops') : navigation.replace('Shops')
                }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>시작하기</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Intro;