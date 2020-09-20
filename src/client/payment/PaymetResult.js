import React from 'react';
import {
    View,
    Text,
    Vibration,
    ScrollView,
    Alert,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { paymentStyles } from './styles';
import database, { firebase } from '@react-native-firebase/database';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import { commonRef, userHistoryRef, orderNumDatabase } from '../../utils/DatabaseRef.js';
import { getCafeIcon } from '../../utils/getCafeIcon';
import Loading from './Loading';

//승환 : 가게별 주문 번호 증가
async function updateCurrentOrderNumber(shopInfo) {

    var res = 0;

    await database().ref('order_num/' + shopInfo)
        .once('value', (snapshot) => {
            snapshot.forEach((childSnapShot) => {
                console.log('Kakaopay ... ' + childSnapShot.val(), typeof childSnapShot.val());
                res = childSnapShot.val();
            })
        });

    if (res === 999)
        await database().ref('order_num/' + shopInfo).update({ number: 1 });
    else {
        res += 1;
        console.log('> res : ' + res);
        await database().ref('order_num/' + shopInfo).update({ number: res });
    }
}

async function updateUserHistroy(data, orderNumber, isGroup) {

    if (isGroup === false) {
        // 2.사용자 History
        const userRef = database()
            .ref(userHistoryRef())
            .push();

        userRef
            .set(data)
            .then(() => console.log('Updated User History'));
    }
    else { // 장바구니로 구매한 경우
        // 2.사용자 History
        const userRef = database()
            .ref(userHistoryRef() + '/' + orderNumber)
            .push();

        userRef
            .set(data)
            .then(() => console.log('Updated User History'));
    }


}

export default class PaymentResult extends React.Component {

    _firebaseRef;
    _currentOrderRef;
    orderNum;

    constructor(props) {
        super(props);

        console.log('constructor >> ' + this.props.route.params.shopInfo);

        this.state = {
            isMenuReady: false,
            orderState: [],
            timeArray: {
                paid: '',
                request: '',
                confirm: '',
                ready: ''
            },
            data: [],
            basket: [],
            currentOrderNumber: '',
            isUpdated: false,
            isLoading: true
        }

        this._firebaseRef = database().ref(commonRef(this.props.route.params.shopInfo));
        this._currentOrderRef = orderNumDatabase(this.props.route.params.shopInfo);
        this.state.timeArray.request = this.props.route.params.requestTime;
    }

    componentDidMount = async () => {
        console.log('componentDidMount');

        setTimeout(() => { this.setState({ isLoading: false }) }, 1000);

        if (this.props.route.params.response.imp_success === 'true' && this.state.isUpdated === false) {

            var data = JSON.parse(this.props.route.params.itemData); // 넣을 data
            console.log(this.props.route.params.itemData + '\n\n\n\n\n' + this.props.route.params.itemData.length, data.hasOwnProperty('options'));
            // 디비에 주문번호 업데이트하기
            // 1. 단일메뉴일 경우
            if (data.hasOwnProperty('options')) {
                //주문번호 업데이트
                var key = '';

                database()
                    .ref(commonRef(this.props.route.params.shopInfo))
                    .once('value', (snapshot) => {
                        snapshot.forEach((child) => {
                            if (child.key.charAt(0) === '-')
                                key = child.key;  //key updated
                        });
                    }).then(() => {
                        console.log("... " + key);

                        var res = 'A-';
                        // 현재 주문번호 가져오기
                        orderNumDatabase(this.props.route.params.shopInfo)
                            .once('value', (snapshot) => {
                                //console.log('[Bakset] >> ' + shopInfo + '\t' + snapshot.val().number);
                                res += snapshot.val().number;
                                // this.setState({ currentOrderNumber : res });
                            }).then(() => {
                                console.log('>  ' + res);
                                //update common DB
                                var updateOrderInfo = database().ref(commonRef(this.props.route.params.shopInfo) + '/' + key + '/orderInfo');
                                updateOrderInfo.update({ orderNumber: res });

                                //get data
                                database()
                                    .ref(commonRef(this.props.route.params.shopInfo) + '/' + key)
                                    .once('value', (snapshot) => {
                                        updateUserHistroy(snapshot.val(), res, false);
                                    });
                            })
                    });
            }
            // 2. 장바구니일 경우
            else {
                //group 버킷 안에 있음 { group : { autokey : {-}, autokey : {-}, ... } } 우리가 바꿔줄거는 group이름을 주문번호로 ! >> 안될듯
                console.log('> init group ####')
                var res = 'A-';
                // 현재 주문번호 가져오기
                orderNumDatabase(this.props.route.params.shopInfo)
                    .once('value', (snapshot) => {
                        //console.log('[Bakset] >> ' + shopInfo + '\t' + snapshot.val().number);
                        res += snapshot.val().number;
                        // this.setState({ currentOrderNumber : res });
                    }).then(() => {
                        //data 수정
                        for (var i = 0; i < data.length; ++i) {
                            if (data[i].orderInfo.orderNumber === '-') {
                                data[i].orderInfo.orderNumber = res;
                            }
                        }
                        // 공통 DB 작업 중
                        database()
                            .ref(commonRef(this.props.route.params.shopInfo) + '/group')
                            .once('value', (snapshot) => {
                                snapshot.forEach((childData, index) => {
                                    console.log('> ref : \n' + commonRef(this.props.route.params.shopInfo) + '/group/' + index + '/orderInfo');
                                    //주문번호 업데이트 : 공통 DB
                                    database()
                                        .ref(commonRef(this.props.route.params.shopInfo) + '/group/' + index + '/orderInfo')
                                        .update({ orderNumber: res });
                                })
                            });
                        updateUserHistroy(data, res, true);
                    })
            }   // else

            // 주문번호 업데이트하기
            updateCurrentOrderNumber(this.props.route.params.shopInfo);
            this.setState({ isUpdated: true });
        }

        this._isMenuReady();
    }

    componentWillUnmount() {
        console.log('componentWillUnmout');
        this._firebaseRef.off();
        this._currentOrderRef.off();
        // this.setState({ isMenuReady : false });
    }


    _isMenuReady() {
        this._firebaseRef
            .on('value', (snapshot) => {
                //init
                this.setState({ orderState: [], isMenuReady: false, data: [] });
                var idx = 0;
                snapshot.forEach((childSnapShot) => {

                    if (childSnapShot.key.charAt(0) === '-') {  // 단일 주문 건
                        var tempJSONObject = {
                            key: childSnapShot.key,
                            name: childSnapShot.val().name,
                            cost: childSnapShot.val().cost,
                            options: childSnapShot.val().options,
                            orderInfo: childSnapShot.val().orderInfo
                        };
                        if (idx === 0) this.state.timeArray.paid = childSnapShot.val().orderInfo.orderTime;
                        //주문정보담기
                        this.setState({
                            orderState: this.state.orderState.concat(childSnapShot.val().orderInfo.orderState),
                            data: this.state.data.concat(tempJSONObject),
                        });
                        idx++;
                    }
                    else {  // 장바구니 주문 건
                        childSnapShot.forEach((dataChild) => {
                            var tempJSONObject = {
                                key: dataChild.key,
                                name: dataChild.val().name,
                                cost: dataChild.val().cost,
                                options: dataChild.val().options,
                                orderInfo: dataChild.val().orderInfo
                            };
                            if (idx === 0) this.state.timeArray.paid = dataChild.val().orderInfo.orderTime;
                            //주문정보담기
                            this.setState({
                                orderState: this.state.orderState.concat(dataChild.val().orderInfo.orderState),
                                data: this.state.data.concat(tempJSONObject),
                            });
                            idx++;
                        })
                    }


                })

                var isFullyReady = 0;

                for (var i = 0; i < this.state.orderState.length; ++i) {
                    if (this.state.orderState[i] === 'ready') {
                        this.state.timeArray.ready = moment().format('HH:mm:ss');
                        isFullyReady++;

                    }
                    else if (this.state.orderState[i] === 'cancel') {
                        // DB update 해야함
                        // isCanceled --> true
                        if (!this.state.data[i].orderInfo.isSet) { // single menu
                            var ukey = '';
                            //get key
                            database()
                                .ref(userHistoryRef())
                                .once('value', snapshot => {
                                    ukey = snapshot.key;
                                }).then(() => { // update
                                    database()
                                        .ref(userHistoryRef() + '/' + ukey + '/orderInfo')
                                        .update({ isCanceled: true });

                                    alert('카운터로 와주세요 :)');
                                });
                        } else { // group menu
                            var okey = '';
                            var ukey = '';
                            //get key
                            database()
                                .ref(userHistoryRef())
                                .once('value', snapshot => {
                                    snapshot.forEach(childSnapShot => {
                                        okey = childSnapShot.key;
                                        childSnapShot.forEach(data => {
                                            ukey = data.key;
                                        })
                                    })
                                }).then(() => {
                                    database()
                                        .ref(userHistoryRef() + '/' + okey + '/' + ukey + '/' + i + '/orderInfo')
                                        .update({ isCanceled: true });

                                    alert('카운터로 와주세요 :)');
                                })
                        }
                    }
                    else if (this.state.orderState[i] === 'confirm') {
                        this.state.timeArray.confirm = moment().format('HH:mm:ss');
                        database().ref('user/coupons' + '/' + auth().currentUser.uid).push({
                            "shopInfo": this.props.route.params.shopInfo
                        });
                    }
                    else {
                        if (isFullyReady > 0) isFullyReady--;
                    }
                    // isCanceled 추가 하기 객체에
                }
                if (isFullyReady === this.state.orderState.length && isFullyReady > 0) {
                    this.setState({ isMenuReady: true });
                }

                console.log('\norderState >>' + this.state.orderState.length + '\n' + this.state.orderState);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        }
        else {
            console.log('render');
            if (this.props.route.params.response.imp_success === 'true') {

                if (this.state.isMenuReady === true) {

                    console.log('menu ready !');
                    Alert.alert(
                        'DGHTRU 알림', '메뉴가 준비되었습니다 ! 얼른 가져가세요.',
                        [
                            {
                                text: '확인',
                                // onPress: () => [ Vibration.cancel(), this.props.navigation.pop(), this.props.navigation.navigate('Shops') ]
                                onPress: () =>
                                    [
                                        Vibration.cancel(), this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
                                    ]
                            }
                        ]
                    );
                    Vibration.vibrate([1000, 1000, 1000], true);
                }

                return (
                    <View style={{ flex: 1, backgroundColor: '#eeaf9d' }}>
                        <View style={{}}>
                            <Image
                                style={[paymentStyles.loadingGif, { alignSelf: 'center' }]}
                                source={require('../../../image/sample.gif')} />
                        </View>
                        <ScrollView
                            style={{ backgroundColor: '#eeaf9d' }}
                        >
                            <View style={paymentStyles.background}>

                                <FlatList
                                    data={this.state.data}
                                    renderItem={
                                        ({ item }) => (
                                            <View style={paymentStyles.orderWrapper}>
                                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                                                    <Text style={{ fontSize: 14, }}> / {item.orderInfo.orderNumber}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginVertical: 2, width: '100%' }}>
                                                    <Text style={{ color: 'gray', fontSize: 14 }}>{item.options.type} / </Text>
                                                    {
                                                        item.options.selected !== undefined ? <Text style={{ color: 'gray', fontSize: 14 }}>{item.options.selected} / </Text> : <></>
                                                    }
                                                    <Text style={{ color: 'gray', fontSize: 12 }}>{item.options.cup} / </Text>
                                                    <Text style={{ color: 'gray', fontSize: 12 }}>{item.cost}원 / </Text>
                                                    <Text style={{ color: 'gray', fontSize: 12 }}>{item.options.count}개 </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginVertical: 1, width: '100%' }}>
                                                    {
                                                        item.options.shotNum !== undefined ? <Text style={{ color: 'gray', fontSize: 12 }}>샷 추가 : {item.options.shotNum} / </Text> : <></>
                                                    }
                                                    {
                                                        item.options.syrup !== undefined ? <Text style={{ color: 'gray', fontSize: 12 }}>시럽 추가 : {item.options.syrup} / </Text> : <></>
                                                    }
                                                    {
                                                        item.options.whipping !== undefined ? <Text style={{ color: 'gray', fontSize: 12 }}>휘핑크림 : {item.options.whipping} / </Text> : <></>
                                                    }
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 3, width: '100%' }}>
                                                    {
                                                        item.options.offers.length > 0 ? <Text style={{ color: 'gray', fontSize: 12 }}>요청사항 : {item.options.offers}</Text> : <></>
                                                    }
                                                </View>
                                            </View>
                                        )
                                    }
                                    keyExtractor={(item, index) => item.key}
                                />

                                <Image
                                    source={getCafeIcon(this.props.route.params.shopInfo)}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        position: 'absolute',
                                        right: '5%',
                                        top: '5%',
                                        transform: [{ rotate: '330deg' }],
                                    }}
                                />

                            </View>
                        </ScrollView>
                        <View style={
                            {
                                backgroundColor: '#182335',
                                width: '95%',
                                borderTopStartRadius: 30,
                                borderTopEndRadius: 30,
                                alignSelf: 'center',
                                padding: 20,
                                shadowColor: "#333",
                                shadowOffset: {
                                    width: 1,
                                    height: 1
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                            }
                        }>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 20, color: '#fff' }}>결제정보</Text>
                            <View style={{ paddingStart: 20, marginVertical: 20 }}>
                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>결제완료{'\t\t'}</Text>
                                    <Text style={{ color: '#fff' }}>{this.state.timeArray.paid}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>주문요청{'\t\t'}</Text>
                                    <Text style={{ color: '#fff' }}>{this.state.timeArray.request}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>주문승인{'\t\t'}</Text>
                                    <Text style={{ color: '#fff' }}>관리자에게</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>준비완료{'\t\t'}</Text>
                                    <Text style={{ color: '#fff' }}>관리자에게</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                    marginTop: 5,
                                    shadowColor: "#333",
                                    shadowOffset: {
                                        width: 1,
                                        height: 1
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 1
                                }}
                                onPress={() => [
                                    this.props.navigation.pop(),
                                    this.props.navigation.navigate('Shops')
                                ]}
                            >
                                <Text style={{ color: '#182335', fontWeight: 'bold', textAlign: 'center' }}>홈으로 돌아가기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={paymentStyles.background}>
                        <Text style={paymentStyles.notifyText}>결제 실패{'\n'}관리자에게 문의하세요.</Text>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                backgroundColor: '#020659',
                                borderRadius: 10,
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                marginTop: 5
                            }}
                            onPress={() => [this.props.navigation.pop(), this.props.navigation.navigate('Shops')]}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>홈으로 돌아가기</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

}