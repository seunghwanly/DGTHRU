import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { menuStyles } from './styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { pushFavorite } from '../../utils/DatabaseRef';

import { enableScreens } from 'react-native-screens';

enableScreens();

export default HyehwaDessertDetail = ({ navigation, route }) => {

    const { items } = route.params;
    const { shopInfo } = route.params;
    const { type } = route.params;


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
                                    onPress={() => navigation.navigate('SelectMenu', { item: item, shopInfo: shopInfo, type : type })}
                                    onLongPress={() => pushFavorite(shopInfo, item)}
                                    >
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
            <Text style={{marginBottom:25, color:'gray', fontSize:12}}>길게 누르시면 '즐겨찾기' 등록이 가능합니다.</Text>
        </View>
    );
}
