import React from 'react';
import {
    View,
    Text,
    Button,
    Vibration,
    Alert,
    Image
} from 'react-native';

import database from '@react-native-firebase/database';
import { commonRef } from '../../DatabaseRef.js';

export default class PaymentResult extends React.Component {

    _firebaseRef;

    constructor(props) {
        super(props);

        console.log('constructor >> ');

        this.state = {
            isMenuReady: false,
            orderState: []
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
                    this.setState({ orderState: this.state.orderState.concat(childSnapShot.val().orderState) })
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
                            onPress: () => [ Vibration.cancel(), this.props.navigation.navigate('Shops') ]
                        },
                        {
                            text: 'x', onPress: () => console.log('cancel pressed !'), style:'cancel'
                        }
                    ]
                );
                Vibration.vibrate([1000, 1000, 1000], true);
            }

            return (
                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <Image
                        style={{
                            width: 200,
                            height: 200,
                            margin: 20
                        }}
                        source={require('../../../image/sample.gif')} />
                    <Text>메뉴가 준비되면 알려드리겠습니다 !</Text>
                    <Button
                        title="홈으로 돌아가기"
                        onPress={() => this.props.navigation.navigate('Shops')}
                    />
                </View>
            )
        } else {
            return (
                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>결제 실패{'\n'}관리자에게 문의하세요.</Text>
                </View>
            )
        }
    }

}