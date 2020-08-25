import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import auth from '@react-native-firebase/auth';

import Shops from './client/Shops';
import SupervisorShops from './supervisor/SupervisorShops';

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
                    style={{
                        margin: 15,
                        backgroundColor: 'dodgerblue',
                        width: 180,
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate('Verify')}
                    onLongPress={() => navigation.navigate('SupervisorShops')}
                //onLongPress={() => alert('종하석운 화이팅')}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>시작하기</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <SafeAreaView>
        {
            user.phoneNumber === '+821011112222' ?

            <SupervisorShops navigation={navigation} />
            :
            <Shops navigation={navigation} />

        }
        </SafeAreaView>
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