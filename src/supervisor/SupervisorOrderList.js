import React, { Component, useEffect, useState, } from 'react';
import { Platform, Dimensions, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { OrderlistStyle } from './styles';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { exampleStyle } from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Moment from 'moment';
import moment from 'moment';
import imageLinker from '../utils/ImageLinker';
import FirstRoute from './tabs/OrderManagementPage/firstRoute';
import SecondRoute from './tabs/OrderManagementPage/secondRoute';
import ThirdRoute from './tabs/thirdRoute';
import OrderManagement from './tabs/OrderManagement';
import MenuManagement from './tabs/MenuManagement';
const initialLayout = { width: Dimensions.get('window').width };

var shopname = '';
var phonenumber = '';


export default class SupervisorOrderList extends Component {

    constructor(props) {
        super(props);
        shopname = "hyehwa_roof";

        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: '매장관리' },
                { key: 'second', title: '메뉴관리' },
                { key: 'third', title: '매출관리' },
                { key: 'fourth', title: '마이메뉴' },
            ],
            list: [],
            pastList: [],
            pageIndex : 0
        }
    }
    setCurrentPage = index => {
        this.setState({ pageIndex : index });
    }

    renderScene = ({ route }) => {

        switch (route.key) {
            case 'first':
                return (
                    <>
                        {
                            this.state.pageIndex === 0 ?
                                <OrderManagement
                                    data={this.state.list}
                                    pastData={this.state.pastList}
                                    route={route}
                                    onPressFunction={this.setCurrentPage}
                                />
                                :
                                this.state.pageIndex === 1 ?
                                    <FirstRoute 
                                        data={this.state.list} 
                                        route={route} 
                                        onPressFunction={this.setCurrentPage}   
                                        />
                                    :
                                    this.state.pageIndex === 2 ?
                                        <SecondRoute 
                                            data={this.state.pastList} 
                                            route={route}
                                            onPressFunction={this.setCurrentPage}   
                                            />
                                        :
                                        <></>
                        }
                    </>
                )
            case 'second':
                return (
                    <MenuManagement shopname={'hyehwa_roof'}/>
                )
            case 'third':
                return (
                    <ThirdRoute route={route} />
                )
            case 'fourth':
                return (
                    <>
                    </>
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
                                date: orderDate
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


            //li.sort((d2, d1) => new Moment(d2.orderInfo.orderTime, 'HH:mm:ss') - new Moment(d1.orderInfo.orderTime, 'HH:mm:ss'));
            this.setState({ list: li });

        })

        database().ref('admin/' + shopname).on('value', (snapshot) => {
            var li = []
            var index = 0;
            //snapshot: 날짜


            snapshot.forEach((childSnapShot) => {
                //ChildSnapshot : 주문 날짜
                var orderDate = childSnapShot.key;
                childSnapShot.forEach((menuChild) => {
                    var keyName = menuChild.key;

                    if (menuChild.val().orderInfo.orderState == 'ready') {
                        //console.log('레 디 상 태 !')
                    }

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
                        date: menuChild.val().date,
                    })




                })



            })
            //console.log(JSON.stringify(li));
            li.sort((d2, d1) => new Moment(d2.orderInfo.orderTime, 'HH:mm:ss') - new Moment(d1.orderInfo.orderTime, 'HH:mm:ss'));

            this.setState({ pastList: li });

        })

        this.setCurrentPage;
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
                    <View style={{ backgroundColor: '#182335', }}>
                        <TabBar
                            {...props}
                            indicatorStyle={{
                                backgroundColor: '#EEAF9D',
                                borderRadius: 20,
                                height: '100%',
                                // width: Dimensions.get('window').width / 7,
                                width: Dimensions.get('window').width / 10,
                                // marginHorizontal: Dimensions.get('window').width / 9,
                                marginHorizontal: '4%'
                            }}

                            style={{
                                backgroundColor: '#182335',
                                height: 100,
                                width: Dimensions.get('window').width,
                                justifyContent: 'center',
                                marginTop: 20,
                            }}

                            getLabelText={({ route }) => (<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', paddingBottom: 5, textAlign: 'center' }}>{route.title}</Text>)}
                            tabStyle={{
                                width: Dimensions.get('window').width / 4,
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
