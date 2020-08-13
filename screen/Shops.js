import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native';

import auth from '@react-native-firebase/auth';

import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

enableScreens();

const shopData = [
    {
        id: 'hyehwa_1f',
        title: '혜화관 1층 카페',
        location: '혜화관 1층'
    },
    {
        id: 'munhwa_1f',
        title: '문화관 지하1층 카페',
        location: '문화관 지하1층'
    },
    {
        id: 'main_outdoor',
        title: '본관 야외 카페',
        location: '본관 야외 휴게장소'
    },
    {
        id: 'singong_1f',
        title: '신공학관 1층 카페',
        location: '신공학관 1층'
    },
    {
        id: 'library_1f',
        title: '중앙도서관 1층 카페',
        location: '중앙도서관 1층'
    }
];

const Item = ({ title, location, navigation }) => (
    <TouchableOpacity
        style={{ width: 300 }}
        onPress={() => alert('title' + { title } + 'location' + {location})}
    >
        <View style={{ flexDirection: 'row', margin: 5, padding: 5, alignItems:'center' }}>
            <View style={
                {
                    borderRadius: 25,
                    width: 25,
                    height: 25,
                    backgroundColor: 'deepskyblue'
                }
            }
            />
            <View style={
                {
                    backgroundColor: 'lightgray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    marginStart: 20,
                    borderRadius: 12,
                    padding:5
                }
            }>
                <Text style={
                    {
                        fontSize: 20,
                        fontWeight: 'bold',
                    }
                }>{title}</Text>
            </View>
        </View>
        <View>
            <Text style={{ textAlign: 'right', color: 'gray', fontSize: 12, marginEnd:10 }}>{location}</Text>
        </View>
    </TouchableOpacity>
);

function Shops({ navigation }) {

    const renderItem = ({ item }) => (
        <Item title={item.title} location={item.location} />
    );

    signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User Signed Out !'));
    }

    return (
        <>
            <View style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.title}>DGTRHU</Text>
                    <Text style={styles.subtitle}>동국대학교 CAFE LIST</Text>
                </View>

                <View style={styles.body}>
                    <FlatList
                        data={shopData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={styles.footer}>
                    <Button
                        title='로그아웃'
                        onPress={() => signOut()}
                    />
                </View>



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
        backgroundColor: 'white',
        padding: '10%',
        flex: 1
    },
    header: {
        height: '20%',
        width: '100%'
    },
    body: {
        height: '60%',
        width: '100%'
    },
    footer: {
        height: '20%',
        width: '100%',
    },
    title: {
        fontSize: 44,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 22,
        color: 'gray',
        textAlign: 'center'
    },
    item: {

    },
});
export default Shops;