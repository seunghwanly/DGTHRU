import React from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    View,
    ScrollView,
    RefreshControl,
    Modal,
} from 'react-native';
import ReceiptSingleModal from '../../utils/ReceiptSingleModal';
import ReceiptGroupModal from '../../utils/ReceiptGroupModal';
import { Header } from 'react-native-elements';
import { BillStyles, CircleStyles } from './styles';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

//firebase
import { userHistoryTotalDatabase } from '../../utils/DatabaseRef';
import { firebase } from '@react-native-firebase/database';

const ViewCoupon = ({ name }) => {
    //여기서 hyehwa가 맞으면


    firebase.database().ref('user/coupons' + '/' + auth().currentUser.uid).once('value', (snapshot) => {
        var rows = [];
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            rows.push(childData);
            console.log(rows);
        });
    });


    // database().ref('user/coupons' + '/' + auth().currentUser.uid).once('value', (snapshot) => {
    //     snapshot.forEach((childSnapShot) => {
    //         childSnapShot.forEach((dataSnapShot) => {
    //             console.log('childSnapShot >> ' + childSnapShot.key, childSnapShot.val());
    //         });
    //     });
    // });

    if (shopInfo === 'hyehwa_roof') {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                <GetCafeIcon name={'hyehwa_roof'} />
            </View>
        );
    }
    else if (shopInfo === 'singong_1f') {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                <GetCafeIcon name={'singong_1f'} />
            </View>
        );
    }
}

const GetCafeIcon = ({ name }) => {

    if (name === 'main_outdoor') {
        return (
            <View style={{ width: '15%', paddingStart: 5, alignItems: 'baseline' }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    alignItems="flex-end"
                    source={require('../../../image/cafe-icon/가온누리.png')}
                />
            </View>
        );
    }
    else if (name === 'singong_1f') {
        return (
            <View style={{ width: '15%', paddingStart: 5, alignItems: 'baseline' }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    alignItems="flex-end"
                    source={require('../../../image/cafe-icon/남산학사.png')}
                />
            </View>
        );
    }
    else if (name === "hyehwa_roof") {
        return (
            <View style={{ width: '15%', paddingStart: 5, alignItems: 'baseline' }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    alignItems="flex-end"
                    source={require('../../../image/cafe-icon/혜화.png')}
                />
            </View>
        );
    }
    else if (name === 'economy_outdoor') {
        return (
            <View style={{ width: '15%', paddingStart: 5, alignItems: 'baseline' }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    alignItems="flex-end"
                    source={require('../../../image/cafe-icon/그루터기.png')}
                />
            </View>
        );
    }
    else if (name === 'munhwa_1f') {
        return (
            <View style={{ width: '15%', paddingStart: 5, alignItems: 'baseline' }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    alignItems="flex-end"
                    source={require('../../../image/cafe-icon/두리터.png')}
                />
            </View>
        );
    }
    else if (name === 'coffee_icon') {
        return (
            <View style={{ width: '15%', paddingStart: 5, alignItems: 'baseline' }}>
                <Image
                    style={{ width: 30, height: 80 }}
                    resizeMode='cover'
                    alignItems="flex-end"
                    source={require('../../../image/cafe-icon/coffee_icon.png')}
                />
            </View>
        );
    }
    else {
        return (
            <Text>None</Text>
        );
    }

}

export default class Coupon extends React.Component {

    _userHistoryDB;

    constructor(props) {
        super(props);

        this.state = {
            totalCost: 0,
            couponNum: 0,
            userHistory: [],
            refreshing: false,
            modalVisible: false,
            currentItem: {}
        };

        this._userHistoryDB = userHistoryTotalDatabase();
    }

    componentDidMount() {
        this._fetchData();
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    setCurrentItem = (item) => {
        this.setState({ currentItem: item });
        this.setModalVisible(true);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    _fetchData() {
        var tempTotalCost = 0;

        this._userHistoryDB
            .once('value', (snapshot) => {

                var tempJSONArray = [];
                var tempSubJSONArray = [];

                // console.log('snapshot >> ' + snapshot.val());
                snapshot.forEach((childSnapShot) => {
                    tempJSONArray = [];
                    var subObjectKey = childSnapShot.key;
                    // console.log('childSnapShot >> ' + childSnapShot.key, childSnapShot.val());
                    // 날짜 : { autokey : { values } }
                    childSnapShot.forEach((dataSnapShot) => {

                        if (dataSnapShot.key.charAt(0) === '-') {   // 단일메뉴 주문
                            // console.log('dataChildSnapShot >> ' + dataSnapShot.val().orderTime );
                            tempJSONArray.push({

                                date: subObjectKey,
                                name: dataSnapShot.val().name,
                                cost: dataSnapShot.val().cost,
                                options: dataSnapShot.val().options,
                                orderTime: dataSnapShot.val().orderTime,
                                orderNumber: dataSnapShot.val().orderNumber,
                                shopInfo: dataSnapShot.val().shopInfo,
                            });

                            tempTotalCost += dataSnapShot.val().cost;
                        }
                        //autokey : { values }
                        else {
                            //A-1 그룹 계산한 것들 출력
                            var tempItemOrderTime = '';
                            var tempItemShopInfo = '';
                            var tempGroupTotalCost = 0;

                            dataSnapShot.forEach((groupChild) => {
                                tempSubJSONArray = [];
                                groupChild.forEach((item) => {
                                    tempItemOrderTime = item.val().orderTime; //key
                                    tempItemShopInfo = item.val().shopInfo; //shopInfo
                                    //push
                                    tempSubJSONArray.push({
                                        name: item.val().name,
                                        cost: item.val().cost,
                                        options: item.val().options
                                    });
                                    console.log('>>>>> groupChild.forEach : ' + tempSubJSONArray.length, groupChild.key,);
                                    tempTotalCost += item.val().cost;
                                    tempGroupTotalCost += item.val().cost;

                                })  //item
                                tempSubJSONArray.sort((d1, d2) => new moment(d2.orderTime, 'HH:mm:ss') - new moment(d1.orderTime, 'HH:mm:ss'));
                                //to object
                                var forPush = {
                                    orderTime: tempItemOrderTime,
                                    orderNumber: dataSnapShot.key,
                                    group: tempSubJSONArray,
                                    shopInfo: tempItemShopInfo,
                                    totalCost: tempGroupTotalCost,
                                    date: subObjectKey
                                };

                                //push to main array
                                tempJSONArray.push(forPush);
                            })  //groupChild
                        }
                    }); //dataSnapShot

                    //push to tempJSONArray
                    tempJSONArray.sort((d1, d2) => new moment(d2.orderTime, 'HH:mm:ss') - new moment(d1.orderTime, 'HH:mm:ss'));

                    // tempJSONArray.sort((i, j) => (i.orderTime,moment().format('HH:mm:ss')) - (j.orderTime,moment().format('HH:mm:ss')));
                    var tempSubObject = {
                        'date': subObjectKey,
                        'item': tempJSONArray
                    };

                    this.setState({
                        userHistory: this.state.userHistory.concat(tempSubObject),
                        totalCost: tempTotalCost
                    });
                });
                this.setState({ userHistory: this.state.userHistory.reverse() });
            });
    }

    _onRefresh = React.Component(() => {
        console.log('onRefresh !!');
        this.setState({ refreshing: true });
        this._fetchData()
            .then(() => [this.setState({ refreshing: false }), alert('Refresh')]);
    }, []);

    render() {
        const { userHistory, modalVisible, currentItem } = this.state;

        return (
            <>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={BillStyles.modalBackground}>
                        <View style={BillStyles.modalSubBackground}>
                            {
                                currentItem.group !== undefined ? <ReceiptGroupModal item={currentItem} /> : <ReceiptSingleModal item={currentItem} />
                            }
                            <TouchableOpacity
                                style={{ borderRadius: 10, backgroundColor: 'black', width: '90%', paddingHorizontal: 50, paddingVertical: 10 }}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Header
                    containerStyle={{ backgroundColor: 'white' }}
                    centerComponent={(<Text style={{ fontWeight: 'bold', fontSize: 16 }}>Coupon</Text>)}
                    leftComponent={
                        () => (
                            <TouchableOpacity
                                style={{ flexDirection: 'row-reverse' }}
                                // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Image
                                    style={{ height: 30, width: 30, }}
                                    resizeMode='cover'
                                    source={require('../../../image/chevron-back-outline.png')}
                                />
                            </TouchableOpacity>
                        )
                    }
                    rightComponent={
                        () => (
                            <TouchableOpacity
                                style={{ flexDirection: 'row-reverse' }}
                                // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                                onPress={() => this.props.navigation.toggleDrawer()}
                            >
                                <Image
                                    style={{ height: 30, width: 30, }}
                                    resizeMode='cover'
                                    source={require('../../../image/menu-outline.png')}
                                />
                            </TouchableOpacity>
                        )
                    } />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        backgroundColor: '#F2F2F2',
                        paddingTop: 20,
                        paddingLeft: 15,
                        paddingRight: 15
                    }}>

                    <View style={{ backgroundColor: 'white', flex: 1, padding: 10, borderTopStartRadius: 12, borderTopEndRadius: 12 }}>
                        <View style={{ flexDirection: 'column', marginBottom: 5, borderBottomWidth: 1, padding: 8 }}>
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                <GetCafeIcon name={'main_outdoor'} />
                                <Text style={{ fontWeight: 'bold', width: '100%' }}>가온누리    2260-8961</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                <GetCafeIcon name={'singong_1f'} />
                                <Text style={{ fontWeight: 'bold', width: '100%' }}>남산학사 카페   2260-8509</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                <GetCafeIcon name={'hyehwa_roof'} />
                                <Text style={{ fontWeight: 'bold', width: '100%' }}>혜화디저트 카페  2260-8966</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                <GetCafeIcon name={'munhwa_1f'} />
                                <Text style={{ fontWeight: 'bold', width: '100%' }}>두리터 카페     2260-1478</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                <GetCafeIcon name={'economy_outdoor'} />
                                <Text style={{ fontWeight: 'bold', width: '100%' }}>그루터기 카페     2260-1478</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', marginBottom: 5, padding: 8 }}>
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                {/* 여기에 coffee_icon 대신 가게 이름 넣으면 될듯! */}
                                <GetCafeIcon name={'coffee_icon'} />
                                <GetCafeIcon name={'coffee_icon'} />
                                <GetCafeIcon name={'coffee_icon'} />
                                <GetCafeIcon name={'coffee_icon'} />
                                <GetCafeIcon name={'coffee_icon'} />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                <GetCafeIcon name={'coffee_icon'} />
                                <GetCafeIcon name={'coffee_icon'} />
                                <GetCafeIcon name={'coffee_icon'} />
                                <GetCafeIcon name={'coffee_icon'} />
                                <GetCafeIcon name={'coffee_icon'} />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                <ViewCoupon name={auth().currentUser.uid} />


                            </View>
                        </View>
                    </View>

                </View>
            </>
        )
    }

}