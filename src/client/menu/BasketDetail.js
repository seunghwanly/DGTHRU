import React from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    ScrollView,
    TouchableOpacity,
    FlatList,
    StatusBar
} from 'react-native';
import { basketStyles } from './styles';
import ImageLinker from '../../utils/ImageLinker';

//Firebase Ref
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { handleDeleteOrder, handleOrder } from '../../utils/DatabaseRef';

import { enableScreens } from 'react-native-screens';
enableScreens();

export default class BasketDetail extends React.Component {

    _firebaseCommonDatabase;

    constructor(props) {
        super(props);

        this.state = {
            orderData: [],
            propsData: [],
            needRefresh: false,
            chooseCoupon: null,
            totalCost: 0,
            couponNum: 0

        }

        this._firebaseCommonDatabase = database().ref('user/basket/' + auth().currentUser.uid + '/' + 'group');
    };

    componentDidMount() {
        this.fetchData();
        this.chosenCoupon();
    }

    shouldComponentUpdate(nextState) {
        return this.state.orderData !== nextState.orderData;
    }

    componentWillUnmount() {
        this._firebaseCommonDatabase.off();
    }

    fetchData() {

            var i = 0;
            database().ref('user/coupons' + '/' + auth().currentUser.uid).once('value').then(snapshot => {
                snapshot.forEach((childSnapshot) => {
                    i++;
                    this.setState({ couponNum: i });
                });
            });
        

        this._firebaseCommonDatabase
            .on('value', (snapshot) => {

                var tempOrderJSONArray = [];
                var tempPropsJSONArray = [];
                var totalCostforSave = 0;
                this.setState({ orderData: [], propsData: [] })   //상태가 바뀌어야 화면이 reload되는데 이게 지금은 최선임

                var idx = 0;    // loop

                snapshot.forEach((childSnapShot) => {

                    var tempJSON = {
                        "idx": idx,
                        "key": childSnapShot.key,
                        "value": childSnapShot.val()
                    };

                    totalCostforSave += Number(childSnapShot.val().cost) * Number(childSnapShot.val().options.count);

                    idx++;

                    tempOrderJSONArray.push(tempJSON);
                    tempPropsJSONArray.push(childSnapShot.val());
                })
                this.setState({
                    orderData: tempOrderJSONArray,
                    propsData: tempPropsJSONArray,
                    totalCost: totalCostforSave
                });
            })
    }

    chosenCoupon = (name, _totalCost) => {
        if (name === '10잔') { // 10잔 짜리
            console.log('10 cups');
            if(this.state.couponNum < 10){
                alert(10 - this.state.couponNum + "개 더 모아야 해요");
            }
            else{
            this.setState({
                totalCost: _totalCost - 2000,
                chooseCoupon: name,
            });
        }
        } else if (name === '15잔') {  // 15잔 짜리
            console.log('15 cups');
            if(this.state.couponNum < 15){
                alert(15 - this.state.couponNum + "개 더 모아야 해요");
            }
            else{
            this.setState({
                totalCost: _totalCost - 2600,
                chooseCoupon: name
            });
        }
        } else { // 쿠폰없음
            console.log('no coupons');
            this.setState({
                totalCost: _totalCost,
                chooseCoupon: name
            });
        }
    }

    updateAndSendData(shopInfo) {
        //set data fixed
        if (this.state.chooseCoupon !== null) {
            if (this.state.chooseCoupon === '10잔') {
                this.state.propsData[0].cost -= 2000;
                this.state.propsData[0].options.coupon = this.state.chooseCoupon;
            }
            else if (this.state.chooseCoupon === '15잔') {
                this.state.propsData[0].cost -= 2600;
                this.state.propsData[0].options.coupon = this.state.chooseCoupon;
            }
        }

        this.props.navigation.navigate('Paying',
            {
                totalCost: this.state.totalCost >= 0 ? this.state.totalCost : 0,
                quantity: this.state.orderData.length,
                shopInfo: shopInfo,
                itemData: JSON.stringify(this.state.propsData),
                coupon: this.state.chooseCoupon
            }
        );
    }

    render() {

        // console.log('\n\n> BasketDetail : ' + JSON.stringify(this.state.orderData));
        // total cost
        var _totalCost = 0;
        this.state.orderData.map(item => {
            _totalCost += Number(item.value.cost) * Number(item.value.options.count);
        });
        console.log('> basketdetail totalcost : ' + _totalCost);

        // is items are in same shops?
        var sameShopInfo = '';
        var isSameshop = false;
        console.log('> render : ' + this.state.orderData.length);
        if (this.state.orderData.length >= 2) {
            for (var i = 0; i < this.state.orderData.length; i++) {
                if (i + 1 < this.state.orderData.length) {
                    if (this.state.orderData[i].value.orderInfo.shopInfo === this.state.orderData[i + 1].value.orderInfo.shopInfo) {
                        sameShopInfo = this.state.orderData[i].value.orderInfo.shopInfo;
                        console.log('> basketDetail : ' + this.state.orderData[i].value.orderInfo.shopInfo);
                        isSameshop = true;
                    }
                    else
                        isSameshop = false;
                }
            }

        }
        else {
            isSameshop = true;
            this.state.orderData.forEach(item => {
                sameShopInfo = item.value.orderInfo.shopInfo;
            })
        }


        if (this.state.orderData.length > 0) {
            return (
                <>
                    <StatusBar barStyle='light-content' />

                    <View style={[basketStyles.background, { backgroundColor: '#182335' }]}>
                        <ScrollView>
                            <View style={[basketStyles.subBackground, {}]}>
                                {
                                    this.state.orderData.map(item => {
                                        //key 값 부여하기 !
                                        return (
                                            <View style={basketStyles.detailWrapper}>
                                                <ImageLinker name={item.value.orderInfo.shopInfo} style={[basketStyles.smallRadiusIcon, { alignSelf: 'center' }]} />
                                                <View style={{ padding: 5 }}>
                                                    <View style={[basketStyles.detailItemNameWrapper, {}]}>
                                                        <ImageLinker name={item.value.name} style={[basketStyles.smallRadiusIcon]} />
                                                        <Text style={basketStyles.smallRadiusText}> {item.value.name} {item.value.options.selected !== undefined ? ', ' + item.value.options.selected : ' '}</Text>
                                                    </View>
                                                    <View style={{ paddingStart: 5 }}>
                                                        <View style={{ flexDirection: "row", width: 200 }}>
                                                            <Text style={{ fontSize: 12, fontWeight: '600' }}>{item.value.options.cup} / </Text>
                                                            <Text style={{ fontSize: 12, fontWeight: '600' }}>{item.value.options.type} / </Text>
                                                            <Text style={{ fontSize: 12, fontWeight: '600' }}>{item.value.options.size} </Text>
                                                        </View>
                                                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 4 }}>추가사항 </Text>
                                                        <View style={{ flexDirection: "row", width: 200 }}>
                                                            <Text style={{ fontSize: 10 }}>샷 추가 : {item.value.options.shotNum} / </Text>
                                                            <Text style={{ fontSize: 10 }}>시럽 추가 : {item.value.options.syrup} / </Text>
                                                            <Text style={{ fontSize: 10 }}>휘핑크림 추가 : {item.value.options.whipping > 0 ? item.value.options.whipping : 0} </Text>
                                                        </View>
                                                        <Text style={{ fontSize: 10, fontWeight: 'bold', marginTop: 4 }}>추가금액 </Text>
                                                        <View style={{ flexDirection: "row", width: 200 }}>
                                                            <Text style={{ fontSize: 10 }}>{item.value.options.addedCost}원</Text>
                                                        </View>
                                                        {
                                                            item.value.options.offers.length > 0 ?
                                                                <Text style={{ fontSize: 10 }}>요청사항 : {item.value.options.offers} </Text>
                                                                :
                                                                <></>
                                                        }
                                                    </View>
                                                </View>
                                                <View style={basketStyles.detailItemInfoWrapper}>
                                                    <Text style={{ fontSize: 12, marginVertical: 2 }}>{item.value.options.count}개</Text>
                                                    <Text style={{ fontSize: 12, marginVertical: 2, fontWeight: '600' }}>{(Number(item.value.cost) * Number(item.value.options.count)).toLocaleString()}원</Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={basketStyles.detailImgButton}
                                                    onPress={() => {
                                                        Alert.alert(
                                                            'DGTHRU 알림', '삭제하시겠습니까 ?',
                                                            [
                                                                {
                                                                    text: '삭제',
                                                                    onPress: () => handleDeleteOrder(item.key, true)
                                                                },
                                                                {
                                                                    text: '취소', onPress: () => console.log('cancel delete'), style: "cancel"
                                                                }
                                                            ]
                                                        )
                                                    }}>
                                                    <Image
                                                        style={{ width: 20, height: 20 }}
                                                        resizeMode='cover'
                                                        source={require('../../../image/trash-outline.png')}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                        <View style={
                            {
                                borderTopStartRadius: 30,
                                borderTopEndRadius: 30,
                                borderTopColor: 'gray',
                                paddingTop: 20,
                                alignItems: 'center',
                                backgroundColor: '#fff'
                            }
                        }>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 25, }} >
                                <View style={[basketStyles.basketOptionDesc, { width: '40%', paddingStart: 0 }]}>
                                    <Text style={{ color: '#182335', fontWeight: 'bold', marginBottom: 5 }}>쿠폰선택</Text>
                                    <Text style={{ fontWeight: '400', fontSize: 10, color: 'gray' }}>모으신 쿠폰에 따라{'\n'}적용되는 할인이 다릅니다.</Text>
                                </View>
                                <FlatList
                                    data={['적용안함', '10잔', '15잔']}
                                    keyExtractor={item => item.key}
                                    horizontal={true}
                                    scrollEnabled={false}
                                    renderItem={({ item, index }) => {

                                        const backgroundColor = item.toString()
                                            === this.state.chooseCoupon ?
                                            '#EEAF9D' : '#F2F2F2';

                                        const color = item.toString()
                                            === this.state.chooseCoupon ?
                                            'white' : 'black';
                                        return (

                                            <TouchableOpacity
                                                style={[basketStyles.basketThreeItem, { backgroundColor }]}
                                                onPress={() => this.chosenCoupon(item, _totalCost)}
                                            >
                                                <Text style={[{ fontSize: 12, textAlign: 'center' }, color]}>
                                                    {
                                                        index === 0 ? item : item + '\n적용하기'
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                            <View style={basketStyles.detailTotalInfoWrapper}>
                                <Text style={[basketStyles.smallRadiusText, { textAlign: 'left', width: '60%' }]}>TOTAL</Text>
                                <Text style={[basketStyles.smallRadiusText, { textAlign: 'right', width: '30%' }]}>
                                    {
                                        this.state.totalCost === 0 ? _totalCost.toLocaleString() : this.state.totalCost.toLocaleString()
                                    }원
                            </Text>
                            </View>

                            <TouchableOpacity
                                style={basketStyles.goToPayment}
                                onPress={() => {
                                    isSameshop === true ?
                                        Alert.alert("DGTHRU 알림", "결제하시겠습니까?",
                                            [
                                                {
                                                    text: '취소', onPress: () => console.log('canceled order')
                                                },
                                                {
                                                    text: '확인', onPress: () =>
                                                        [
                                                            this.updateAndSendData(sameShopInfo)
                                                            ,
                                                            //pop and push
                                                            handleOrder(sameShopInfo, this.state.propsData, true)
                                                        ]
                                                }
                                            ])
                                        :
                                        Alert.alert("DGTHRU 알림", "같은 카페의 제품만 담아주세요!", [{ text: '확인', onPress: () => console.log('> set of diff shopInfo'), style: 'cancel' }])
                                }
                                }
                            >
                                <Text style={[basketStyles.smallRadiusText, { textAlign: 'center', fontSize: 18 }]}>카카오페이로 결제하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            );
        } //if
        else {
            return (
                <View style={[basketStyles.background, { backgroundColor: '#182335' }]}>
                    <Text style={{ color: '#fff' }}>장바구니가 비어있어요 !</Text>
                </View>
            );
        }
    }
}
