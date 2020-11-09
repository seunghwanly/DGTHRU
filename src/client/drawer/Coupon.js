import React from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    View,
    Modal, Button
} from 'react-native';
import ReceiptSingleModal from '../../utils/ReceiptSingleModal';
import ReceiptGroupModal from '../../utils/ReceiptGroupModal';
import { Header } from 'react-native-elements';
import { BillStyles, CircleStyles } from './styles';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import database from '@react-native-firebase/database'

//firebase
import { userCouponTotalDatabase } from '../../utils/DatabaseRef';
import { firebase } from '@react-native-firebase/database';

export default class Coupon extends React.Component {

    _userCouponDB;

    constructor(props) {
        super(props);

        this.state = {
            shopInfo: [],
            couponNum: 0,
            refreshing: false,
            modalVisible: false,
            currentItem: {}
        };

        this._userCouponDB = userCouponTotalDatabase();
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
        var i = 0;
        database().ref('user/coupons' + '/' + auth().currentUser.uid).once('value').then(snapshot => {
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val().shopInfo;
                i++;
                if (i <= 15) {
                    this.setState({ shopInfo: this.state.shopInfo.concat(childData), couponNum: i });
                    console.log("shopinfo: " + this.state.shopInfo[6]);
                }
                else {
                    alert('you can use coupon');
                }
            });
        });
    }

    couponImage = (number) => {
        if (this.state.shopInfo[number] !== undefined) {
            return (
                <View>
                    <ImageLinker
                        name={this.state.shopInfo[number]}
                        style={{
                            width: 50,
                            height: 50,
                            marginVertical: 2,
                            marginTop: 15
                        }} />
                </View>
            )
        }
        else {
            return (
                <View>
                    <ImageLinker
                        name={'nothing'}
                        style={{
                            width: 50,
                            height: 50,
                            marginVertical: 2,
                            marginTop: 15
                        }} />
                </View>
            )
        }
    }

    _onRefresh = React.Component(() => {
        console.log('onRefresh !!');
        this.setState({ refreshing: true });
        this._fetchData()
            .then(() => [this.setState({ refreshing: false }), alert('Refresh')]);
    }, []);

    render() {
        const { shopInfo, modalVisible, currentItem } = this.state;

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
                                style={BillStyles.modalButton}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Header
                    barStyle='light-content'
                    containerStyle={{ backgroundColor: '#182335', borderBottomColor: 'transparent' }}
                    centerComponent={(<Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>e-Receipt / History</Text>)}
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
                        paddingLeft: 15,
                        paddingRight: 15
                    }}>
                    <View style={{ backgroundColor: 'white', flex: 1, padding: 10, borderTopStartRadius: 12, borderTopEndRadius: 12 }}>
                        <View style={{ flexDirection: 'column', marginBottom: 5, borderBottomWidth: 1, padding: 8 }}>
                            <Text style={{ fontWeight: 'bold', width: '100%' }}>현재 쿠폰 {this.state.couponNum} 장</Text>
                        </View>
                        <View >
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                            </View>
                            <View style={{ marginBottom: 5, padding: 8 }}>
                                <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                    {this.couponImage(0)}
                                    {this.couponImage(1)}
                                    {this.couponImage(2)}
                                    {this.couponImage(3)}
                                    {this.couponImage(4)}
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8, }}>
                                    {this.couponImage(5)}
                                    {this.couponImage(6)}
                                    {this.couponImage(7)}
                                    {this.couponImage(8)}
                                    {this.couponImage(9)}
                                </View>
                                <Text style={{ textAlign: "right" }}>10장 아메리카노 1잔</Text>

                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                                    {this.couponImage(10)}
                                    {this.couponImage(11)}
                                    {this.couponImage(12)}
                                    {this.couponImage(13)}
                                    {this.couponImage(14)}
                                </View>
                                <Text style={{ textAlign: "right" }}>15장 카페라떼 1잔</Text>

                                {/* <FlatList
                                    contentContainerStyle={{ margin: 4 }}
                                    horizontal={false}
                                    numColumns={5}
                                    data={this.state.shopInfo}
                                    renderItem={
                                        ({ item }) => (
                                            <View>
                                                <ImageLinker
                                                    name={item}
                                                    style={{
                                                        width: 68,
                                                        height: 68,
                                                        marginVertical: 2,
                                                        marginTop: 15
                                                    }} />
                                            </View>
                                        )
                                    }
                                    keyExtractor={item => item.key}
                                >
                                </FlatList> */}
                            </View>
                        </View>
                    </View>
                </View>
            </>
        )
    }
}