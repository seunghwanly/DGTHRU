import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { OrderlistStyle } from './styles';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { exampleStyle } from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
const initialLayout = { width: Dimensions.get('window').width };

var list_temp;

const FirstRoute = (props) => (
    // 밑에 클래스에서 사용중인 this.state.list 를 여기 FlatList에 data에 꽂아야함 . 그걸 모르겠음.

    <View style={[styles.scene, { backgroundColor: 'lightblue' }]} >
        {console.log("시발 먼데여기" + list_temp)}
        <Text style={exampleStyle.orderlisttext}>helloo</Text>
        <FlatList
            data={props.data}
            numColumns={1}
            keyExtractor={item => item.key}
            scrollEnabled={true}
            renderItem={({ item }) => {
                return (
                    <View style={exampleStyle.listbox}>
                        <View stlye={exampleStyle.listContainer} >

                            <Text style={exampleStyle.orderlisttext}>{item.name}</Text>
                            <Text style={exampleStyle.orderlisttext}> {item.orderTime}</Text>
                            {/* <View style={exampleStyle.orderlistview}>
                                          <Button 
                                          style={exampleStyle.buttonstyle}
                                          title="승인취소" onPress={() => SetUnconfirm(shopname, item.date , item.phonenum, item.key)}></Button> 
                                          <Button  style={{margin:5}}
                                          title="주문승인" onPress={() => Setconfirm(shopname, item.date , item.phonenum, item.key)}></Button> 
                                          <Button  style={{margin:5}}
                                          title="준비완료" onPress={() => SetReady(shopname, item.date , item.phonenum, item.key)}></Button> 
                                      </View> */}
                        </View>
                    </View>)
            }}
        />


    </View>
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'lightblue' }]} />
);
const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'lightblue' }]} />
);

var shopname = '';
var phonenumber = '';
async function DeleteOrderList(key) {
    var userPath = 'hyehwa_roof/' + currentTime + '/+821012341234/' + key + '/';


    await database()
        .ref(userPath)
        .remove();
}

async function Setconfirm(shopname, date, phonenum, key) {
    database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key).update({ orderState: 'confirm' });
}

async function SetUnconfirm(shopname, date, phonenum, key) {
    database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key).update({ orderState: 'request' });
}

async function SetReady(shopname, date, phonenum, key) {
    database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key).update({ orderState: 'ready' });
}

export default class SupervisorOrderList extends Component {

    constructor(props) {
        super(props);
        shopname = "hyehwa_roof";

        this.state = {
            index: 0,
            routes: [{ key: 'first', title: 'First', datas: list_temp }, { key: 'second', title: 'Second' }, { key: 'third', title: 'Third' }],
            list: [],
        }
    }

    renderScene = ({ route }) => {
        switch(route.key) {
            case 'first':
                return(
                    <FirstRoute data={this.state.list}/>
                )
            case 'second':
                return(
                    <SecondRoute />
                )
            case 'third':
                return(
                    <ThirdRoute />
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

        database().ref('shops/' + shopname).on('value', (snapshot) => {
            var li = []
            snapshot.forEach((childSnapShot) => {
                var orderDate = childSnapShot.key
                childSnapShot.forEach((child) => {
                    var phonenumber = child.key
                    child.forEach((menuChild) => {
                        li.push({
                            key: menuChild.key,
                            phonenum: phonenumber,
                            date: orderDate,
                            name: menuChild.val().name,
                            orderTime: menuChild.val().orderTime,
                            cost: menuChild.val().cost,
                            count: menuChild.val().count,
                            cup: menuChild.val().cup,
                            shotnum: menuChild.val().shotnum,
                        })
                    })
                })

            })
            const Moment = require('moment')

            li.sort((d2, d1) => new Moment(d2.orderTime, 'HH:mm:ss') - new Moment(d1.orderTime, 'HH:mm:ss'));

            list_temp = li;
            //console.log('afterㅈㅈ? : ' , list_temp);
            this.setState({ list: li })
            // this.sortListByTime(li)
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
                navigationState={{ index: this.state.index, routes: this.state.routes }}
                renderScene={this.renderScene}
                onIndexChange={this._setIndex}
                initialLayout={initialLayout}
            />
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});