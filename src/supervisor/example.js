import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from './styles';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

export default class sales extends Component{

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            totalCost: 0,
            list: [],
            shopname: "hyehwa_roof",
        }
    }
    
    componentDidMount(){
        //console.log('key: ' + shopname);
        

        database().ref('admin/' + this.state.shopname).on('value', (snapshot) => {
            var li = []
            var index = 0;
            var tempTotalCost = 0;
            //snapshot: 날짜

            snapshot.forEach((childSnapShot) => {
                //ChildSnapshot : 주문 날짜
                var orderDate = childSnapShot.key;
                    childSnapShot.forEach((menuChild) => {
                        var keyName = menuChild.key;
                        this.state.totalCost += menuChild.val().cost;
                        console.log("cc >>> dd ?? " + menuChild.val().cost);
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
                    })
            })
            const Moment = require('moment')
        
            console.log("temptotalcost >>>>    " + this.state.totalCost);

            li.sort((d2, d1) => new Moment(d2.orderInfo.orderTime, 'HH:mm:ss') - new Moment(d1.orderInfo.orderTime, 'HH:mm:ss'));

            this.setState({ list: li });

        })
        for(var i = 0;i<this.state.list.length;i++){
            console.log("cccc >>  " + this.state.list[i].cost)
        }
    }
    render(){
       
        return(
            <Text>
                helloworld
            </Text>
        )
    }
}