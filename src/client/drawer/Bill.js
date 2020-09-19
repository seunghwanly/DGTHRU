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
import { BillStyles } from './styles';
import { Header } from 'react-native-elements';
import moment from 'moment';

//firebase
import { userHistoryTotalDatabase } from '../../utils/DatabaseRef';

const GetCafeIcon = ({ name }) => {

    if (name === 'main_outdoor') {
        return (
            <View style={{ width: '15%', paddingStart: 5 }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    source={require('../../../image/cafe-icon/가온누리.png')}
                />
            </View>
        );
    }
    else if (name === 'singong_1f') {
        return (
            <View style={{ width: '15%', paddingStart: 5 }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    source={require('../../../image/cafe-icon/남산학사.png')}
                />
            </View>
        );
    }
    else if (name === "hyehwa_roof") {
        return (
            <View style={{ width: '15%', paddingStart: 5 }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    source={require('../../../image/cafe-icon/혜화.png')}
                />
            </View>
        );
    }
    else if (name === 'economy_outdoor') {
        return (
            <View style={{ width: '15%', paddingStart: 5 }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    source={require('../../../image/cafe-icon/그루터기.png')}
                />
            </View>
        );
    }
    else if (name === 'munhwa_1f') {
        return (
            <View style={{ width: '15%', paddingStart: 5 }}>
                <Image
                    style={{ width: 25, height: 25 }}
                    resizeMode='cover'
                    source={require('../../../image/cafe-icon/두리터.png')}
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

export default class Bill extends React.Component {

    _userHistoryDB;

    constructor(props) {
        super(props);

        this.state = {
            totalCost: 0,
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
        this.setState({ currentItem : item });
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
                                orderInfo : dataSnapShot.val().orderInfo,
                                orderTime : dataSnapShot.val().orderInfo.orderTime,
                                shopInfo: dataSnapShot.val().orderInfo.shopInfo
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
                                    tempItemOrderTime = item.val().orderInfo.orderTime; //key
                                    tempItemShopInfo = item.val().orderInfo.shopInfo; //shopInfo
                                    //push
                                    tempSubJSONArray.push({
                                        name: item.val().name,
                                        cost: item.val().cost,
                                        options: item.val().options
                                    });
                                    console.log('>>>>> groupChild.forEach : ' + tempSubJSONArray.length, groupChild.key, );
                                    tempTotalCost += item.val().cost;
                                    tempGroupTotalCost += item.val().cost;

                                })  //item
                                
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
                // console.log('BILL >>>>\n\n' + JSON.stringify(this.state.userHistory));
            });
    }

    _onRefresh = React.Component(() => {
        console.log('onRefresh !!');
        this.setState({ refreshing: true });
        this._fetchData()
            .then(() => [this.setState({ refreshing: false }), alert('새로고침되었습니다 !')]);
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
                                currentItem.group !== undefined ? <ReceiptGroupModal item={currentItem}/> : <ReceiptSingleModal item={currentItem} />
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
                    barStyle='light-content'
                    containerStyle={{ backgroundColor: '#182335', borderBottomColor:'transparent' }}
                    centerComponent={(<Text style={{ fontWeight: 'bold', fontSize: 16, color:'#fff'}}>e-Receipt / History</Text>)}
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
                                    source={require('../../../image/chevron-back-white.png')}
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
                                    source={require('../../../image/menu-white.png')}
                                />
                            </TouchableOpacity>
                        )
                    } />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        backgroundColor: '#182335',
                        paddingTop: 20,
                        paddingLeft: 20,
                        paddingRight: 20
                    }}>
                    {
                        this.state.userHistory !== null ?
                            <View style={{ backgroundColor: 'white', flex: 1, padding: 10, borderTopStartRadius: 12, borderTopEndRadius: 12 }}>
                                <Text style={{ alignSelf: 'flex-end', marginBottom: 20, fontWeight: 'bold', fontSize: 16, paddingTop: 10 }}>총 사용금액 : {this.state.totalCost.toLocaleString()}원</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 5, borderBottomWidth: 1, padding: 8 }}>
                                    <Text style={{ fontWeight: 'bold', width: '15%' }}>가게</Text>
                                    <Text style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>주문상품</Text>
                                    <Text style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>가격</Text>
                                    <Text style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>용기</Text>
                                    <Text style={{ fontWeight: 'bold', width: '20%', textAlign: 'right' }}>주문시간</Text>
                                </View>
                                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                                    {
                                        userHistory.map((items, indx) => {
                                            //console.log(' bills > ' + JSON.stringify(items));
                                            return (
                                                <>
                                                    <View style={{ paddingTop: 2, paddingBottom: 2, marginBottom: 5, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                                                        <Text style={{ textAlign: 'right' }}>
                                                            {items.date.substr(0, 4)}년 {items.date.substr(5, 2)}월 {items.date.substr(8, 2)}일
                                                    </Text>
                                                    </View>
                                                    <FlatList
                                                        data={items.item}
                                                        renderItem={
                                                            ({ item }) => {
                                                                return (
                                                                    <>
                                                                        <TouchableOpacity
                                                                            style={{ flexDirection: 'row', marginVertical: 3, alignItems: 'center' }}
                                                                            onPress={() => this.setCurrentItem(item)}
                                                                        >
                                                                            <GetCafeIcon name={item.shopInfo} />
                                                                            {
                                                                                item.group === undefined ?

                                                                                    <>
                                                                                        <Text style={{ fontSize:13, width: '25%' }}>{item.name}</Text>
                                                                                        <Text style={{ fontSize:13, width: '20%', textAlign: 'center' }}>{(item.cost).toLocaleString()}원</Text>
                                                                                        <Text style={{ fontSize:13, width: '20%', textAlign: 'center' }}>{item.options.cup}</Text>
                                                                                        <Text style={{ fontSize:13, width: '20%', textAlign: 'right' }}>{item.orderTime}</Text>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <Text style={{ fontSize:13, width: '25%' }}>{item.group[0].name}외 {item.group.length - 1}건</Text>
                                                                                        <Text style={{ fontSize:13, width: '20%', textAlign: 'center' }}>{(item.totalCost).toLocaleString()}원</Text>
                                                                                        <Text style={{ fontSize:13, width: '20%', textAlign: 'center' }}>{item.group[0].options.cup}</Text>
                                                                                        <Text style={{ fontSize:13, width: '20%', textAlign: 'right' }}>{item.orderTime}</Text>
                                                                                    </>
                                                                            }
                                                                        </TouchableOpacity>
                                                                    </>
                                                                );
                                                            }
                                                        }
                                                        keyExtractor={(item, index) => item.key}
                                                        scrollEnabled={false}
                                                    />
                                                    <View style={{ marginBottom: 10 }} />
                                                </>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                            :
                            <Text>주문내역이 없네요 ~</Text>
                    }
                </View>
            </>
        )
    }

}
