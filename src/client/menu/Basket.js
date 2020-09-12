import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView,
} from 'react-native';
import ImageLinker from '../../utils/ImageLinker';
import { basketStyles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MinusButton, PlusButton } from './components/CountButton';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import moment from 'moment';
import { getCafeIcon } from '../../utils/getCafeIcon';

import { enableScreens } from 'react-native-screens';

enableScreens();

export default Basket = ({ navigation, route }) => {

    const userPhoneNumber = auth().currentUser;
    var currentTime = moment().format('YYYY_MM_DD');

    const { item } = route.params;
    const { shopInfo } = route.params;
    const { type } = route.params;
    const { categoryName } = route.params;

    const dataCupSize = [
        "일반컵", "사이즈업"
    ]

    const dataInOrOut = [
        "개인용", "매장용", "일회용"
    ];

    const dataIceHot = [
        "HOT", "ICED"
    ];

    const dataWhippingCream = [
        "듬뿍", "보통", "적게"
    ];

    const [count, setCount] = useState(1);
    const [selected, setSelected] = useState(null);
    const [inOrOut, setInOrOut] = useState(null);
    const [hotOrIced, setHotOrIced] = useState(null);
    const [cupSize, setCupSize] = useState(null);

    //drink option
    const [whippingCream, setWhippingCream] = useState(null);
    const [shotNum, setShotNum] = useState(0);
    const [syrup, setSyrup] = useState(0);
    const [offers, setOffers] = useState('');
    const [steamMilk, setSteamMilk] = useState(false);
    const [waffleCream, setWaffleCream] = useState(null);
    const [waffleSyrup, setWaffleSyrup] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [optionVisible, setOptionVisible] = useState(false);

    function ChooseDetail(props) {
        const subMenu = props.subMenu;

        if (subMenu.hasOwnProperty('sub_menu')) {
            return (
                <View style={[basketStyles.basketOptionWrapper,
                {
                    flexDirection: 'column',
                    width: '100%',
                    paddingStart: 5,
                    paddingVertical: 5
                }
                ]}>
                    <Text style={
                        {
                            color: 'black',
                            fontWeight: 'bold',
                            alignSelf: 'flex-end',
                            marginTop: 5,
                            marginEnd: 5,
                            marginBottom: 5
                        }
                    }>맛 선택</Text>
                    {/* <Text style={basketStyles.chooseDetailText}>맛을 선택해주세요</Text> */}
                    <FlatList
                        data={subMenu.sub_menu}
                        renderItem={
                            ({ item }) => {

                                const backgroundColor = item.toString()
                                    === selected ?
                                    '#EEAF9D' : '#EEE';
                                const color = item.toString()
                                    === selected ?
                                    'white' : 'black';
                                const fontWeight = item.toString()
                                    === selected ?
                                    'bold' : 'normal';

                                return (
                                    <TouchableOpacity
                                        onPress={() => setSelected(item.toString())}
                                        style={[{ backgroundColor }, basketStyles.chooseDetailItem]}>
                                        <Text
                                            style={{
                                                color,
                                                fontWeight
                                            }}
                                        > {item} </Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                        keyExtractor={(item) => item.toString()}
                        extraData={selected}
                        contentContainerStyle={{ flexDirection: 'row' }}
                        scrollEnabled={true}
                        alwaysBounceVertical={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )
        } else {
            return (
                <></>
            )
        }
    }

    handleOptionCost = () => {
        var res = 0;
        //ice 값
        if (hotOrIced === "ICED")
            res += item.ice_cost;
        //샷추가
        if (shotNum > 0)
            res += 500;

        if (whippingCream !== null)
            res += 500;

        if (waffleCream !== null)
            res += 500;

        if (waffleSyrup !== null)
            res += 500;

        return res;
    }



    handleCount = (id, item, name) => {
        if (item >= 0) {
            if (id === '-') {
                if (item > 1) {
                    if (name === 'count')
                        setCount(count - 1);
                    else if (name === 'shotNum')
                        setShotNum(shotNum - 1);
                    else if (name === 'syrup')
                        setSyrup(syrup - 1);
                    else
                        console.log('ERROR : not specified object !');
                }
            }
            else {
                if (name === 'count')
                    setCount(count + 1);
                else if (name === 'shotNum')
                    setShotNum(shotNum + 1);
                else if (name === 'syrup')
                    setSyrup(syrup + 1);
                else
                    console.log('ERROR : not specified object !');
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

    sendOrder = (jsonOrderList, shopInfo, userPhoneNumber, isMoreThanOne) => {
        if (isMoreThanOne === false) {
            // 1.오너와 함께 공유하는 DB
            const orderRef = database()
                .ref('shops/' + shopInfo + '/' + currentTime + '/' + userPhoneNumber.phoneNumber)
                .push();

            orderRef
                .set(jsonOrderList)
                .then(() => console.log('Updated Shops DB'));
        }
        else {
            // 2. 사용자 전용 장바구니 개설
            const orderRef2 = database()
                .ref('user/basket/' + auth().currentUser.uid + '/' + 'group')
                .push();

            orderRef2
                .set(jsonOrderList)
                .then(() => console.log('Updated Shops DB'));
        }
    }

    handleOrder = (item) => {
        // FOR DRINKS
        if (item.ice_available !== undefined) {
            // HOT / ICED 기본적으로 설정해줌
            if (item.ice_available === false && item.only_ice === false)
                setHotOrIced('HOT');
            if (item.ice_available === true && item.only_ice === true)
                setHotOrIced('ICED');
            //TODO: 가게 정보 넣기

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
                                    return true;
                                }
                                else { //selected nothing
                                    alert('모두 선택해주세요');
                                    return false;
                                }
                            }   //if
                            else {  //sub_menu none >> 단일메뉴임
                                return true;
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
                                    return true;
                                }
                                else { //selected nothing
                                    alert('모두 선택해주세요');
                                    return false;
                                }
                            }   //if
                            else {  //sub_menu none >> 단일메뉴임
                                return true;
                            }   //else
                        }

                        else if (hotOrIced === 'ICED' && item.ice_available === true) {    //9,10
                            //sub_menu 확인
                            if (item.hasOwnProperty('sub_menu')) {
                                if (selected !== null) { //selected menu detail
                                    return true;
                                }
                                else { //selected nothing
                                    alert('모두 선택해주세요');
                                    return false;
                                }
                            }   //if

                            else {  //sub_menu none >> 단일메뉴임
                                return true;
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
        }   //if
        else {
            if (item.sold_out !== true) {
                if (inOrOut !== null)
                    return true;
                else {
                    alert('모두 선택해주세요 !');
                    return false;
                }

            }
        }
    }

    setBasicType = (hotOrIced, item) => {
        if (hotOrIced !== null) {
            return hotOrIced;
        }
        else {
            if (item.ice_available === true && item.only_ice === true)
                return "ICED";
            else if (item.ice_available === false && item.only_ice === false)
                return "HOT";

            else return null;
        }
    }


    if (item.sold_out === false) {

        var singleJsonOrderList = {
            name: item.name,
            cost: (item.cost + handleOptionCost()) * count,
            options: {
                count: count,
                cup: inOrOut,
                type: setBasicType(hotOrIced, item),
                selected: selected,
                whipping: whippingCream,
                shotNum: shotNum,
                syrup: syrup,
                waffleCream: waffleCream,
                waffleSyrup: waffleSyrup,
                offers: offers,
            },
            orderTime: moment().format('HH:mm:ss'),
            orderState: 'request',
            orderNumber: '-',
            hadPaid: 'false',
            isCanceled: false,
            shopInfo: shopInfo,
            isSet: false
            //옵션추가를 배열로 할지 고민중
        };

        var groupJsonOrderList = {
            name: item.name,
            cost: (item.cost + handleOptionCost()) * count,
            options: {
                count: count,
                cup: inOrOut,
                type: setBasicType(hotOrIced, item),
                selected: selected,
                whipping: whippingCream,
                shotNum: shotNum,
                syrup: syrup,
                waffleCream: waffleCream,
                waffleSyrup: waffleSyrup,
                offers: offers,
            },
            orderTime: moment().format('HH:mm:ss'),
            orderState: 'request',
            orderNumber: '-',
            hadPaid: 'false',
            isCanceled: false,
            shopInfo: shopInfo,
            isSet: true
            //옵션추가를 배열로 할지 고민중
        };

        return (
            <>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 22
                    }}>
                        <View style={{
                            margin: 20,
                            backgroundColor: "white",
                            borderRadius: 20,
                            padding: 35,
                            alignItems: 'center',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5
                        }}>
                            <Text style={[basketStyles.radiusText, { fontSize: 25, fontWeight: '800' }]}>주문내역확인</Text>
                            <Image
                                source={getCafeIcon(shopInfo)}
                                resizeMode='cover'
                                style={{
                                    width: 100,
                                    height: 100,
                                    alignSelf: 'flex-end',
                                    position: 'absolute',
                                    opacity: 0.3,
                                    right: 10,
                                    top: 10,
                                    transform: [{ rotate: '330deg' }]
                                }}
                            />

                            <View style={{
                                marginVertical: 50,
                                padding: 10,
                                width: 200,
                                alignItems: 'stretch'
                            }}>
                                <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '40%' }}>상품명 : </Text>
                                    <Text style={{ fontSize: 15, textAlign: 'right', width: '60%' }}>{item.name}</Text>
                                </View>
                                {
                                    selected !== null ?
                                        <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                            <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '40%' }}>세부메뉴 : </Text>
                                            <Text style={{ fontSize: 15, textAlign: 'right', width: '60%' }}>{selected}</Text>
                                        </View>
                                        :
                                        <></>

                                }
                                <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '40%' }}>가격 : </Text>
                                    <Text style={{ fontSize: 15, textAlign: 'right', width: '60%' }}>{item.cost}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '60%' }}>갯수 : </Text>
                                    <Text style={{ fontSize: 15, textAlign: 'right', width: '40%' }}>{count}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '60%' }}>테이크아웃 : </Text>
                                    <Text style={{ fontSize: 15, textAlign: 'right', width: '40%' }}>{inOrOut}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '60%' }}>추가금액 : </Text>
                                    <Text style={{ fontSize: 15, textAlign: 'right', width: '40%' }}>{handleOptionCost().toLocaleString()}원</Text>
                                </View>
                                {
                                    hotOrIced !== null ?
                                        <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                            <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '60%' }}>따뜻차갑 : </Text>
                                            <Text style={{ fontSize: 15, textAlign: 'right', width: '40%' }}>{hotOrIced}</Text>
                                        </View>
                                        :
                                        <></>
                                }
                                {
                                    offers.length > 0 ?
                                        <View style={{ flexDirection: 'column', width: '100%', marginVertical: 2 }}>
                                            <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '60%' }}>요청사항 : </Text>
                                            <Text style={{ fontSize: 15, textAlign: 'left', width: '100%', marginTop: 15, color: 'dimgray' }}>{offers}</Text>
                                        </View>
                                        :
                                        <></>
                                }
                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 15, borderTopWidth: 1, paddingTop: 15 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'left', width: '50%' }}>총 결제금액 : </Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'right', width: '50%' }}>{((item.cost + handleOptionCost()) * count).toLocaleString()}원</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <TouchableOpacity
                                    style={[basketStyles.goToBasket, { backgroundColor: 'gold', width: 100 }]}
                                    onPress={() => [
                                        sendOrder(singleJsonOrderList, shopInfo, userPhoneNumber, false),
                                        navigation.navigate('Paying', {
                                            totalCost: (item.cost + handleOptionCost()) * count,
                                            shopInfo: shopInfo,
                                            itemData: JSON.stringify(singleJsonOrderList)
                                        }),
                                        setModalVisible(!modalVisible)
                                    ]}
                                >
                                    <Text style={[basketStyles.radiusText, { textAlign: 'center', fontSize: 15 }]}>바로결제</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[basketStyles.goToBasket, { width: 100 }]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={[basketStyles.radiusText, { textAlign: 'center', fontSize: 15, color: 'white' }]}>취소하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={95}
                    style={{ backgroundColor: '#182335', flex: 1 }}
                >

                    <View style={[basketStyles.basketTopColumnWrapper, { backgroundColor: '#fff', borderBottomEndRadius: 30, borderBottomStartRadius: 30, paddingBottom: 10 }]}>
                        {/* 아이콘이랑 이름 */}
                        <ImageLinker name={item.name} style={basketStyles.radiusIcon} />
                        <Text style={basketStyles.radiusText}>{item.name}</Text>
                        <Text style={[basketStyles.radiusText, { margin: 0, fontWeight: 'normal' }]}>{item.cost}원</Text>
                        {/* 버튼 */}
                        <View style={basketStyles.basketTopColumnButtonWrapper}>
                            <MinusButton
                                style={basketStyles.amountButton}
                                onPress={() => handleCount('-', count, 'count')}
                            />
                            <Text style={basketStyles.smallRadiusText}>{count}</Text>
                            <PlusButton
                                style={basketStyles.amountButton}
                                onPress={() => handleCount('+', count, 'count')}
                            />
                        </View>
                    </View>
                    <ScrollView
                        style={{ backgroundColor: '#182335' }}
                        indicatorStyle='white'
                    >
                        <View style={basketStyles.background}>
                            <View style={basketStyles.subBackground}>
                                <View >
                                    {
                                        type === 'drink' && item.ice_available === true && item.only_ice === false ?
                                            <View style={basketStyles.basketOptionWrapper}>
                                                <FlatList
                                                    data={dataIceHot}
                                                    renderItem={
                                                        ({ item }) => {

                                                            const backgroundColor = item.toString()
                                                                === hotOrIced ?
                                                                '#EEAF9D' : '#DDD';

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
                                                    contentContainerStyle={{ alignItems: 'flex-end' }}
                                                />
                                            </View>
                                            :
                                            <></>
                                    }
                                    {/* <Text>컵을 선택해주세요.</Text> */}
                                    <View style={basketStyles.basketOptionWrapper}>
                                        <FlatList
                                            data={dataInOrOut}
                                            renderItem={
                                                ({ item }) => {

                                                    const backgroundColor = item.toString()
                                                        === inOrOut ?
                                                        '#EEAF9D' : '#DDD';

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
                                            keyExtractor={(item, index) => item.toString()}
                                            extraData={inOrOut}
                                            scrollEnabled={false}
                                            contentContainerStyle={{ alignItems: 'flex-end' }}
                                        />
                                    </View>
                                    <View style={basketStyles.basketOptionWrapper}>
                                        <FlatList
                                            data={dataCupSize}
                                            renderItem={
                                                ({ item }) => {

                                                    const backgroundColor = item.toString()
                                                        === cupSize ?
                                                        '#EEAF9D' : '#DDD';

                                                    const color = item.toString()
                                                        === cupSize ?
                                                        'white' : 'black';

                                                    return (
                                                        <TouchableOpacity
                                                            onPress={() => setCupSize(item.toString())}
                                                            style={[{ backgroundColor }, basketStyles.basketTwoItem]}>
                                                            <Text style={{ color }}> {item} </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            }
                                            numColumns={3}
                                            keyExtractor={(item, index) => item.toString()}
                                            extraData={cupSize}
                                            scrollEnabled={false}
                                            contentContainerStyle={{ alignItems: 'flex-end' }}
                                        />
                                    </View>
                                </View>
                                <ChooseDetail subMenu={item} />
                                <View style={[basketStyles.basketOptionWrapper, { flexDirection: 'column' }]}>
                                    <TouchableOpacity
                                        style={{ width: '100%', flexDirection: 'row', padding: 10 }}
                                        onPress={() => { optionVisible === false ? setOptionVisible(true) : setOptionVisible(false) }}
                                    >
                                        <Text style={{ color: '#182335', fontWeight: 'bold', textAlign: 'left', width: '80%' }}>선택사항</Text>
                                        <Text style={{ color: '#182335', fontWeight: 'bold', textAlign: 'right', width: '20%' }}>▼</Text>
                                    </TouchableOpacity>

                                    {
                                        type === 'drink' && optionVisible === true ?
                                            <>
                                                <View style={basketStyles.basketPreferOptionWrapper}>
                                                    <View style={[basketStyles.smallRadiusIcon, { width: 10, height: 10, backgroundColor: '#EEA49D' }]} />
                                                    <Text style={{ fontSize: 12, marginStart: 10 }}>에스프레소 샷 추가(+500원)</Text>
                                                </View>
                                                <View style={basketStyles.basketTopColumnButtonWrapper}>
                                                    {/* TODO: 음료마다 기본 샷이 다름 */}
                                                    <MinusButton style={basketStyles.amountButton} onPress={() => handleCount('-', shotNum, 'shotNum')} />
                                                    <Text style={{ width: 100, textAlign: 'center' }}>{shotNum}</Text>
                                                    <PlusButton style={basketStyles.amountButton} onPress={() => handleCount('+', shotNum, 'shotNum')} />
                                                </View>
                                                <Text style={{ fontSize: 11, color: 'gray', textAlign: 'center', marginBottom: 5 }}>기본에서 추가됩니다.</Text>

                                                <View style={basketStyles.basketPreferOptionWrapper}>
                                                    <View style={[basketStyles.smallRadiusIcon, { width: 10, height: 10, backgroundColor: '#EEA49D' }]} />
                                                    <Text style={{ fontSize: 12, marginStart: 10 }}>시럽 추가(+500원)</Text>
                                                </View>
                                                <View style={basketStyles.basketTopColumnButtonWrapper}>
                                                    {/* TODO: 음료마다 기본 샷이 다름 */}
                                                    <MinusButton style={basketStyles.amountButton} title='-' onPress={() => handleCount('-', syrup, 'syrup')} />
                                                    <Text style={{ width: 100, textAlign: 'center' }}>{syrup}</Text>
                                                    <PlusButton style={basketStyles.amountButton} title='+' onPress={() => handleCount('+', syrup, 'syrup')} />
                                                </View>
                                                <Text style={{ fontSize: 11, color: 'gray', textAlign: 'center', marginBottom: 5 }}>기본에서 추가됩니다.</Text>
                                                <View style={basketStyles.basketPreferOptionWrapper}>
                                                    <View style={[basketStyles.smallRadiusIcon, { width: 10, height: 10, backgroundColor: '#EEA49D' }]} />
                                                    <Text style={{ fontSize: 12, marginStart: 10 }}>휘핑크림 추가(+500원)</Text>
                                                </View>

                                                <FlatList
                                                    data={dataWhippingCream}
                                                    renderItem={
                                                        ({ item }) => {

                                                            const backgroundColor = item.toString()
                                                                === whippingCream ?
                                                                '#EEAF9D' : '#DDD';

                                                            const color = item.toString()
                                                                === whippingCream ?
                                                                'white' : 'black';

                                                            return (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        if (whippingCream == null)
                                                                            setWhippingCream(item.toString());
                                                                        else
                                                                            setWhippingCream(null);
                                                                    }}
                                                                    style={[basketStyles.basketThreeItem, { backgroundColor, width: 70 }]}>
                                                                    <Text style={{ color }}> {item} </Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    }
                                                    numColumns={3}
                                                    keyExtractor={(item, index) => item.toString()}
                                                    extraData={inOrOut}
                                                    scrollEnabled={false}
                                                    contentContainerStyle={{ alignItems: 'center' }}
                                                />

                                                <Text style={{ fontSize: 11, color: 'gray', textAlign: 'center', marginTop: 2 }}>기본에서 추가됩니다.</Text>
                                            </>
                                            :
                                            <></>
                                    }
                                    {   // 와플 크림 추가
                                        type === 'bakery' && categoryName === 'Waffle' && item.option_available.cream !== undefined ?
                                            <>
                                                <View style={basketStyles.basketPreferOptionWrapper}>
                                                    <View style={[basketStyles.smallRadiusIcon, { width: 10, height: 10, backgroundColor: '#EEA49D' }]} />
                                                    <Text style={{ fontSize: 12, marginStart: 10 }}>생크림 추가(+500원)</Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (waffleCream == null)
                                                            setWaffleCream(item.toString());
                                                        else
                                                            setWaffleCream(null);
                                                    }}
                                                    style={[
                                                        {
                                                            backgroundColor: item.toString() === waffleCream ? '#EEAF9D' : '#F2F2F2',
                                                            alignSelf: 'center'
                                                        },
                                                        basketStyles.basketTwoItem
                                                    ]}>
                                                    <Text style={{
                                                        color: item.toString() === waffleCream ? 'white' : 'black',
                                                    }}> 생크림 </Text>
                                                </TouchableOpacity>
                                            </>
                                            :
                                            <></>
                                    }
                                    {   // 와플 시럽 추가
                                        type === 'bakery' && categoryName === 'Waffle' && item.option_available.syrup !== undefined ?
                                            <>
                                                <View style={basketStyles.basketPreferOptionWrapper}>
                                                    <View style={[basketStyles.smallRadiusIcon, { width: 10, height: 10, backgroundColor: '#EEA49D' }]} />
                                                    <Text style={{ fontSize: 12, marginStart: 10 }}>시럽 추가(+500원)</Text>
                                                </View>
                                                <FlatList
                                                    style={{ marginStart: '5%', marginEnd: '5%', alignSelf: 'center' }}
                                                    data={item.option_available.syrup}
                                                    renderItem={
                                                        ({ item }) => {
                                                            const backgroundColor = item.toString()
                                                                === waffleSyrup ?
                                                                '#EEAF9D' : '#F2F2F2';

                                                            const color = item.toString()
                                                                === waffleSyrup ?
                                                                'white' : 'black';

                                                            return (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        if (waffleSyrup === null)
                                                                            setWaffleSyrup(item.toString())
                                                                        else
                                                                            setWaffleSyrup(null);
                                                                    }}
                                                                    style={[
                                                                        { backgroundColor },
                                                                        basketStyles.basketThreeItem
                                                                    ]}>
                                                                    <Text style={{ color }}> {item} </Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    }
                                                    numColumns={3}
                                                    keyExtractor={(item, index) => item.key}
                                                    extraData={waffleSyrup}
                                                    scrollEnabled={false}
                                                />
                                            </>
                                            :
                                            <></>
                                    }
                                    <>
                                        <View style={basketStyles.basketPreferOptionWrapper}>
                                            <View style={[basketStyles.smallRadiusIcon, { width: 10, height: 10, backgroundColor: '#EEA49D' }]} />
                                            <Text style={{ fontSize: 12, marginStart: 10 }}>요청사항 (15자이내)</Text>
                                        </View>

                                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                            <TextInput
                                                style={basketStyles.offerLayout}
                                                onChangeText={(text) => setOffers(text)}
                                                placeholder="간단하게 요청사항을 적어주세요 ~"
                                                returnKeyType='done'
                                            />
                                        </TouchableWithoutFeedback>

                                    </>
                                </View>
                                <TouchableOpacity
                                    style={[basketStyles.pushToBasket, { alignSelf: 'center' }]}
                                    onPress={() => handleOrder(item) === true ? [sendOrder(groupJsonOrderList, shopInfo, userPhoneNumber, true), alert('담겼습니다!')] : alert('ERROR !')}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>장바구니담기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View
                    style={
                        {
                            flexDirection: 'row',
                            paddingBottom: '5%',
                            justifyContent: 'center',
                            backgroundColor: '#182335',
                            width: '100%'
                        }
                    }>
                    <TouchableOpacity
                        style={basketStyles.goToBasket}
                        onPress={() => navigation.navigate('Basket', { shopInfo: shopInfo })}
                    >
                        <Text style={[basketStyles.radiusText, { textAlign: 'center', fontSize: 15, color: 'white' }]}>장바구니 바로가기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[basketStyles.goToBasket, { backgroundColor: 'gold' }]}
                        onPress={() => handleOrder(item) === true ? setModalVisible(true) : setModalVisible(false)}
                    >
                        <Text style={[basketStyles.radiusText, { textAlign: 'center', fontSize: 15 }]}>바로결제 및 주문</Text>
                    </TouchableOpacity>

                </View>
            </>
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