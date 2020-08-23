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
import auth from '@react-native-firebase/auth';
import moment from 'moment';

export default class PaymentResult extends React.Component {

    // const navigation = this.props.route.params.navigation;
    // const route = this.props.route;
    // const response = this.props.route.params.response;
    // const shopInfo this.props.route.params.shopInfo;

    constructor(props) {
        super(props);

        this.state = {
            isDataEmpty: false
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.getResponseSignal();
    }

    getResponseSignal() {

        const PATTERN = [1000, 1000, 1000];

        console.log('getResponseSignal >> ');

        const readData =
            database()
                .ref(this.props.route.params.shopInfo +
                    '/' + moment().format('YYYY_MM_DD') +
                    '/' + auth().currentUser.phoneNumber)
                .on('value', (snapshot) => {


                    console.log('read database >>> ' + snapshot.val());

                    if (snapshot.val() === null) {

                        this.setState({ isDataEmpty: true });


                        Vibration.vibrate(PATTERN, true);

                        Alert.alert(
                            'DGHTRU', '메뉴가 준비되었습니다 ! 얼른 가져가세요.',
                            [
                                {
                                    text: '확인',
                                    onPress: () =>
                                        [
                                            Vibration.cancel(),
                                            database()
                                                .ref(this.props.route.params.shopInfo +
                                                    '/' + moment().format('YYYY_MM_DD') +
                                                    '/' + auth().currentUser.phoneNumber)
                                                .off('value', readData),
                                            this.props.navigation.navigate('Shops')
                                        ]
                                }
                            ]
                        )
                    }
                    else {
                        this.setState({ isDataEmpty: false })
                    }

                })
    }

    render() {
        console.log('render >> ');
        if (this.props.route.params.response.imp_success === 'true') {

            return (
                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                    style={{
                        width:200,
                        height:200,
                        margin:20
                    }}
                     source={require('../../../image/sample.gif')}/>
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