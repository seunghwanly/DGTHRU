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
            count: 0,
        }

        this._firebaseRef = database().ref(commonRef(this.props.route.params.shopInfo));
    }

    componentDidMount() {
        console.log('componentDidMount');

        // this.setState({ count : 0 });
        var count = 0;

        this._firebaseRef
            .on('value', (snapshot) => {
                console.log('before >> ' + count, this.countProperties(snapshot));

                snapshot.forEach((childSnapShot) => {

                    if (childSnapShot.val().orderState === 'ready') {
                        // this.setState({ count : this.state.count + 1 });
                        count++;
                    }
                    // if (childSnapShot.key === "orderState") {
                    //     console.log('key : ' + childSnapShot.key + '\t state : ' + childSnapShot.val());
                    //     if (childSnapShot.val() === "ready") {
                    //         // this.setState({ count : this.state.count + 1 });
                    //         count++;
                    //         console.log('count ++');
                    //     }
                    // }  
                    // if (this.state.count === (this.countProperties(snapshot.val()) - 1) && this.state.count !== 0) {
                    //     this.setState({ isMenuReady: !this.state.isMenuReady });
                    //     return () => this._firebaseRef.off();
                    // }

                })
                if (count === this.countProperties(snapshot.val()) && count !== 0) {
                    this.setState({ isMenuReady: true });
                }
                console.log('after >> ' + count, this.countProperties(snapshot.val()));
                // console.log('after >> '+ count , snapshot);
            });
    }

    componentWillUnmount() {
        console.log('componentWillUnmout');
        this._firebaseRef.off();
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

                const PATTERN = [1000, 1000, 1000, 1000];
                Vibration.vibrate(PATTERN, true);

                Alert.alert(
                    'DGHTRU', '메뉴가 준비되었습니다 ! 얼른 가져가세요.',
                    [
                        {
                            text: '확인',
                            onPress: () =>
                                [
                                    Vibration.cancel(),
                                    this.props.navigation.navigate('Shops')
                                ]
                        }
                    ]
                );
            }

            return (
                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
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