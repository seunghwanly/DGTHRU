import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';
 
enableScreens();

export default HyehwaDessertDetail = ({ navigation, route }) => {

    const { items } = route.params;

    return (
        <View style={styles.background}>
            <FlatList
                data={items}
                renderItem={
                    ({ item }) => (
                        <TouchableOpacity
                            style={{
                                justifyContent:'center',
                                alignItems:'center',
                            }}
                            onPress={() => navigation.navigate('Basket', { item : item })}
                            >
                            <View style={styles.radiusIcon}>
                                <Text style={{color:'white', fontWeight:'bold'}}>IMG</Text>
                                <Text style={styles.radiusText}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
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
        padding: '5%',
        flex: 1
    },
    radiusIcon: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    radiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'lightgray',
        textAlign: 'center',
        margin:10
    },
});