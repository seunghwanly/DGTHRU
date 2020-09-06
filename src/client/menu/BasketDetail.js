import React from 'react';
import {
    View,
    Text,
    Image,
    Alert
} from 'react-native';
import { basketStyles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Firebase Ref
import { commonDatabase, userHistoryDatabase, commonRef, userHistoryRef } from '../../utils/DatabaseRef';
import database from '@react-native-firebase/database';

import { enableScreens } from 'react-native-screens';
enableScreens();


async function handleDeleteOrder(shopInfo, key) {

    var orderPath = commonRef(shopInfo) + '/' + key;

    await database()
        .ref(orderPath)
        .remove();
}

async function handleDeleteUser(key) {

    var userPath = userHistoryRef() + '/' + key;

    await database()
        .ref(userPath)
        .remove();
}

export default class BasketDetail extends React.Component {

    _firebaseCommonDatabase;
    _firebaseUserDatabase;

    constructor(props) {
        super(props);

        this.state = {
            orderData: [],
            userData: [],
            needRefresh : false
        }

        this._firebaseCommonDatabase = commonDatabase(this.props.route.params.shopInfo);
        this._firebaseUserDatabase = userHistoryDatabase();
    };

    componentDidMount() {

        this._firebaseCommonDatabase
            .on('value', (snapshot) => {

                this.setState({ orderData: [] })   //상태가 바뀌어야 화면이 reload되는데 이게 지금은 최선임

                var idx = 0;    // loop

                snapshot.forEach((childSnapShot) => {
                    //console.log('\nBasketDetail >> ' + JSON.stringify(childSnapShot.val()));

                    var tempJSON = {
                        "idx": idx,
                        "key": childSnapShot.key,
                        "value": childSnapShot.val()
                    };

                    idx++;

                    this.setState({
                        orderData: this.state.orderData.concat(tempJSON)
                    })
                    // this.props.navigation.setParams({ amount: this.state.orderData.length }); //>>redux 를 통해서 header와 screen 통신
                    //console.log('\n after : ' + JSON.stringify(this.state.orderData));
                })
            }),

        this._firebaseUserDatabase
            .on('value', (snapshot2) => {
                this.setState({ userData: [] })

                var idx = 0;

                snapshot2.forEach((childSnapShot2) => {
                    var tempJSON2 = {
                        "idx": idx,
                        "key": childSnapShot2.key,
                        "value": childSnapShot2.val()
                    };
                    idx++;
                    this.setState({
                        userData: this.state.userData.concat(tempJSON2)
                    });
                    
                })
            });

    }

    shouldComponentUpdate(nextState) {
        return this.state.orderData !== nextState.orderData;
    }

    componentWillUnmount() {
        this._firebaseCommonDatabase.off();
        this._firebaseUserDatabase.off();
    }

    _returnIndexFromOrderData = (key) => {

        for (var k in this.state.orderData) {
            if (key === this.state.orderData[k].key) {
                // console.log('_returnIndexFromOrderData >>>>>>\t' + this.state.userData[this.state.orderData[k].idx].key);
                return this.state.userData[this.state.orderData[k].idx].key;
            }
        }
    }

    render() {

        var totalCost = 0;
        this.state.orderData.map(item => {
            totalCost += Number(item.value.cost) * Number(item.value.count);
        })
        
        if (this.state.orderData.length > 0) {
            return (
                <View style={basketStyles.background}>
                    <View style={basketStyles.subBackground}>
                        {
                            this.state.orderData.map(item => {
                                //key 값 부여하기 !
                                return (
                                    <View style={basketStyles.detailWrapper}>
                                        <View style={basketStyles.detailItemNameWrapper}>
                                            <View style={[basketStyles.smallRadiusIcon, { marginEnd: 5 }]} />
                                            <Text style={basketStyles.smallRadiusText}>{} {item.value.name} {item.value.selected !== undefined ? ', ' + item.value.selected : ' '}</Text>
                                        </View>
                                        <View style={basketStyles.detailItemInfoWrapper}>
                                            <Text style={{fontSize: 12}}>x{item.value.count}{'\t' + Number(item.value.cost) * Number(item.value.count)}원</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={basketStyles.detailImgButton}
                                            onPress={() => {
                                                Alert.alert(
                                                    'DGTHRU 알림', '삭제하시겠습니까 ?',
                                                    [
                                                        {
                                                            text : '삭제', onPress: () => [handleDeleteOrder(this.props.route.params.shopInfo, item.key) ,handleDeleteUser(this._returnIndexFromOrderData(item.key)) ]
                                                        },
                                                        {
                                                            text : '취소', onPress: () => console.log('cancel delete'), style:"cancel"
                                                        }
                                                    ]
                                                )
                                            }}>
                                            <Image
                                                style={{ width: 15, height: 15 }}
                                                resizeMode='cover'
                                                source={require('../../../image/trash-outline.png')}

                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                        <View style={basketStyles.detailTotalInfoWrapper}>
                            <Text style={[basketStyles.smallRadiusText, { alignSelf: 'flex-start', width: '70%' }]}>TOTAL</Text>
                            <Text style={[basketStyles.smallRadiusText, { alignSelf: 'flex-end', textAlign:'right' }]}>{totalCost.toLocaleString()}원</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={basketStyles.goToPayment}
                        onPress={() =>
                            [
                                alert('카카오페이로 결제합니다 !'),
                                this.props.navigation.navigate('Paying',
                                    {
                                        totalCost: totalCost,
                                        quantity: this.state.orderData.length,
                                        shopInfo: this.props.route.params.shopInfo
                                    }
                                )
                            ]}
                    >
                        <Text style={[basketStyles.smallRadiusText, { textAlign: 'center', fontSize: 18 }]}>카카오페이로 결제하기</Text>
                    </TouchableOpacity>
                </View>
            );
        } //if
        else {
            return (
                <View style={basketStyles.background}>
                    <Text>장바구니가 비어있어요 !</Text>
                </View>
            );
        }
    }
}
