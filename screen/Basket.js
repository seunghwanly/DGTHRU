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

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import moment from 'moment';

import { enableScreens } from 'react-native-screens';

enableScreens();


export default Basket = ({ navigation, route }) => {

    const userPhoneNumber = auth().currentUser;
    var currentTime = moment().format('YYYY_MM_DD');

    const { item } = route.params;
    const { shopInfo } = route.params;

    const dataInOrOut = [
        "매장용", "일회용"
    ];

    const dataIceHot = [
        "HOT", "ICED"
    ];

    const dataWhippingCream = [
        "많이", "적게", "노노"
    ];

    const [count, setCount] = useState(1);
    const [selected, setSelected] = useState(null);
    const [inOrOut, setInOrOut] = useState(null);
    const [hotOrIced, setHotOrIced] = useState(null);
    const [whippingCream, setWhippingCream] = useState(null);


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

    handleOrder = (item) => {
<<<<<<< HEAD
        //TODO: 가게 정보 넣기

        const jsonOrderList = {
            'name': item.name,
            'cost': item.cost,
            'count': count,
            'cup': inOrOut,
            'type': hotOrIced,
            //옵션추가를 배열로 할지 고민중
        }

        //sold_out >> false 인 것 만
        if (item.sold_out !== true) {
            //count 확인  + 매장용/일회용 선택
            if (count >= 1 && inOrOut != null) {
                //ice 가능과 hotOrIced 선택되있는지 확인
                /*
                    [ ice_available,    hotOrIced,  only_ice ]
                    1. ice O ,  null,   T    >> pass : only ice
                    2. ice X ,  null,   T    >> error : not exist
                    3. ice O ,  null,   F    >> error : select menu (both avail)
                    4. ice X ,  null,   F    >> pass : only hot
                    5. ice O ,  HOT,    T    >> error : only ice avail
                    6. ice O ,  HOT,    F    >> pass : hot avail
                    7. ice X ,  HOT,    T    >> error : not exist
                    8. ice X ,  HOT,    F    >> pass : only hot
                    9. ice O ,  ICED,   T    >> pass : only ice
                    10. ice O,  ICED,   F    >> pass : select menu (both avail)
                    11. ice X,  ICED,   T    >> error : not exist
                    12. ice X,  ICED,   F    >> error : only hot
                */
                if (hotOrIced === null) { // 1,4
                    if (
                        (item.ice_available === true && item.only_ice === true)
                        ||
                        (item.ice_available === false && item.only_ice === false)
                    ) {
                        // only HOT and ICED possible
                        //sub_menu 확인
                        if (item.hasOwnProperty('sub_menu')) {
                            if (selected !== null) { //selected menu detail
                                if (item.hasOwnProperty('option_available')) {
                                    // 선택한 옵션을 가져와서 DB에 넣어야함
                                    // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                    //push DB
                                    
                                    // 가게 정보 >> shopInfo 
                                    // TODO : push to firebase !!
                                    const newReference = database()
                                        .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                        .push();
                                    const postKey = newReference.key;

                                    console.log('Auto generated key: ', postKey);

                                    newReference
                                        .set(jsonOrderList)
                                        .then(() => navigation.navigate('BasketDetail'));
                                }
                                else {  //none option
                                    //push DB
                                    
                                    // TODO : push to firebase !!
                                    const newReference = database()
                                        .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                        .push();
                                    const postKey = newReference.key;

                                    console.log('Auto generated key: ', postKey);

                                    newReference
                                        .set(jsonOrderList)
                                        .then(() => navigation.navigate('BasketDetail'));
                                }
                            }
                            else { //selected nothing
                                alert('모두 선택해주세요');
                            }
                        }   //if
                        else {  //sub_menu none >> 단일메뉴임
                            if (item.hasOwnProperty('option_available')) {
                                // 선택한 옵션을 가져와서 DB에 넣어야함
                                // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                //push DB
                                
                                // TODO : push to firebase !!
                                const newReference = database()
                                    .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                    .push();
                                const postKey = newReference.key;

                                console.log('Auto generated key: ', postKey);

                                newReference
                                    .set(jsonOrderList)
                                    .then(() => navigation.navigate('BasketDetail'));
                            }
                            else {  //none option
                                //push DB
                                
                                // TODO : push to firebase !!
                                const newReference = database()
                                    .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                    .push();
                                const postKey = newReference.key;

                                console.log('Auto generated key: ', postKey);

                                newReference
                                    .set(jsonOrderList)
                                    .then(() => navigation.navigate('BasketDetail'));
                            }
                        }   //else
                    }   //if
                    else {  // 2, 3
                        alert('모두 선택해주세요');
                    }
                }    //1,2,3,4
                else {
                    if (hotOrIced === 'HOT' && item.only_ice === false) {  //6,8
                        //sub_menu 확인
                        if (item.hasOwnProperty('sub_menu')) {
                            if (selected !== null) { //selected menu detail
                                if (item.hasOwnProperty('option_available')) {
                                    // 선택한 옵션을 가져와서 DB에 넣어야함
                                    // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                    //push DB
                                    
                                    // TODO : push to firebase !!
                                    const newReference = database()
                                        .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                        .push();
                                    const postKey = newReference.key;

                                    console.log('Auto generated key: ', postKey);

                                    newReference
                                        .set(jsonOrderList)
                                        .then(() => navigation.navigate('BasketDetail'));
                                }
                                else {  //none option
                                    //push DB
                                    
                                    // TODO : push to firebase !!
                                    const newReference = database()
                                        .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                        .push();
                                    const postKey = newReference.key;

                                    console.log('Auto generated key: ', postKey);

                                    newReference
                                        .set(jsonOrderList)
                                        .then(() => navigation.navigate('BasketDetail'));
                                }
                            }
                            else { //selected nothing
                                alert('모두 선택해주세요');
                            }
                        }   //if
                        else {  //sub_menu none >> 단일메뉴임
                            if (item.hasOwnProperty('option_available')) {
                                // 선택한 옵션을 가져와서 DB에 넣어야함
                                // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                //push DB
                                
                                // TODO : push to firebase !!
                                const newReference = database()
                                    .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                    .push();
                                const postKey = newReference.key;

                                console.log('Auto generated key: ', postKey);

                                newReference
                                    .set(jsonOrderList)
                                    .then(() => navigation.navigate('BasketDetail'));
                            }
                            else {  //none option
                                //push DB
                                
                                // TODO : push to firebase !!
                                const newReference = database()
                                    .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                    .push();
                                const postKey = newReference.key;

                                console.log('Auto generated key: ', postKey);

                                newReference
                                    .set(jsonOrderList)
                                    .then(() => navigation.navigate('BasketDetail'));
                            }
                        }   //else
                    }

                    if (hotOrIced === 'ICED' && item.ice_available === true) {    //9,10
                        //sub_menu 확인
                        if (item.hasOwnProperty('sub_menu')) {
                            if (selected !== null) { //selected menu detail
                                if (item.hasOwnProperty('option_available')) {
                                    // 선택한 옵션을 가져와서 DB에 넣어야함
                                    // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                    //push DB
                                    
                                    // TODO : push to firebase !!
                                    const newReference = database()
                                        .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                        .push();
                                    const postKey = newReference.key;

                                    console.log('Auto generated key: ', postKey);

                                    newReference
                                        .set(jsonOrderList)
                                        .then(() => navigation.navigate('BasketDetail'));
                                }
                                else {  //none option
                                    //push DB
                                    
                                    // TODO : push to firebase !!
                                    const newReference = database()
                                        .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                        .push();
                                    const postKey = newReference.key;

                                    console.log('Auto generated key: ', postKey);

                                    newReference
                                        .set(jsonOrderList)
                                        .then(() => navigation.navigate('BasketDetail'));
                                }
                            }
                            else { //selected nothing
                                alert('모두 선택해주세요');
                            }
                        }   //if

                        else {  //sub_menu none >> 단일메뉴임
                            if (item.hasOwnProperty('option_available')) {
                                // 선택한 옵션을 가져와서 DB에 넣어야함
                                // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                //push DB
                                
                                // TODO : push to firebase !!
                                const newReference = database()
                                    .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                    .push();
                                const postKey = newReference.key;

                                console.log('Auto generated key: ', postKey);

                                newReference
                                    .set(jsonOrderList)
                                    .then(() => navigation.navigate('BasketDetail'));
                            }
                            else {  //none option
                                //push DB
                                
                                // TODO : push to firebase !!
                                const newReference = database()
                                    .ref(shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                    .push();
                                const postKey = newReference.key;

                                console.log('Auto generated key: ', postKey);

                                newReference
                                    .set(jsonOrderList)
                                    .then(() => navigation.navigate('BasketDetail'));
                            }
                        }   //else
                    }

                    else {   //5,7,11,12
                        alert('선택항목을 확인해주세요 !');
                    }
                }    //5,6,7,8,9,10,11,12
=======
        if (count >= 1 && inOrOut !== null) {   // 최소 한개 이상 주문, 매장용 / 일회용

            if (item.ice_available === true && hotOrIced !== null) { //얼음 가능인데 안 골라졌을 때

                if (item.only_ice === true && hotOrIced === 'HOT') { //얼음만 가능인데 핫을 골랐음
                    alert('본 메뉴는 ICE만 선택이 가능합니다 !');
                }
                else {                                              //얼음만 가능인데 얼음을 고름 , 얼음만 가능한게 아닌데 핫을고름

                    if (item.hasOwnProperty('sub_menu')) {

                        if (selected !== null) {

                            const jsonOrderList = {
                                "name": item.name,
                                "count": count,
                                "in_out": inOrOut,
                                "cost": item.cost,
                                "hot_ice": hotOrIced,
                                "selected": selected
                            };

                            // TODO : push to firebase !!
                            const newReference = database()
                                .ref('users/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                                .push();
                            const postKey = newReference.key;

                            console.log('Auto generated key: ', postKey);

                            newReference
                                .set(jsonOrderList)
                                .then(() => navigation.navigate('BasketDetail'));

                        } else {
                            alert('모두 선택해주세요 !');
                        }
                    }
                    else {

                        const jsonOrderList = {
                            "name": item.name,
                            "count": count,
                            "in_out": inOrOut,
                            "cost": item.cost,
                            "hot_ice": hotOrIced,
                            "selected": null
                        };

                        // TODO : push to firebase !!
                        // TODO : push to firebase !!
                        const newReference = database()
                            .ref('users/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                            .push();
                        const postKey = newReference.key;

                        console.log('Auto generated key: ', postKey);

                        newReference
                            .set(jsonOrderList)
                            .then(() => navigation.navigate('BasketDetail'));
                    }
                }
>>>>>>> parent of b01c886... Basket.js 로직 수정
            }
            else if (item.ice_available === true && hotOrIced === null) {
                alert('모두 선택해주세요 !');
            }
            else {

                const jsonOrderList = {
                    "name": item.name,
                    "count": count,
                    "in_out": inOrOut,
                    "cost": item.cost,
                    "hot_ice": null,
                    "selected": null
                };

                // TODO : push to firebase !!
                // TODO : push to firebase !!
                const newReference = database()
                    .ref('users/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                    .push();
                const postKey = newReference.key;

                console.log('Auto generated key: ', postKey);

                newReference
                    .set(jsonOrderList)
                    .then(() => navigation.navigate('BasketDetail'));
            }
<<<<<<< HEAD
        }
=======

        } else
            alert('모두 선택해주세요 !');
>>>>>>> parent of b01c886... Basket.js 로직 수정
    }


    if (item.sold_out === false) {
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
                            {
                                item.ice_available === true && item.only_ice === false ?
                                    <View style={{
                                        flexDirection: 'row',
                                        padding: 10,
                                    }}>
                                        <FlatList
                                            data={dataIceHot}
                                            renderItem={
                                                ({ item }) => {

                                                    const backgroundColor = item.toString()
                                                        === hotOrIced ?
                                                        'royalblue' : 'lightgray';

                                                    const color = item.toString()
                                                        === hotOrIced ?
                                                        'white' : 'black';

                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => setHotOrIced(item.toString())}
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
                                            extraData={hotOrIced}
                                            scrollEnabled={false}
                                        />
                                    </View>
                                    :
                                    <></>
                            }
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
                                onPress={() => handleOrder(item)}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>장바구니담기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ChooseDetail subMenu={item} />
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
                            margin: 10
                        }
                    }
                    onPress={() => navigation.navigate('BasketDetail')}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>장바구니 바로가기</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View
                style={styles.background}>
                <Text>메뉴가 품절되었습니다.</Text>
            </View>

        )
    }
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