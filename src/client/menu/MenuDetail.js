import React from 'react';
import {
    View,
    Text,
    ScrollView
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
    const { categoryName } = route.params;


    return (
        <View style={menuStyles.background}>
            <View style={[menuStyles.sectionHeader, { height: 'auto', width: '90%', borderBottomWidth: 2, borderColor: 'lightgray' }]}>
                <Text style={menuStyles.subTitle}>{categoryName}</Text>
            </View>
            <ScrollView style={[menuStyles.sectionHeader, {
                width: '90%',
                height:
                    items.length > 3 ? items.length * 180 / 3 :
                        items.length === 3 ? items.length * 150 / 2 :
                            items.length > 1 ? items.length * 110 : 180
            }]}
                scrollEnabled={true}
            >
                <FlatList
                    data={items}
                    renderItem={
                        ({ item }) => {
                            if (item.sold_out !== true) {
                                return (
                                    <TouchableOpacity
                                        style={{ alignItems: 'center', flexDirection: 'row', }}
                                        onPress={() => navigation.navigate('SelectMenu', { item: item, shopInfo: shopInfo, type: type })}
                                        onLongPress={() => pushFavorite(shopInfo, item)}
                                    >
                                        <View style={menuStyles.subRadiusIcon}>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>IMG</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', marginStart: 10 }}>
                                            <Text style={menuStyles.subRadiusText}>{item.name}</Text>
                                            <Text style={[menuStyles.subRadiusText, { color: 'grey', fontSize: 13 }]}>{item.cost}원</Text>
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
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    contentContainerStyle={{ alignItems: 'flex-start', margin: 5 }}
                />
            </ScrollView>
            <Text style={{ marginBottom: 25, color: 'gray', fontSize: 12 }}>길게 누르시면 '즐겨찾기' 등록이 가능합니다.</Text>
        </View>
    );
}
