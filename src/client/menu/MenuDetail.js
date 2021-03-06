import React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { menuStyles } from './styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ImageLinker from '../../utils/ImageLinker';

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
            <View style={[menuStyles.sectionHeader, { height: 'auto', width: '90%', borderColor: 'lightgray' }]}>
                <Text style={[menuStyles.subTitle, { color: 'black', fontSize: 16 }]}>{categoryName}</Text>
            </View>
            <ScrollView style={[menuStyles.sectionHeader, {
                width: '90%',
                height: '100%',
                borderColor: 'lightgray'
            }]}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <FlatList
                    data={items}
                    renderItem={
                        ({ item }) => {
                            if (item.sold_out !== true) {

                                return (
                                    <TouchableOpacity
                                        style={{ alignItems: 'center', flexDirection: 'row', }}
                                        onPress={() => navigation.navigate('SelectMenu',
                                            {
                                                item: item,
                                                shopInfo: shopInfo,
                                                type: type,
                                                categoryName:categoryName
                                            }
                                        )}
                                        onLongPress={() => pushFavorite(shopInfo, item)}
                                    >
                                        <ImageLinker name={item.name} style={menuStyles.subRadiusIcon} />
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
                    keyExtractor={(item, index) => item.key}
                    scrollEnabled={false}
                    contentContainerStyle={{ alignItems: 'flex-start', margin: 5 }}
                />
            </ScrollView>
            <Text style={{ marginBottom: 25, color: 'gray', fontSize: 12 }}>길게 누르시면 '즐겨찾기' 등록이 가능합니다.</Text>
        </View>
    );
}
