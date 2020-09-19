import React, { Component, useEffect, } from 'react';
import { Platform, Dimensions, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { OrderlistStyle } from './styles';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { exampleStyle } from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import imageLinker from '../utils/ImageLinker';
const initialLayout = { width: Dimensions.get('window').width };


const FirstRoute = (props) => {

    return(
    <View style={[exampleStyle.background,{ borderTopStartRadius:30, borderTopEndRadius:30, marginTop:20, paddingTop:20, backgroundColor:'#fff' }]} >
        {/* <Text style={exampleStyle.orderlistTitle}>{props.route.title}</Text> */}
        <FlatList
            data={props.data}
            keyExtractor={item => item.key}
            contentContainerStyle={
                {
                    paddingHorizontal: '5%',
                    width: Dimensions.get('window').width,

                }
            }
            scrollEnabled={true}
            renderItem={({ item, index }) => {
                
                return (

                    <>
                        {item.hasOwnProperty('groupOrder') ?
                            <FlatList
                                data={item.groupOrder}
                                keyExtractor={item => item.key}
                                style={
                                    {
                                        width: '100%',
                                        backgroundColor:'#182335',
                                        marginVertical: 5,
                                        alignSelf: 'center',
                                        borderRadius: 20,
                                        padding:'1%',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 2,
                                            height: 2
                                        },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 3
                                    }
                                }
                                contentContainerStyle={
                                    {
                                        flexDirection: 'row',
                                        
                                    }
                                }
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={
                                            {
                                                margin:10,
                                                backgroundColor: '#fff',
                                                flexDirection: 'row',
                                                borderRadius: 20,
                                            }
                                        }>
                                            <View style={
                                                {
                                                    flexDirection: 'row',
                                                    width: '40%',
                                                    marginEnd: '5%',
                                                }
                                            }>

                                                <View style={
                                                    {
                                                        justifyContent:'center',
                                                        alignItems: 'center',
                                                        marginEnd: 5,
                                                        marginStart:5,
                                                    }
                                                }>
                                                    <ImageLinker style={exampleStyle.listImage} name={item.name} />
                                                    <Text textAlign="center" style={{fontWeight:'bold'}}>
                                                        {
                                                            item.orderInfo.orderNumber
                                                        }
                                                    </Text>
                                                </View>


                                                <View style={
                                                    {
                                                        padding: 10
                                                    }
                                                }>
                                                    <Text style={exampleStyle.orderlistText_Bold}>{item.name}</Text>
                                                    <Text style={exampleStyle.orderlistText_Thin}> 수량 : {item.options.count}</Text>
                                                    <Text style={exampleStyle.orderlistText_Thin}> 주문자 번호 : {item.orderInfo.clientPhoneNumber}</Text>
                                                    <Text style={exampleStyle.orderlistText_Thin}> 주문시간 : {item.orderDate}{item.orderInfo.orderTime}</Text>
                                                    <Text style={exampleStyle.orderlistText_Thin}> 옵 션 : {item.options.cup} / {item.options.type} / {item.options.size}</Text>
                                                    <Text style={exampleStyle.orderlistText_Thin}> 샷 추가 : {item.options.shotNum} / 시럽 추가 : {item.options.syrup} / 크림 추가 : {item.options.whipping}</Text>
                                                    <Text style={exampleStyle.orderlistText_Thin}> 요청사항 : {item.options.offers}</Text>
                                                    
                                                </View>


                                            </View>



                                            <View style={
                                                {
                                                    width: '10%',
                                                    backgroundColor: '#182335',
                                                    justifyContent: 'center',
                                                    alignItems:'center',
                                                    margin:5,
                                                    borderRadius: 20,
                                                    padding:10
                                                }
                                            }>
                                                <Image style={{ width:24, height:24, marginBottom:5 }} source={require('../../image/alarm-white.png')}/>
                                                <Text style={[exampleStyle.orderlistPastTime,{ color:'#ddd' }]}>경과시간</Text>
                                                <Text style={exampleStyle.orderlistPastTime}>
                                                {
                                                    moment().diff(new moment(item.orderInfo.orderTime, 'HH:mm:ss'),'minutes') + '분'
                                                }
                                                </Text>
                                            </View>




                                            <View style={
                                                {
                                                    flexDirection: 'row',
                                                    width: '40%'
                                                }
                                            }>
                                                <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetUnconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, true)}>
                                                    <Text style={exampleStyle.orderlistButtonText}>승인취소</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => Setconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, true)}>
                                                    <Text style={exampleStyle.orderlistButtonText}>주문승인</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetReady(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, true)}>
                                                    <Text style={exampleStyle.orderlistButtonText}>준비완료</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[exampleStyle.buttonstyle,{ backgroundColor:'#ea5517' }]} onPress={() => SetRemove(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, true)}>
                                                    <Text style={exampleStyle.orderlistButtonText}>픽업완료</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    )
                                }}
                            />



                            : 
                            
                            
                            
                            <View style={
                                {
                                    width: '100%',
                                    flexDirection: 'row',
                                    borderRadius: 20,
                                    backgroundColor: '#fff',
                                    padding: 10,
                                    marginVertical: 4,
                                    alignSelf: 'center',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 1,
                                        height: 2
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 2
                                }
                            }>



                                <View style={
                                    {
                                        flexDirection: 'row',
                                        width: '35%',
                                        marginEnd: 5,
                                    }
                                }
                                >
                                    <View style={
                                        {
                                            alignItems: 'center',
                                            marginEnd: 5,
                                        }
                                    }
                                    >
                                        <ImageLinker style={exampleStyle.listImage} name="아메리카노" />
                                        <Text textAlign="center">ㅋㅋ</Text>
                                    </View>
                                    <View style={
                                        {
                                            padding: 10
                                        }
                                    }>
                                        <Text style={exampleStyle.orderlistText_Bold}>{item.name}</Text>
                                        <Text style={exampleStyle.orderlistText_Thin}> 수량 : {item.options.count}</Text>
                                        <Text style={exampleStyle.orderlistText_Thin}> 주문자 번호 : {item.orderInfo.clientPhoneNumber}</Text>
                                        <Text style={exampleStyle.orderlistText_Thin}> 주문시간 : {item.orderDate}{item.orderInfo.orderTime}</Text>
                                        <Text style={exampleStyle.orderlistText_Thin}> 옵 션 : {item.options.cup} / {item.options.type} / {item.options.size}</Text>
                                        <Text style={exampleStyle.orderlistText_Thin}> 샷 추가 : {item.options.shotNum} / 시럽 추가 : {item.options.syrup} / 크림 추가 : {item.options.whipping}</Text>
                                        <Text style={exampleStyle.orderlistText_Thin}> 요청사항 : {item.options.offers}</Text>

                                    </View>

                                </View>



                                <View style={
                                    {
                                        width: '10%',
                                        backgroundColor: '#182335',
                                        justifyContent: 'center',
                                        marginHorizontal: '5%',
                                        borderRadius: 20
                                    }
                                }>
                                    <Text style={exampleStyle.orderlistPastTime}>z</Text>
                                    <Text style={exampleStyle.orderlistPastTime}>경과시간</Text>
                                    <Text style={exampleStyle.orderlistPastTime}>1분 경과</Text>
                                </View>



                                <View style={
                                    {
                                        flexDirection: 'row',
                                        width: '40%'
                                    }
                                }>
                                    <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetUnconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false)}>
                                        <Text style={exampleStyle.orderlistButtonText}>승인취소</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => Setconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false)}>
                                        <Text style={exampleStyle.orderlistButtonText}>주문승인</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetReady(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false)}>
                                        <Text style={exampleStyle.orderlistButtonText}>준비완료</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetRemove(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false)}>
                                        <Text style={exampleStyle.orderlistButtonText}>픽업완료</Text>
                                    </TouchableOpacity>
                                </View>



                            </View>
                        }
                    </>
                )
            }}
        />
    </View>
    )
}

const SecondRoute = (props) => (
    <View style={exampleStyle.background} >
        <Text style={exampleStyle.orderlistTitle}>{props.route.title}</Text>
        <FlatList
            data={props.data}
            numColumns={1}
            keyExtractor={item => item.key}
            scrollEnabled={true}
            renderItem={({ item }) => {
                return (


                    <View style={exampleStyle.body}>
                        <View style={exampleStyle.listbox_left}>
                            <View stlye={exampleStyle.listLeftContainer}>
                                <ImageLinker style={exampleStyle.listImage} name="아메리카노" />
                                <Text textAlign="center">ㅋㅋ</Text>
                            </View>
                            <View stlye={exampleStyle.listContainer} >
                                {item.hasOwnProperty('groupOrder') ==
                                    true ?
                                    <Text> 트루</Text>

                                    : <Text>폴스</Text>}
                                <View>

                                    {item.listSize === 1 ?

                                        <Text>이거 되나? </Text> : <Text>어 되네? </Text>}

                                    <Text style={exampleStyle.orderlistText_Bold}></Text>
                                    <Text style={exampleStyle.orderlistText_Thin}> 샷 추가 : ㅋ</Text>
                                    <Text style={exampleStyle.orderlistText_Thin}> 수량 : ㅋ</Text>
                                    <Text style={exampleStyle.orderlistText_Thin}> 주문자 번호 : ㅋ</Text>
                                    <Text style={exampleStyle.orderlistText_Thin}> 주문시간 : ㅋ</Text>
                                    <Text style={exampleStyle.orderlistText_Thin}> 옵 션 : ㅋ/ ㅋ</Text>

                                </View>
                            </View>

                        </View>
                        <View style={exampleStyle.listbox_center}>
                            <Text style={exampleStyle.orderlistPastTime}>z</Text>
                            <Text style={exampleStyle.orderlistPastTime}>경과시간</Text>
                            <Text style={exampleStyle.orderlistPastTime}>1분 경과</Text>
                        </View>
                        <View style={exampleStyle.listbox_right}>
                            <View style={exampleStyle.orderlistview}>
                                <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetUnconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false)}>
                                    <Text style={exampleStyle.orderlistButtonText}>승인취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => Setconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false)}>
                                    <Text style={exampleStyle.orderlistButtonText}>주문승인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetReady(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false)}>
                                    <Text style={exampleStyle.orderlistButtonText}>준비완료</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                )
            }}
        />


    </View>
);
const ThirdRoute = (props) => (
    <View style={[styles.scene, { backgroundColor: 'lightblue' }]} >
        <View>
            <Text>안뇽ㅎㅎ?</Text>
        </View>
        <Text style={exampleStyle.orderlisttext}>{props.route.title}</Text>
    </View>
);

var shopname = '';
var phonenumber = '';
async function DeleteOrderList(key) {
    var userPath = 'hyehwa_roof/' + currentTime + '/+821012341234/' + key + '/';


    await database()
        .ref(userPath)
        .remove();
}

async function Setconfirm(shopname, date, phonenum, key, isGroup) {
    if(!isGroup)
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key + '/orderInfo').update({ orderState: 'confirm' });
    else{
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/group/' + key + '/orderInfo').update({ orderState: 'confirm' });
    }
}

async function SetUnconfirm(shopname, date, phonenum, key, isGroup) {
    if(!isGroup)
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key + '/orderInfo').update({ orderState: 'cancel' });
    else {
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/group/' + key + '/orderInfo').update({ orderState: 'cancel' });
    }
}

async function SetReady(shopname, date, phonenum, key, isGroup) {
    if(!isGroup)
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key + '/orderInfo').update({ orderState: 'ready' });
    else {
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/group/' + key + '/orderInfo').update({ orderState: 'ready' });
    }
}
async function SetRemove(shopname, date, phonenum, key, isGroup) {
    if(!isGroup)
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key).remove();
    else {
        database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/group/').remove();
    }
}

export default class SupervisorOrderList extends Component {

    constructor(props) {
        super(props);
        shopname = "hyehwa_roof";

        this.state = {
            index: 0,
            routes: [{ key: 'first', title: '주문'+'\n'+'현황' }, { key: 'second', title: '지난'+'\n'+'주문' }, { key: 'third', title: '메뉴'+'\n'+'관리' }],
            list: [],
        }
    }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return (
                    <FirstRoute data={this.state.list} route={route} />
                )
            case 'second':
                return (
                    <SecondRoute data={this.state.list} route={route} />
                )
            case 'third':
                return (
                    <ThirdRoute route={route} />
                )
            default:
                return null;
        }
    }


    _onPress = () => {
        console.log('clickTest !!!');
    };

    _setIndex = (idx) => {
        this.setState({ index: idx });
    }

    onPressItem = (id) => {

        switch (id) {
            case 'main_outdoor':
                alert('준비중입니다!');
                break;
            case 'singong_1f':
                alert('준비중입니다!');
                break;
            case 'hyehwa_roof':
                alert('혜화관디저트카페');
                break;
            case 'economy_outdoor':
                alert('준비중입니다!');
                break;
            case 'munhwa_1f':

                break;
            case 'favorate_shop':
                alert('준비중입니다!');
                break;
        }
    }


    componentDidMount = () => {
        //console.log('key: ' + shopname);

        database().ref('shops/' + shopname).on('value', (snapshot) => {
            var li = []
            var index = 0;
            //snapshot: 날짜

            snapshot.forEach((childSnapShot) => {
                //ChildSnapshot : 주문 날짜
                var orderDate = childSnapShot.key;

                childSnapShot.forEach((child) => {
                    var phoneNumber = child.key;


                    child.forEach((menuChild) => {
                        var keyName = menuChild.key;

                        if (keyName.charAt(0) === '-') {
                            li.push({
                                //key : index++,
                                listSize: 1,
                                isGroup: false,
                                cost: menuChild.val().cost,
                                name: menuChild.val().name,
                                options: menuChild.val().options,
                                orderInfo: menuChild.val().orderInfo,
                                //key : orderInfo.orderTime,
                                key: keyName,
                                date:orderDate
                            })

                        }
                        else {
                            var groupSize = 1;
                            var monoMenu = [];
                            menuChild.forEach((groupMenu) => {
                                monoMenu.push({
                                    //key : index++,
                                    isGroup: true,
                                    listSize: groupSize++,
                                    cost: groupMenu.val().cost,
                                    name: groupMenu.val().name,
                                    options: groupMenu.val().options,
                                    orderInfo: groupMenu.val().orderInfo,
                                    //key : orderInfo.orderTime,
                                    key: groupMenu.key,
                                    date: orderDate
                                })
                            })
                            li.push({ groupOrder: monoMenu, });
                        }

                    })

                })
                //console.log('key: '+ childSnapShot.key);
                // childSnapShot.forEach((child) => {
                //     //child : group
                //     var group = [];
                //     group = child.val().group;
                //     console.log("!!! : " + JSON.stringify(child.key.charAt(0)));
                //     //console.log('group !!: ' + JSON.stringify(group[0].orderInfo));
                //     //console.log('size : ',group.length)
                //     li.push({
                //         //key : index++,
                //         listSize: group.length,
                //         cost : group[0].cost,
                //         name :  group[0].name,
                //         options :  group[0].options,
                //         orderInfo :  group[0].orderInfo,
                //         //key : orderInfo.orderTime,
                //     })

                // })

            })
            const Moment = require('moment')
            for (var k = 0; k < li.length; k++) {
                console.log("Test : ", li[k].hasOwnProperty('groupOrder'));
            }

            //li.sort((d2, d1) => new Moment(d2.orderTime, 'HH:mm:ss') - new Moment(d1.orderTime, 'HH:mm:ss'));

            this.setState({ list: li });

        })

    }


    sortListByTime() {
        this.state.list.sort(function (obj1, obj2) {
            // return obj1.cost - obj2.cost;
            //return new moment(obj1.orderTime). -new Date(obj2.orderTime).getTime().valueOf;
            var date1 = new Date(obj1.orderTime);
            var date2 = new Date(obj2.orderTime);
            return date2 - date1;
        });
        this.setState(previousState => (
            { list: previousState.list }
        ))
    }

    render() {
        return (

            <TabView
                style={{ backgroundColor: '#182335', }}
                navigationState={{ index: this.state.index, routes: this.state.routes }}
                renderScene={this.renderScene}
                onIndexChange={this._setIndex}
                initialLayout={initialLayout}

                renderTabBar={(props) => (
                    <View style={{ backgroundColor: '#182335',}}>
                        <TabBar
                            {...props}
                            indicatorStyle={{
                                backgroundColor: '#EEAF9D',
                                borderRadius: 20,
                                height: 80,
                                width: Dimensions.get('window').width / 9,
                                marginHorizontal: Dimensions.get('window').width / 9,
                            }}

                            style={{
                                backgroundColor: '#182335',
                                height: 80,
                                width: Dimensions.get('window').width,
                                justifyContent: 'center',
                                marginTop:20,
                            }}

                            getLabelText={({ route }) => (<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', paddingBottom: 5, textAlign: 'center' }}>{route.title}</Text>)}
                            tabStyle={{
                                width: Dimensions.get('window').width / 3,
                                // borderRightColor: 'white', borderWidth: 1, borderLeftColor: 'white'
                            }}
                        />
                    </View>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});