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


const FirstRoute = (props) => (
    // 밑에 클래스에서 사용중인 this.state.list 를 여기 FlatList에 data에 꽂아야함 . 그걸 모르겠음.

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
                    <View stlye={exampleStyle.listContainer} >
                            <Text style={exampleStyle.orderlistText_Bold}>{item.name}</Text>
                            <Text style={exampleStyle.orderlistText_Thin}> 샷 추가 : {item.shotnum}</Text>
                            <Text style={exampleStyle.orderlistText_Thin}> 수량 : {item.count}</Text>
                            <Text style={exampleStyle.orderlistText_Thin}> 주문자 번호 : {item.phonenumber}</Text>
                <Text style={exampleStyle.orderlistText_Thin}> 주문시간 : {item.orderDate} {item.orderTime}</Text>
                <Text style={exampleStyle.orderlistText_Thin}> 옵 션 : {item.cup} / {item.type}</Text>
                            
                        </View>
                        
   
                        </View>
                    <View style={exampleStyle.listbox_center}>
                    <Text style={exampleStyle.orderlistPastTime}>경과시간</Text>
                    </View>
                    <View style={exampleStyle.listbox_right}>
                    <View style={exampleStyle.orderlistview}>
                                        <View style={exampleStyle.buttonstyle}>
                                          <Button color="#EEAF9D" width="20%" height="50%"
                                          title="승인취소" onPress={() => SetUnconfirm(shopname, item.date , item.phonenum, item.key)}></Button> 
                                          </View>
                                          
                                        <View style={exampleStyle.buttonstyle}>
                                          <Button color="#EEAF9D"
                                          title="주문승인" onPress={() => Setconfirm(shopname, item.date , item.phonenum, item.key)}></Button> 
                                          </View>
                                          
                                        <View style={exampleStyle.buttonstyle}>
                                          <Button color="#EEAF9D"
                                          title="준비완료" onPress={() => SetReady(shopname, item.date , item.phonenum, item.key)}></Button> 
                                         </View>
                                      </View>
                    </View>


                    </View>
                    )
            }}
        />


    </View>
);

const SecondRoute = (props) => (
    
    <View style={[styles.scene, { backgroundColor: 'lightblue' }]} >
                <View>
            <Text>안뇽ㅎㅎ</Text>
        </View>
<Text style={exampleStyle.orderlisttext}>{props.route.title}</Text>
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
            routes: [{ key: 'first', title: '주문현황' }, { key: 'second', title: '지난주문' }, { key: 'third', title: '메뉴' }],
            list: [],
        }
    }

    renderScene = ({ route }) => {
        switch(route.key) {
            case 'first':
                return(
                    <FirstRoute data={this.state.list} route= {route} />
                )
            case 'second':
                return(
                    <SecondRoute route= {route} />
                )
            case 'third':
                return(
                    <ThirdRoute route= {route} />
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
                            shotnum: menuChild.val().shotNum,
                            type: menuChild.val().type,
                        })
                    })
                })

            })
            const Moment = require('moment')

            li.sort((d2, d1) => new Moment(d2.orderTime, 'HH:mm:ss') - new Moment(d1.orderTime, 'HH:mm:ss'));

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
                style={{backgroundColor:'#182335'}}
                navigationState={{ index: this.state.index, routes: this.state.routes }}
                renderScene={this.renderScene}
                onIndexChange={this._setIndex}
                initialLayout={initialLayout}
                
                // renderTabBar={(props) => (
                //     <View style={{ backgroundColor:'#182335', }}>
                       
                //             <TabBar
                //                 {...props}
                //                 indicatorStyle={{ 
                //                     backgroundColor: '#EEAF9D',
                //                     borderRadius:20,
                //                     height:5,
                //                     justifyContent:'center',
                                    
                //                 }}
                                
                //                 style={{ 
                //                     backgroundColor: '#182335',
                //                     height: 50,
                //                     width: Dimensions.get('window').width,
                //                     justifyContent: 'center',
                //                 }}
                                
                //                 getLabelText={({ route }) => (<Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', paddingBottom: 5, textAlign: 'center' }}>{route.title}</Text>)}
                //                 tabStyle={{ width: '20%', }}
                              
                //             />
                //     </View>
                // )}
            />
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});