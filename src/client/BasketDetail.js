import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Firebase Ref
import { commonDatabase, userHistoryDatabase, commonRef, userHistoryRef } from '../DatabaseRef';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

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

    _firebaseCommonRef;
    _firebaseUserRef;

    constructor(props) {
        super(props);

        this.state = {
            orderData: [],
            userData: []
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
                    console.log('\nBasketDetail >> ' + childSnapShot.val());

                    var tempJSON = {
                        "idx": idx,
                        "key": childSnapShot.key,
                        "value": childSnapShot.val()
                    };

                    idx++;

                    this.setState({
                        orderData: this.state.orderData.concat(tempJSON)
                    })
                    this.props.navigation.setParams({ amount: this.state.orderData.length }); //>>redux 를 통해서 header와 screen 통신
                    console.log('\n after : ' + this.state.orderData.length);
                })
            });

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
                console.log(this.state.userData[this.state.orderData[k].idx].key);
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
                <View style={styles.background}>
                    <View style={styles.subBackground}>
                        {
                            this.state.orderData.map(item => {
                                //key 값 부여하기 !
                                return (
                                    <View style={
                                        {
                                            flexDirection: 'row',
                                            padding: 2,
                                            width: '100%',
                                        }
                                    }>
                                        <View style={{
                                            alignSelf: 'flex-start',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <View style={[styles.radiusIcon, { marginEnd: 5 }]} />
                                            <Text style={styles.radiusText}>{} {item.value.name} {item.value.selected !== undefined ? ', ' + item.value.selected : ' '}</Text>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignSelf: 'flex-end',
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 12
                                            }}>x{item.value.count}{'\t' + Number(item.value.cost) * Number(item.value.count)}원</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flex: 1,
                                                marginStart: 10,

                                            }}
                                            onPress={() => {
                                                [
                                                    handleDeleteOrder(this.props.route.params.shopInfo, item.key),
                                                    handleDeleteUser(this._returnIndexFromOrderData(item.key)),

                                                ]
                                            }}

                                        >
                                            <Image
                                                style={
                                                    {
                                                        width: 15,
                                                        height: 15
                                                    }
                                                }
                                                resizeMode='cover'
                                                source={require('../../image/trash-outline.png')}

                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                        <View style={
                            {
                                marginStart: 'auto',
                                marginEnd: 'auto',
                                marginTop: 5,
                                backgroundColor: 'lightgray',
                                borderRadius: 10,
                                flexDirection: 'row',
                                width: '90%',

                            }
                        }>
                            <Text style={[styles.radiusText, { alignSelf: 'flex-start', width: '60%' }]}>TOTAL</Text>
                            <Text style={[styles.radiusText, { alignSelf: 'flex-end' }]}>{totalCost.toLocaleString()}원</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'gold',
                            borderRadius: 10,
                            paddingStart: 10,
                            paddingEnd: 10,
                            paddingTop: 5,
                            paddingBottom: 5,
                            margin: 15,
                            width: 300
                        }}

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
                        <Text style={[styles.radiusText, { textAlign: 'center', fontSize: 18 }]}>카카오페이로 결제하기</Text>
                    </TouchableOpacity>
                </View>
            );
        } //if
        else {
            return (
                <View style={styles.background}>
                    <Text>장바구니가 비어있어요 !</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '5%',
    },
    subBackground: {
        width: '90%',
        height: 'auto',
        backgroundColor: 'ghostwhite',
        borderRadius: 10,
        padding: 10
    },
    radiusIcon: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'royalblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    radiusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'midnightblue',
        textAlignVertical: 'center',
        margin: 10
    },

});
