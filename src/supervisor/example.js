import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight, ScrollView  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from './styles';
import { PieChart } from 'react-native-chart-kit';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { Dimensions } from "react-native";
import { Line } from 'react-native-svg';
const screenWidth = Dimensions.get("window").width;

var data = [];

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



class sales extends React.PureComponent{

    constructor(props) {
        super(props);
        
        this.state = {
            totalCost: 0,
            todayCost: 0,
            tableHead: ["날짜", "금액", "품목", "누적금액"],
            widthArr: [150, 70, 90, 70],
            list: [],
            menu: [],
            menuCost: [],
            shopname: this.props.route.params.shopInfo,
        }
    }

    reverseData(li){
        var arr = [];
        for(var i = 0; i< li.length; i++){
            arr[i] = li[li.length - i - 1];
        }
        return arr;
    }

    randomColor(){
        return ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
    }

    sortListByCost() {
        this.state.menu.sort(function (obj1, obj2) {
            // return obj1.cost - obj2.cost;
            //return new moment(obj1.orderTime). -new Date(obj2.orderTime).getTime().valueOf;
            var cost1 = obj1.count;
            var cost2 = obj2.count;
            return cost2 - cost1;
        });
        this.setState(previousState => (
            { menu: previousState.menu }
        ))
    }

    componentDidMount(){
        //console.log('key: ' + shopname);
        var tampTotalCost = 0;
        database().ref('admin/' + this.state.shopname).once('value').then(snapshot => {
            var li = [];
            var tempMenu = [];
            var tempTotalCost = 0;
            //snapshot: 날짜
            snapshot.forEach((childSnapShot) => {
                //ChildSnapshot : 주문 날짜
                var orderDate = childSnapShot.key;
                childSnapShot.forEach((menuChild) => {
                    var keyName = menuChild.key;
                    tempTotalCost += menuChild.val().cost;
                    //if(orderDate === moment().format("YYYY_MM_DD")){
                    if(orderDate === "2020_09_20"){
                        this.setState({todayCost : this.state.todayCost + menuChild.val().cost})
                    }
                    li.push({
                        listSize: 1,
                        isGroup: false,
                        cost: menuChild.val().cost,
                        name: menuChild.val().name,
                        options: menuChild.val().options,
                        orderInfo: menuChild.val().orderInfo,
                        key: keyName,
                        date: orderDate,
                    })
                    var ix = 0;
                    while(ix<tempMenu.length){
                        if(tempMenu[ix].name === menuChild.val().name){
                            tempMenu[ix].count += menuChild.val().orderInfo.count;
                            break;
                        }
                        ix++;
                    }
                    if(ix === tempMenu.length){
                        tempMenu.push({
                            name: menuChild.val().name,
                            count: menuChild.val().orderInfo.count,
                            color: this.randomColor(),
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        })
                    }
                })
            })
            li = this.reverseData(li);

            this.setState({ menu: tempMenu });
            this.sortListByCost();
            console.log("tesnt >> " + this.state.menu);
            for(var i = 0;i<this.state.menu.length;i++){

                this.setState({menuCost: this.state.menuCost.concat(this.state.menu[i].count)});
            }
           
            this.setState({ totalCost: tempTotalCost });
            this.setState({ list: li });
            
        })
    }

    render(){ 
        const data = this.state.menu;
        console.log("testint >> " + data);
        return(
            <PieChart
                data={ data }
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="count"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />

    )}
}

const styles = StyleSheet.create({
    container: { flex: 7, padding: 16, paddingTop: 30, backgroundColor: '#fff', borderTopStartRadius: 50,borderTopEndRadius: 50 },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
  });

  export default sales