//주문내역 보여줄거임

import React, { useState } from 'react';
import {
    View,
    Button,
    Text
} from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { FlatList } from 'react-native-gesture-handler';


//>> 이거 클래스로 바꿀예정
export default Bill = ({ navigation, route }) => {


    const userHistory = [];

    const getData = () => {
        
        database()
            .ref('user_history/' + auth().currentUser.uid)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((childSnapShot) => {
                    userHistory.concat(childSnapShot.val());
                })
            })
        return userHistory;
    }


    return (
        <SafeAreaView>
            <Text>{auth().currentUser.phoneNumber} 님 환영합니다 !</Text>
            <FlatList 
                data={userHistory}
                renderItem={ ({item}) => (
                    <View>
                        <Text>{item.name+'\t'+item.cost}</Text>
                    </View>
                )}
                keyExtractor={(item, id) => id}
            />
        </SafeAreaView>
    )
}