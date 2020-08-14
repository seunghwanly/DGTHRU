import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';

//json
import * as data from '../data/DormDessert.json';

enableScreens();

//drink and bakery
const drinkData = data.categories_drink;
const bakeryData = data.categories_bakery;


export default DormDessert = ({ navigation }) => {

    function MenuInfo(item) {

        // for(var i=0; i<item.length; ++i) {

        //     var menuName = item[i].name;
        //     var menuCost = item[i].cost;
        //     var iceAvailable = item[i].ice_available;
        //     var soldOut = item[i].sold_out;

        //     if(item[i].sub_menu !== null) {
        //         var subMenu = item[i].sub_menu;
        //     }

        // }
        //navigate?
       
    }

    return (
        <View style={styles.background}>
            <ScrollView>
                <Text style={styles.subtitle}>DRINKS</Text>
                {/* drink data */}
                <FlatList
                    data={drinkData}
                    renderItem={
                        ({ item }) => (
                            <TouchableOpacity
                                style={styles.radiusIcon}
                                onPress={() => navigation.navigate('DormDessertDetail', { items: item.menu })}
                            >
                                <Text style={styles.radiusText}>
                                    {item.category_name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={styles.subtitle}>BAKERY</Text>
                {/* bakery data */}
                <FlatList
                    data={bakeryData}
                    renderItem={
                        ({ item }) => (
                            <TouchableOpacity style={styles.radiusIcon}
                                onPress={() => navigation.navigate('DormDessertDetail', { items: item.menu })}
                            >
                                <Text style={styles.radiusText}>
                                    {item.category_name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        </View>
    )
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
    radiusIcon: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: 'deepskyblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    radiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 22,
        color: 'gray',
        textAlign: 'center',
        marginStart: 5,
        marginEnd: 5
    },
})