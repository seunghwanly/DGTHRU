import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
} from 'react-native';
import { basketStyles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import moment from 'moment';

import { useFocusEffect } from '@react-navigation/native';

import { pushData } from '../../utils/asyncStorage';

import { enableScreens } from 'react-native-screens';

enableScreens();

export default Basket = ({ navigation, route }) => {

    const userPhoneNumber = auth().currentUser;
    var currentTime = moment().format('YYYY_MM_DD');

    const { item } = route.params;
    const { shopInfo } = route.params;
    const { type } = route.params;

    const dataInOrOut = [
        "개인컵", "매장용", "일회용"
    ];

    const dataIceHot = [
        "HOT", "ICED"
    ];

    // const orderState = [
    //     'request', 'confirm', 'ready'
    // ]

    const dataWhippingCream = [
        "많이", "적게", "노노"
    ];

    const [count, setCount] = useState(1);
    const [selected, setSelected] = useState(null);
    const [inOrOut, setInOrOut] = useState(null);
    const [hotOrIced, setHotOrIced] = useState(null);
    const [whippingCream, setWhippingCream] = useState(null);
    const [shotNum, setShotNum] = useState(2);
    const [time, setTime] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const [refresh, setRefresh] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setTotalCost(0);
        }, [])
    );

    useEffect(() => {
        console.log('refreshed !');
        setRefresh(false);

    });

    useEffect(() => {
        //TODO : basket에서 장바구니로 갔다가 지우고 돌아와서 바로주문하면 totalCost가 남아있음
        var tempTotalCost = 0;

        console.log('[Basket] init totalcost >>> ' + totalCost);

        database()
            .ref('shops/' + shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
            .once('value', (snapshot) => {
                // console.log('[Basket] length >>' + countProperties(snapshot.val()));

                snapshot.forEach((childSnapShot) => {

                    // console.log('[Basket] childSnapShot >> ' + childSnapShot.val());

                    tempTotalCost += childSnapShot.val().cost;

                    // console.log('prevCost >> ' + prevCost);

                    // console.log('[Basket] in loop : totalCost >> ' + totalCost);
                    // console.log('[Basket] in loop : temptotalCost >> ' + tempTotalCost);
                })
                setTotalCost(() => tempTotalCost);
                // return () => { setTotalCost(tempTotalCost);
                console.log('[Basket] out totalCost >> ' + totalCost);
                console.log('[Basket] out loop : temptotalCost >> ' + tempTotalCost);
                //}
            });
    }, [totalCost]);

    function ChooseDetail(props) {
        const subMenu = props.subMenu;

        if (subMenu.hasOwnProperty('sub_menu')) {
            return (
                <View style={basketStyles.chooseDetailWrapper}>
                    <Text style={basketStyles.chooseDetailText}>맛을 선택해주세요</Text>
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
                                        style={[{ backgroundColor }, basketStyles.chooseDetailItem]}>
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
    handleShotCount = (id) => {
        if (shotNum > 0) {
            if (shotNum === 1) {
                if (id === '+') {
                    setShotNum(shotNum + 1);
                    // setTotalCost(totalCost + 600);
                }
            }
            else {
                if (id === '+') {
                    setShotNum(shotNum + 1);
                    // setTotalCost(totalCost + 600);
                }
                else {
                    setShotNum(shotNum - 1);
                    // setTotalCost(totalCost - 600);
                }
            }
        }
    }

    handlePress = (item) => {
        console.log(item);
        alert(item);
    }

    countProperties = (obj) => {
        var count = 0;

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                ++count;
        }

        return count;
    }

    sendOrder = (jsonOrderList, shopInfo, userPhoneNumber) => {
        // 1.오너와 함께 공유하는 DB
        const orderRef = database()
            .ref('shops/' + shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
            .push();

        orderRef
            .set(jsonOrderList)
            .then(() => alert('담겼습니다!'));

        // 2.사용자 History
        const userRef = database()
            .ref('user_history/' + userPhoneNumber.uid + '/' + moment().format('YYYY_MM_DD'))
            .push();
        
        userRef
            .set(jsonOrderList)
            .then(() => console.log('Updated User History'));
    }

    handleOrder = (item) => {
        item.time = moment().format('HH:mm:ss');
        // HOT / ICED 기본적으로 설정해줌
        if (item.ice_available === false && item.only_ice === false)
            setHotOrIced('HOT');
        if (item.ice_available === true && item.only_ice === true)
            setHotOrIced('ICED');
        //TODO: 가게 정보 넣기

        var jsonOrderList = {
            'name': item.name,
            'orderTime': item.time,
            'cost': item.cost,
            'count': count,
            'cup': inOrOut,
            'type': hotOrIced,
            'whipping': whippingCream,
            'shotNum': shotNum,
            'selected': selected,
            'orderState': 'request',
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
                                    sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                    return true;
                                }
                                else {  //none option
                                    //push DB
                                    sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                    return true;
                                }
                            }
                            else { //selected nothing
                                alert('모두 선택해주세요');
                                return false;
                            }
                        }   //if
                        else {  //sub_menu none >> 단일메뉴임
                            if (item.hasOwnProperty('option_available')) {
                                // 선택한 옵션을 가져와서 DB에 넣어야함
                                // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                //push DB
                                sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                return true;
                            }
                            else {  //none option
                                //push DB
                                sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                return true;
                            }
                        }   //else
                    }   //if
                    else {  // 2, 3
                        alert('모두 선택해주세요');
                        return false;
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
                                    sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                    return true;
                                }
                                else {  //none option
                                    //push DB
                                    sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                    return true;
                                }
                            }
                            else { //selected nothing
                                alert('모두 선택해주세요');
                                return false;
                            }
                        }   //if
                        else {  //sub_menu none >> 단일메뉴임
                            if (item.hasOwnProperty('option_available')) {
                                // 선택한 옵션을 가져와서 DB에 넣어야함
                                // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                //push DB
                                sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                return true;
                            }
                            else {  //none option
                                //push DB
                                sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                return true;
                            }
                        }   //else
                    }

                    else if (hotOrIced === 'ICED' && item.ice_available === true) {    //9,10
                        //sub_menu 확인
                        if (item.hasOwnProperty('sub_menu')) {
                            if (selected !== null) { //selected menu detail
                                if (item.hasOwnProperty('option_available')) {
                                    // 선택한 옵션을 가져와서 DB에 넣어야함
                                    // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                    //push DB
                                    sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                    return true;
                                }
                                else {  //none option
                                    //push DB
                                    sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                    return true;
                                }
                            }
                            else { //selected nothing
                                alert('모두 선택해주세요');
                                return false;
                            }
                        }   //if

                        else {  //sub_menu none >> 단일메뉴임
                            if (item.hasOwnProperty('option_available')) {
                                // 선택한 옵션을 가져와서 DB에 넣어야함
                                // 이 항목은 필수가 아니라 선택이므로 있어도 되고 없어도 됨
                                //push DB
                                sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                return true;
                            }
                            else {  //none option
                                //push DB
                                sendOrder(jsonOrderList, shopInfo, userPhoneNumber);
                                return true;
                            }
                        }   //else
                    }

                    else {   //5,7,11,12
                        alert('선택항목을 확인해주세요 !');
                        return false;
                    }
                }    //5,6,7,8,9,10,11,12

            }
            else { //매장용/일회용 선택안한 경우
                alert('컵을 선택해주세요 !');
                return false;
            }
        }
    }


    if (item.sold_out === false) {
        return (
            <View style={basketStyles.background}>
                <View style={basketStyles.subBackground}>
                    {/* 2줄 컬럼형 */}
                    <View style={basketStyles.basketWrapper}>
                        {/* 이미지랑 갯수 조절하는 거 */}
                        <View style={basketStyles.basketLeftColumnWrapper}>
                            {/* 아이콘이랑 이름 */}
                            <View style={basketStyles.radiusIcon} />
                            <Text style={basketStyles.radiusText}>{item.name}</Text>
                            {/* 버튼 */}
                            <View style={basketStyles.basketLeftColumnButtonWrapper}>
                                <Button style={basketStyles.amountButton} title='-' onPress={() => handleCount('-')} />
                                <Text >{count}</Text>
                                <Button style={basketStyles.amountButton} title='+' onPress={() => handleCount('+')} />
                            </View>
                            {/* 왼쪽 세로 줄 */}
                        </View>

                        {/* 매장용 또는 일회용 선택과 장바구니담기 버튼 */}
                        <View style={basketStyles.basketRightColumnWrapper}>
                            {
                                type === 'drink' && item.ice_available === true && item.only_ice === false ?
                                    <View style={{ flexDirection: 'row', padding: 10 }}>
                                        <FlatList
                                            style={{ marginStart: '5%', marginEnd: '5%' }}
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
                                                            style={[
                                                                { backgroundColor },
                                                                basketStyles.basketTwoItem
                                                            ]}>
                                                            <Text style={{ color }}> {item} </Text>
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
                            <View style={{ flexDirection: 'row', padding: 10 }}>
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
                                                    style={[{ backgroundColor }, basketStyles.basketThreeItem]}>
                                                    <Text style={{ color }}> {item} </Text>
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
                        </View>
                    </View>
                    <View style={[basketStyles.subBackground, { backgroundColor: 'snow', alignItems: 'stretch' }]}>
                        <View style={[basketStyles.goToBasket, { width: '100%', marginBottom: 12, backgroundColor: 'dodgerblue' }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>OPTIONS</Text>
                        </View>
                        <ChooseDetail subMenu={item} />
                        {
                            type === 'drink' && item.option_available.shot === true ?
                                <>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: 5 }}>
                                        <View style={[basketStyles.smallRadiusIcon, { width: 15, height: 15, backgroundColor: 'dodgerblue' }]} />
                                        <Text>에스프레소 샷 추가</Text>
                                    </View>
                                    <View style={basketStyles.basketLeftColumnButtonWrapper}>
                                        {/* TODO: 음료마다 기본 샷이 다름 */}
                                        <Button style={basketStyles.amountButton} title='-' onPress={() => handleShotCount('-')} />
                                        <Text style={{width:100, textAlign:'center'}}>{shotNum}</Text>
                                        <Button style={basketStyles.amountButton} title='+' onPress={() => handleShotCount('+')} />
                                    </View>
                                </>
                                :
                                <></>
                        }
                        {
                            type === 'drink' && item.option_available.whipping === true ?
                                <>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingStart: 5 }}>
                                        <View style={[basketStyles.smallRadiusIcon, { width: 15, height: 15, backgroundColor: 'dodgerblue' }]} />
                                        <Text>휘핑크림 추가</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', padding: 10 }}>
                                        <FlatList
                                            data={dataWhippingCream}
                                            renderItem={
                                                ({ item }) => {

                                                    const backgroundColor = item.toString()
                                                        === whippingCream ?
                                                        'dodgerblue' : 'lightgray';

                                                    const color = item.toString()
                                                        === whippingCream ?
                                                        'white' : 'black';

                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => setWhippingCream(item.toString())}
                                                            style={[basketStyles.basketThreeItem, { backgroundColor, width: 70 }]}>
                                                            <Text style={{ color }}> {item} </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            }
                                            numColumns={3}
                                            keyExtractor={(item) => item.toString()}
                                            extraData={inOrOut}
                                            scrollEnabled={false}
                                            contentContainerStyle={{ alignItems: 'center' }}
                                        />
                                    </View>
                                </>
                                :
                                <></>
                        }
                        <TouchableOpacity
                            style={[basketStyles.pushToBasket, { alignSelf: 'center', width:'100%' }]}
                            onPress={() => [handleOrder(item), pushData(count.toString()), setRefresh(true)]}>
                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign:'center' }}>장바구니담기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{ flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity
                        style={basketStyles.goToBasket}
                        onPress={() => navigation.navigate('Basket', { shopInfo: shopInfo })}
                    >
                        <Text style={[basketStyles.radiusText, { textAlign: 'center', fontSize: 15, color: 'white' }]}>장바구니 바로가기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[basketStyles.goToBasket, { backgroundColor: 'gold' }]}

                        onPress={() => [

                            totalCost > 0 ?

                                handleOrder(item) === true ?

                                    navigation.navigate('Paying',
                                        {
                                            totalCost: totalCost + item.cost,
                                            shopInfo: shopInfo
                                        }
                                    ) : {}

                                :
                                handleOrder(item) === true ?

                                    navigation.navigate('Paying',
                                        {
                                            totalCost: item.cost,
                                            shopInfo: shopInfo
                                        }
                                    ) : {}
                        ]
                        }
                    >
                        <Text style={[basketStyles.radiusText, { textAlign: 'center', fontSize: 15 }]}>바로결제 및 주문</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View
                style={basketStyles.background}>
                <Text>메뉴가 품절되었습니다.</Text>
            </View>

        )
    }
}