import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { menuStyles } from './styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';

enableScreens();

export default HyehwaDessertDetail = ({ navigation, route }) => {

    const { items } = route.params;
    const { shopInfo } = route.params;


    return (
        <View style={menuStyles.background}>
            <FlatList
                data={items}
                renderItem={
                    ({ item }) => {
                        if (item.sold_out !== true) {
                            return (
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', alignItems: 'center', }}
                                    onPress={() => navigation.navigate('SelectMenu', { item: item, shopInfo: shopInfo })}>
                                    <View style={menuStyles.subRadiusIcon}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>IMG</Text>
                                        <Text style={menuStyles.subRadiusText}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        } 
                        else {
                            return (
                                <View style={menuStyles.subRadiusIconSoldOut} >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>IMG</Text>
                                    <Text style={menuStyles.subRadiusText}>{item.name}</Text>
                                </View>
                            )
                        }
                    }
                }
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
            />
        </View>
    );
}
