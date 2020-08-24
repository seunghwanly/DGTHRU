﻿import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

export default class Example extends Component {

    constructor(props){
        super(props);
        shopname =this.props.route.params.ShopInfo;
        console.log("params : ", shopname);
        this.state={ 
            list:[],
        } }


    

    componentDidMount(){
        database().ref('admin/' + shopname).on('value', (snapshot) =>{
                phonenumber = snapshot.val();
            })

        database().ref(shopname + '/' + currentTime +'/').on('value', (snapshot) =>{
            var li = []
            snapshot.forEach((childSnapShot) => {
            childSnapShot.forEach((child)=>{
                li.push({
                    key: child.key,
                    name:child.val().name,
                    orderTime:child.val().orderTime,
                    cost: child.val().cost,
                    count: child.val().count,
                    cup : child.val().cup
                })
            })

         
            
            })
            let sortedArray = li.sort((a, b) => a.orderTime.valueOf() - b.orderTime.valueOf())
            this.setState({list:sortedArray})
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
  
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>[{shopname}] : Order List</Text>
                    <FlatList style={{width:'100%'}}
                    data={this.state.list}
                    keyExtractor={item => item.key}
                    renderItem={({item})=>{
                    return(
                        <View>
                            <TouchableOpacity
                                style={{ 
                                    margin: 15, 
                                    backgroundColor:'dodgerblue', 
                                    width: '85%', 
                                    padding:10,
                                    borderRadius:10,
                                    
                                    alignItems:'center',
                                    justifyContent:'center',
                                

                                }}
                                onPress={() => DeleteOrderList(item.key)}
                                >
                                <Text style={{fontWeight:'bold', fontSize:15, color:'white'}}>{item.name}  {item.cup} {item.count}</Text>
                                <Text style={{fontWeight:'bold', fontSize:15, color:'white'}}> {item.orderTime}</Text>
                            </TouchableOpacity>
                        </View>)
                    }}
                />
            </View>
        );
    }
}
