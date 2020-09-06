import React from 'react';
import {
    View,
    Text,
    Button,
    Vibration,
    ScrollView,
    Dimensions,
    Alert,
    Image,
    FlatList
} from 'react-native';
import { paymentStyles } from './styles';
import database from '@react-native-firebase/database';
import { commonRef } from '../../utils/DatabaseRef.js';
import { getCafeIcon } from '../../utils/getCafeIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

var currDate = moment().format('YYYY_MM_DD');

async function sendOrderWithOrdernum(orderList, shopInfo, num){
    const orderRef = database()
        .ref('with_order_num/' + shopInfo + '/' + currDate + '/' + auth().currentUser.phoneNumber + '/' + num)
        .push();

    orderRef
        .set(orderList)
        .then(() => alert('주문번호 : ' + num + '번'));
}

async function setOrderNumber(num) {
    if(num === 999){
        database().ref('order_num/').update({number : 1});
    }
    else{
        database().ref('order_num/').update({number : num + 1});
    }
}

export default class PaymentResult extends React.Component {

    _firebaseRef;
    orderNum;

    constructor(props) {
        super(props);

        console.log('constructor >> ');

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
            
        }

        this._firebaseRef = database().ref(commonRef(this.props.route.params.shopInfo));
        this.state.timeArray.request = this.props.route.params.requestTime;
    }

    componentDidMount() {
        console.log('componentDidMount');

        database().ref('order_num/').on('value', (snapshot) => {
            this.orderNum = snapshot.val().number;
        });

        this._firebaseRef
            .on('value', (snapshot) => {

                //init
                this.setState({ orderState: [], isMenuReady: false });
                var idx = 0;
                var li = [];
                snapshot.forEach((childSnapShot) => {
                    var tempJSONObject = {
                        name: childSnapShot.val().name,
                        cost: childSnapShot.val().cost,
                        count: childSnapShot.val().count,
                        cup: childSnapShot.val().cup,
                        orderTime: childSnapShot.val().orderTime,
                        shotNum: childSnapShot.val().shotNum,
                        type: childSnapShot.val().type
                    };
                    if (idx === 0) this.state.timeArray.paid = childSnapShot.val().orderTime;
                    //주문정보담기
                    this.setState({
                        orderState: this.state.orderState.concat(childSnapShot.val().orderState),
                        data: this.state.data.concat(tempJSONObject),
                    });
                    idx++;
                    li.push(tempJSONObject);
                        
                    
                })
                this.setState({basket:li});


                var isFullyReady = 0;
                for (var i = 0; i < this.state.orderState.length; ++i) {
                    if (this.state.orderState[i] === 'ready') isFullyReady++;
                    else {
                        if (isFullyReady > 0) isFullyReady--;
                    }
                }
                if (isFullyReady === this.state.orderState.length && isFullyReady > 0) {
                    this.setState({ isMenuReady: true });
                }

                console.log('\norderState >>' + this.state.orderState.length + '\n' + this.state.orderState);
            });
    }
    

    componentWillUnmount() {
        console.log('componentWillUnmout');
        this._firebaseRef.off();
        // this.setState({ isMenuReady : false });
    }

    countProperties(obj) {
        var count = 0;

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                ++count;
        }

        return count;
    }

    

    render() {
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
                <ScrollView>
                    <View style={{backgroundColor:'white'}}>
                    <Image
                        style={[paymentStyles.loadingGif, {alignSelf:'center'}]}
                        source={require('../../../image/sample.gif')} />
                    </View>
                    <View style={paymentStyles.background}>
                        <View style={{
                            backgroundColor: '#F6F6F6',
                            padding: 30,
                            width: '100%',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            marginVertical: 5
                        }}>
                            <FlatList
                                data={this.state.data}
                                renderItem={
                                    ({ item }) => (
                                        <>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                                                <Text style={{ fonsSize: 14, }}> / A-12</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                                <Text style={{ color: 'gray', fontSize: 14 }}>{item.type} / </Text>
                                                <Text style={{ color: 'gray', fontSize: 14 }}>{item.cup} / </Text>
                                                <Text style={{ color: 'gray', fontSize: 14 }}>{item.cost}원 / </Text>
                                                <Text style={{ color: 'gray', fontSize: 14 }}>{item.count}개 </Text>
                                                {
                                                    item.offers !== null ? <Text style={{ color: 'gray', fontSize: 14 }}>{item.offers}</Text> : <></>
                                                }
                                            </View>
                                        </>
                                    )
                                }
                            />
                        </View>

                        <View style={{
                            backgroundColor: '#F6F6F6',
                            padding: 30,
                            width: '100%',
                            marginVertical: 5,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'lightgray'
                        }}>
                            <View>
                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                    <Text style={{ fontWeight: 'bold' }}>결제완료{'\t\t'}</Text>
                                    <Text>{this.state.timeArray.paid}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                    <Text style={{ fontWeight: 'bold' }}>주문요청{'\t\t'}</Text>
                                    <Text>{this.state.timeArray.request}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                    <Text style={{ fontWeight: 'bold' }}>주문승인{'\t\t'}</Text>
                                    <Text>관리자에게</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                                    <Text style={{ fontWeight: 'bold' }}>준비완료{'\t\t'}</Text>
                                    <Text>관리자에게</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                backgroundColor: '#020659',
                                borderRadius: 10,
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                marginTop: 5
                            }}
                            onPress={() => [
                                sendOrderWithOrdernum(this.state.basket, this.props.route.params.shopInfo, this.orderNum),
                                setOrderNumber(this.orderNum),
                                this.props.navigation.pop(), 
                                this.props.navigation.navigate('Shops')
                            ]}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>홈으로 돌아가기</Text>
                        </TouchableOpacity>
                        <Image
                            source={getCafeIcon(this.props.route.params.shopInfo)}
                            style={{
                                width: 60,
                                height: 60,
                                position: 'absolute',
                                right: '8%',
                                top: '40%',
                                transform: [{ rotate: '330deg' }],

                            }}
                        />
                        
                    </View>
                </ScrollView>
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