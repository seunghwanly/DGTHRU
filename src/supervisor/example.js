﻿import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from './styles';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';


var currentTime = moment().format('YYYY_MM_DD');
var shopname = '';
var phonenumber = '';
async function DeleteOrderList(key) {
    var userPath = 'hyehwa_roof/' + currentTime + '/+821012341234/' + key + '/';

    console.log(userPath);

    await database()
        .ref(userPath)
        .remove();
}

async function Setconfirm(shopname, date, phonenum, key){
    database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key).update({orderState: 'confirm'});
}

async function SetUnconfirm(shopname, date, phonenum, key){
    database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key).update({orderState: 'request'});
}

async function SetReady(shopname, date, phonenum, key){
    database().ref('shops/' + shopname + '/' + date + '/' + phonenum + '/' + key).update({orderState: 'ready'});
}

export default class Example extends Component {

    constructor(props){
        super(props);
        shopname = "hyehwa_roof";
        this.state={ 
            list:[],
        } }

    componentDidMount(){
        
        database().ref('shops/' + shopname).on('value', (snapshot) =>{
            var li = []
            snapshot.forEach((childSnapShot) => {
            var orderDate = childSnapShot.key
            childSnapShot.forEach((child)=>{
                var phonenumber = child.key
                child.forEach((menuChild)=>{
                    console.log('orderTime2 : ' , menuChild.val().orderTime)
                    li.push({
                        key: menuChild.key,
                        phonenum: phonenumber,
                        date: orderDate,
                        name: menuChild.val().name,
                        orderTime: menuChild.val().orderTime,
                        cost: menuChild.val().cost,
                        count: menuChild.val().count,
                        cup : menuChild.val().cup,
                        shotnum : menuChild.val().shotnum,
                    })
                })
            })
            
            })
            const Moment = require('moment')
            console.log('what? : ' , li);
            li.sort((d2, d1) => new Moment(d2.orderTime,'HH:mm:ss') - new Moment(d1.orderTime,'HH:mm:ss'));
            console.log('after? : ' , li);
            this.setState({list:li})
           // this.sortListByTime(li)
        })
     
    }

    //deleteItem(k) {
    //    let forward = this.state.list.slice(0,k)
    //    //console.log(`for : `,forward);
      
        

    //    for(var i = k + 1;k<this.state.list.length;i++){
    //        this.state.list[i].index = this.state.list[i].index - 1;
    //    }

    //    let back = this.state.list.slice(k+1,this.state.list.length)
    //    //console.log(`back : `,back);
      
    //    let total = forward.concat(back)	//forward¿¡ back ºÙÀÌ±ë
    //    //console.log(`total : `,total);
    //    this.setState({
    //        list:total
    //    })
    //}

    //deleteorderlist(k){
    //    var arr = this.state.list;
    //    this.setState({
    //        list: arr.filter(arr => arr.key !== k)
    //    })

    //    await database()
    //    .ref('hyehwa_roof/2020_08_22/+821012341234/' + k)
    //    .remove();
    //}

    

    // componentDidMount() {
    //   //const currentUser = auth().currentUser.uid;
    //   database().ref('hyehwa_roof/2020_08_21')
    //     .on('value', snapshot => {
    //       const lists = _.map(snapshot.val(), (uid) => {
    //         return {uid}
    //       });
    //       this.setState({lists, loading: false})
    //     })
    // } 
    //  renderItem({item}) {
    //   return (
    //       <ListItem item={item} />
    //     )
    // }

    sortListByTime(){
        this.state.list.sort(function(obj1, obj2) {
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
            <View style={exampleStyle.background}>
                <Text>[{shopname}] : Order List</Text>
                    <FlatList style={{width:'100%'}}
                    data={this.state.list}
                    keyExtractor={item => item.key}
                    renderItem={({item})=>{
                    return(
                        <View  style={exampleStyle.listbox}>    
                            <Text style={exampleStyle.orderlisttext}>{item.name}  {item.cup} {item.count}</Text>
                            <Text style={exampleStyle.orderlisttext}> {item.orderTime}</Text>
                            <View style={exampleStyle.orderlistview}>
                                <Button 
                                style={exampleStyle.buttonstyle}
                                title="승인취소" onPress={() => SetUnconfirm(shopname, item.date , item.phonenum, item.key)}></Button> 
                                <Button  style={{margin:5}}
                                title="주문승인" onPress={() => Setconfirm(shopname, item.date , item.phonenum, item.key)}></Button> 
                                <Button  style={{margin:5}}
                                title="준비완료" onPress={() => SetReady(shopname, item.date , item.phonenum, item.key)}></Button> 
                            </View>
                        </View>)
                    }}
                />
            </View>
        );
    }
}
