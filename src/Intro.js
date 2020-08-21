import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

import { enableScreens } from 'react-native-screens';

import Shops from './client/Shops';

enableScreens();

function Intro({ navigation }) {
    
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

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
                <Button
                    style={{ margin: 15 }}
                    title='시작하기'
                    onPress={() => navigation.navigate('Verify')}
                />
            </View>
        );
    }

    return(
        <Shops navigation={navigation}/>
    )
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
});

export default Intro;