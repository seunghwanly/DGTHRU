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

    _userCouponDB;

    constructor(props) {
        super(props);

        this.state = {
            shopInfo: [],
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
        var i=0;
        database().ref('user/coupons' + '/' + auth().currentUser.uid).once('value').then(snapshot => {
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val().shopInfo;
                i++;
                if(i <= 15){
                    this.setState({ shopInfo: this.state.shopInfo.concat(childData) });
                }
                else{
                    alert('you can use coupon');
                }
            });
        });
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
                            <Text style={{ fontWeight: 'bold', width: '100%' }}>현재 쿠폰 {this.state.shopInfo} 장</Text>
                       
                        
                        </View>

                        <View >
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 5, padding: 8 }}>

                            </View>
                            <View style={{ marginBottom: 5, padding: 8 }}>
                                <FlatList
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
                                </FlatList>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        )
    }
}