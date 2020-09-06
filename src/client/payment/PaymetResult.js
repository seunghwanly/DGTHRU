import React from 'react';
import {
    View,
    Text,
    Button,
    Vibration,
    Alert,
    Image
} from 'react-native';
import { paymentStyles } from './styles';
import database from '@react-native-firebase/database';
import { commonRef } from '../../utils/DatabaseRef.js';


export default class PaymentResult extends React.Component {

    _firebaseRef;

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
            data: {}
        }

        this._firebaseRef = database().ref(commonRef(this.props.route.params.shopInfo));
    }

    componentDidMount() {
        console.log('componentDidMount');

        this._firebaseRef
            .on('value', (snapshot) => {

                //init
                this.setState({ orderState: [], isMenuReady: false });

                snapshot.forEach((childSnapShot) => {
                    //주문정보담기
                    this.setState({
                        orderState: this.state.orderState.concat(childSnapShot.val().orderState),
                        data: childSnapShot.val()
                    });
                })

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
        console.log('render >> ');
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
                <View style={paymentStyles.background}>
                    <Image
                        style={paymentStyles.loadingGif}
                        source={require('../../../image/sample.gif')} />
                    <Text style={paymentStyles.notifyText}>메뉴가 준비되면 알려드리겠습니다 !</Text>
                    <View style={{ backgroundColor: 'ivory', padding:30 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.data.name}</Text>
                            <Text style={{ fonsSize: 14, }}>A-12</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'gray', fontSize: 14 }}>{this.state.data.type} / </Text>
                            <Text style={{ color: 'gray', fontSize: 14 }}>{this.state.data.cup} / </Text>
                            <Text style={{ color: 'gray', fontSize: 14 }}>{this.state.data.cost}원 / </Text>
                            <Text style={{ color: 'gray', fontSize: 14 }}>{this.state.data.count}개 </Text>
                        </View>
                        <Text style={{ color: 'gray', fontSize: 14 }}>{this.state.data.offers}</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>결제완료  </Text>
                            <Text>{this.state.data.orderTime}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>주문요청  </Text>
                            <Text>{this.props.route.params.requestTime}</Text>
                        </View>
                    </View>
                    <Button
                        title="홈으로 돌아가기"
                        onPress={() => [this.props.navigation.pop(), this.props.navigation.navigate('Shops')]}
                    />
                </View>
            )
        } else {
            return (
                <View style={paymentStyles.background}>
                    <Text style={paymentStyles.notifyText}>결제 실패{'\n'}관리자에게 문의하세요.</Text>
                    <Button
                        title="홈으로 돌아가기"
                        onPress={() => [this.props.navigation.pop(), this.props.navigation.navigate('Shops')]}
                    />
                </View>
            )
        }
    }

}