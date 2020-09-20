import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from './styles';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;


const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

 

export default class sales extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            index: 0,
            totalCost: 0,
            list: [],
            monthList: [],
            shopname: this.props.route.params.shopInfo,
        }
    }

    sortListByTime(li) {
        li.sort(function (obj1, obj2) {
            // return obj1.cost - obj2.cost;
            //return new moment(obj1.orderTime). -new Date(obj2.orderTime).getTime().valueOf;
            var date1 = new Date(obj1.date);
            var date2 = new Date(obj2.date);
            return date1 - date2;
        });
        return li;
    }

    
    componentDidMount(){
        //console.log('key: ' + shopname);


        database().ref('admin/' + this.state.shopname).once('value').then(snapshot => {
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

            li = this.sortListByTime(li);
            
            for(var i = 0;i<li.length;i++){
                console.log("sort >>>>  " + li[i].date);
                console.log("sort >>>>  " + li[i].cost);
            }
            for(var i = 0;i<li.length;i++){
                if(li[i].date >= "2020_09_17"){
                    this.setState({
                        monthList: this.state.monthList.concat(li[i].date)
                    }); 
                }
                console.log("month >>>>  " + this.state.monthList[i])
            }
            console.log("dd >>>>  " + this.state.monthList);
            this.setState({ list: li });


        })
    }

    render(){
        return(<>
            <LineChart
               data={this.state.data}
                width={500}
                height={screenWidth}
                chartConfig={chartConfig}
            />
        </>)
    }
}
