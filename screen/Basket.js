import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    Pressable,
    FlatList,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ReactNativeItemSelect from 'react-native-item-select';

import { enableScreens } from 'react-native-screens';

enableScreens();

export default Basket = ({ navigation, route }) => {

    const { item } = route.params;

    const dataInOrOut = [
        "매장용", "일회용"
    ];

    const [count, setCount] = useState(1);
    const [selected, setSelected] = useState(null);
    const [inOrOut, setInOrOut] = useState(null);



    function ChooseDetail(props) {
        const subMenu = props.subMenu;
        if (subMenu.hasOwnProperty('sub_menu')) {

            return (
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: 5,
                }}
                >
                    <Text style={{
                        alignSelf: 'center',
                        margin: 5
                    }}>맛을 선택해주세요</Text>
                    <FlatList
                        data={subMenu.sub_menu}
                        renderItem={
                            ({ item }) => {
                                const backgroundColor = item.toString()
                                    === selected ?
                                    'coral' : 'steelblue';
                                const color = item.toString()
                                    === selected ?
                                    'black' : 'white';

                                return (
                                    <TouchableOpacity
                                        onPress={() => setSelected(item.toString())}
                                        style={
                                            [
                                                { backgroundColor },
                                                {
                                                    width: 80,
                                                    borderRadius: 8,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 5,
                                                    margin: 2,

                                                }
                                            ]
                                        }>
                                        <Text
                                            style={{
                                                color,
                                                fontWeight: 'bold'
                                            }}
                                        > {item} </Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                        numColumns={3}
                        keyExtractor={(item) => item.toString()}
                        extraData={selected}
                        scrollEnabled={false}
                    />
                </View>
            )
        } else {
            return (
                <></>
            )
        }
    }


    handleCount = (id) => {

        if (count > 0) {
            if (count === 1) {
                if (id === '-') {
                    alert('다른 메뉴를 주문하시겠어요?');
                }
                else {
                    setCount(count + 1);
                }
            }
            else {
                if (id === '-') {
                    setCount(count - 1);
                }
                else {
                    setCount(count + 1);
                }
            }
        }
    }

    handlePress = (item) => {
        console.log(item);
        alert(item);
    }

    handleOrder = () => {
        if (count >= 1 && inOrOut !== null) {

            const orderList = {
                "name": item.name,
                "count" : count,
                "selected" : selected,
                "inorout" : inOrOut,
                "cost": item.cost
            };

            const orderList2 = [item.name, count, selected, inOrOut, item.cost];

            // if() {
            //     navigation.navigate('BasketDetail', { item : orderList2 })
            // }
            // else {
            //     alert('모두 선택해주세요 !');
            // }

        } else
            alert('모두 선택해주세요 !');
    }

    return (
        <View style={styles.background}>

            <View style={styles.subBackground}>
                {/* 2줄 컬럼형 */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {/* 이미지랑 갯수 조절하는 거 */}
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        {/* 아이콘이랑 이름 */}
                        <View style={styles.radiusIcon} />
                        <Text style={styles.radiusText}>{item.name}</Text>
                        {/* 버튼 */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <Button style={styles.amountButton} title='-' onPress={() => handleCount('-')} />
                            <Text >{count}</Text>
                            <Button style={styles.amountButton} title='+' onPress={() => handleCount('+')} />
                        </View>
                        {/* 왼쪽 세로 줄 */}
                    </View>

                    {/* 매장용 또는 일회용 선택과 장바구니담기 버튼 */}
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,

                    }}>
                        <Text>컵을 선택해주세요.</Text>
                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                        }}>
                            <FlatList
                                data={dataInOrOut}
                                renderItem={
                                    ({ item }) => {

                                        const backgroundColor = item.toString()
                                            === inOrOut ?
                                            'royalblue' : 'lightgray';

                                        const color = item.toString()
                                            === inOrOut ?
                                            'white' : 'black';

                                        return (
                                            <TouchableOpacity
                                                onPress={() => setInOrOut(item.toString())}
                                                style={
                                                    [
                                                        {
                                                            backgroundColor
                                                        },
                                                        {
                                                            width: 80,
                                                            height: 40,
                                                            borderRadius: 8,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: 5,
                                                            margin: 2,

                                                        }
                                                    ]
                                                }>
                                                <Text style={
                                                    {
                                                        color
                                                    }
                                                }> {item} </Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                }
                                numColumns={3}
                                keyExtractor={(item) => item.toString()}
                                extraData={inOrOut}
                                scrollEnabled={false}
                            />

                        </View>
                        <TouchableOpacity
                            style={
                                {
                                    backgroundColor: 'midnightblue',
                                    padding: 10,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    height: 40,
                                    paddingLeft: 45,
                                    paddingRight: 45,
                                }
                            }
                            onPress={() => handleOrder()}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>장바구니담기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ChooseDetail subMenu={item} />
            </View>

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
        padding: '5%',
        flex: 1
    },
    subBackground: {
        width: '90%',
        height: 'auto',
        backgroundColor: 'ghostwhite',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10
    },
    radiusIcon: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: 'royalblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    radiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'midnightblue',
        textAlign: 'center',
        margin: 10
    },
    amountButton: {
        backgroundColor: 'darkgray',
        borderRadius: 10,
        width: '5%',
        height: '5%',
        color: 'midnightblue'
    }
});