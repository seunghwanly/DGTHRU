import React from 'react';
import {
    View,
    Text,
    Image,
    Alert
} from 'react-native';
import { basketStyles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageLinker from '../../utils/ImageLinker';

//Firebase Ref
import { commonDatabase, commonRef } from '../../utils/DatabaseRef';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

import { enableScreens } from 'react-native-screens';
enableScreens();


async function handleOrder(shopInfo, data) {
    var currentTime = moment().format('YYYY_MM_DD');
    //pop     
    await database().ref('user/basket/' + auth().currentUser.uid + '/group').remove();
    //push
    await database()
        .ref('shops/' + shopInfo + '/' + currentTime + '/' + auth().currentUser.phoneNumber + '/' + 'group')
        .set(data);
}


async function handleDeleteOrder(orderKey) {

    console.log('>> orderKey : ' + orderKey);

    var orderPath = 'user/basket/' + auth().currentUser.uid + '/group/' + orderKey;

    await database()
        .ref(orderPath)
        .remove();

}

export default class BasketDetail extends React.Component {

    _firebaseCommonDatabase;

    constructor(props) {
        super(props);

        this.state = {
            orderData: [],
            propsData: [],
            needRefresh: false,
        }

        this._firebaseCommonDatabase = database().ref('user/basket/' + auth().currentUser.uid + '/' + 'group');
    };

    componentDidMount() {

        this._firebaseCommonDatabase
            .on('value', (snapshot) => {

                this.setState({ orderData: [], propsData: [] })   //상태가 바뀌어야 화면이 reload되는데 이게 지금은 최선임

                var idx = 0;    // loop

                snapshot.forEach((childSnapShot) => {
                    
                    var tempJSON = {
                        "idx": idx,
                        "key": childSnapShot.key,
                        "value": childSnapShot.val()
                    };

                    idx++;

                    this.setState({
                        orderData: this.state.orderData.concat(tempJSON),
                        propsData: this.state.propsData.concat(childSnapShot.val())
                    });

                })

            })
    }

    shouldComponentUpdate(nextState) {
        return this.state.orderData !== nextState.orderData;
    }

    componentWillUnmount() {
        this._firebaseCommonDatabase.off();
    }

    render() {

        // console.log('\n\n> BasketDetail : ' + JSON.stringify(this.state.orderData));
        // total cost
        var totalCost = 0;
        this.state.orderData.map(item => {
            totalCost += Number(item.value.cost) * Number(item.value.options.count);
        })
        
        // is items are in same shops?
        var isSameshop = false;
        if(this.state.orderData.length > 1) {
            for (var i = 0; i < this.state.orderData.length-1; i++) {
                if (this.state.orderData[i].value.shopInfo === this.state.orderData[i + 1].value.shopInfo)
                    isSameshop = true;
                else
                    isSameshop = false;
            }
            
        }
        else isSameshop = true;

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
                                            <ImageLinker name={item.value.shopInfo} style={[basketStyles.smallRadiusIcon, { marginEnd: 5 }]} />
                                            <ImageLinker name={item.value.name} style={[basketStyles.smallRadiusIcon, { marginEnd: 5 }]} />
                                            <Text style={basketStyles.smallRadiusText}>{} {item.value.name} {item.value.options.selected !== undefined ? ', ' + item.value.options.selected : ' '}</Text>
                                        </View>
                                        <View style={basketStyles.detailItemInfoWrapper}>
                                            <Text style={{ fontSize: 12 }}>x{item.value.options.count}{'\t' + (Number(item.value.cost) * Number(item.value.options.count)).toLocaleString()}원</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={basketStyles.detailImgButton}
                                            onPress={() => {
                                                Alert.alert(
                                                    'DGTHRU 알림', '삭제하시겠습니까 ?',
                                                    [
                                                        {
                                                            text: '삭제',
                                                            onPress: () => handleDeleteOrder(item.key)
                                                        },
                                                        {
                                                            text: '취소', onPress: () => console.log('cancel delete'), style: "cancel"
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
                            <Text style={[basketStyles.smallRadiusText, { alignSelf: 'flex-end', textAlign: 'right' }]}>{totalCost.toLocaleString()}원</Text>
                        </View>
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
                                                    this.props.navigation.navigate('Paying',
                                                        {
                                                            totalCost: totalCost,
                                                            quantity: this.state.orderData.length,
                                                            shopInfo: this.props.route.params.shopInfo,
                                                            itemData: JSON.stringify(this.state.propsData)
                                                        }
                                                    ),
                                                    //pop and push
                                                    handleOrder(this.props.route.params.shopInfo, this.state.propsData)
                                                ]
                                        }
                                    ])
                                :
                                Alert.alert("DGTHRU 알림", "같은 카페의 제품만 담아주세요 !",[{ text:'확인', onPress:()=>console.log('> set of diff shopInfo'), style:'cancel'}])
                        }
                        }
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
