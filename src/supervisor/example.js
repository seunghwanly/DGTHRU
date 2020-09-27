import React, { Component } from 'react';
import { Platform, 
    StyleSheet, 
    Text, View,Image, 
    TextInput, Alert, 
    FlatList, ListItem, 
    Button, TouchableHighlight, 
    SafeAreaView, ScrollView  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LineChart, PieChart } from 'react-native-chart-kit';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { Dimensions } from "react-native";
import { Line } from 'react-native-svg';
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

class sales extends React.PureComponent{

    constructor(props) {
        super(props);
        
        this.state = {
            totalCost: 0,
            tableHead: ["날짜", "금액", "품목", "개수", "누적금액"],
            widthArr: [150, 70, 90, 70, 70],
            list: [],
            menu: [],
            accum: [],
            shopname: this.props.route.params.shopInfo,
        }
    }

    randomColor() {return ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);}

    sortListByTime() {
        this.state.list.sort(function (obj2, obj1) {
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


    sortListByCount(tempMenu) {
        tempMenu = tempMenu.sort(function (obj1, obj2) {
            // return obj1.cost - obj2.cost;
            //return new moment(obj1.orderTime). -new Date(obj2.orderTime).getTime().valueOf;
            var count1 = obj1.count;
            var count2 = obj2.count;
            return count2 - count1;
        });
        return tempMenu;
    }

    componentDidMount(){
        //console.log('key: ' + shopname);
        var tempTotalCost = 0;
        database().ref('admin/' + this.state.shopname).once('value').then(snapshot => {
            var li = [];
            var tempMenu = [];
            //snapshot: 날짜
            snapshot.forEach((childSnapShot) => {
                //ChildSnapshot : 주문 날짜
                var orderDate = childSnapShot.key;
                childSnapShot.forEach((menuChild) => {
                    var keyName = menuChild.key;
                    tempTotalCost += menuChild.val().cost;
                    // list 에 추가
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
                    // menu에 추가
                    var ix = 0;
                    while(ix < tempMenu.length){
                        if(tempMenu[ix].name === menuChild.val().name){
                            tempMenu[ix].count += menuChild.val().options.count
                            break;
                        }
                        ix++;
                    }
                    if(ix === tempMenu.length){
                        tempMenu.push({
                            name: menuChild.val().name,
                            count: menuChild.val().options.count,
                            cost: menuChild.val().cost,
                            date: orderDate,
                            color: this.randomColor(),
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        });
                    }
                })
            })

            const Moment = require('moment');
            li.sort((d1, d2) => new Moment(d1.orderDate, "YYYY_MM_DD") - new Moment(d2.orderDate, "YYYY_MM_DD"));
            tempMenu = this.sortListByCount(tempMenu);

            for(var i = 0;i<5;i++){
                console.log("tempmenu : " + tempMenu[i].cost);
            }

            if(tempMenu.length > 4){
                for(var i = 0;i<4;i++){
                    this.setState({menu: this.state.menu.concat(tempMenu[i])});
                }
            }
            else{
                this.setState({menu : tempMenu});
            }   
            this.setState({ totalCost: tempTotalCost });
            this.setState({ list: li });
            this.sortListByTime();
        })
    }

    render(){ 
        var tableData = [];
        var graphHead = [];
        var datasets = [];
        var lineGraphCost = [];
        for (let i = 0; i < this.state.list.length; i += 1) {
            graphHead = graphHead.concat(this.state.list[i].date);
            lineGraphCost = lineGraphCost.concat(this.state.list[i].cost / 100);

            const rowData = [];
            var accumCost = 0;
            for(var j = i;j<this.state.list.length; j+=1){
                accumCost += this.state.list[j].cost;
            }
            rowData = rowData.concat(this.state.list[i].date);
            rowData = rowData.concat(this.state.list[i].cost);
            rowData = rowData.concat(this.state.list[i].name);
            rowData = rowData.concat(this.state.list[i].options.count);
            rowData = rowData.concat(accumCost);

            console.log("linedata : " + lineGraphCost);
            tableData.push(rowData);
        }

        const lineGraphdata = {
            labels: graphHead,
            datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
                }
            ],
            legend: ["Rainy Days"] // optional
        };
        
        

        return(
            <SafeAreaView style={{flex: 9}}>
                <ScrollView style={{marginHorizontal: 20,}}>
                    <View style = {{flex: 3,}}>
                        <Text style = {{color: 'pink', fontSize: 20, font: 'bold', textAlign: 'center'}}>매뉴 별 매출현황</Text>
                        <PieChart
                            data={this.state.menu}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="count"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style = {{color: 'black', fontSize: 15, font: 'bold', textAlign: 'center'}}>총 매출 : {this.state.totalCost}</Text>
                        <ScrollView horizontal={true}>
                            <View>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header} textStyle={styles.text}/>
                                </Table>
                                <ScrollView style={styles.dataWrapper}>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                            {tableData.map((rowData, index) => (
                                            <Row
                                                key={index}
                                                data={rowData}
                                                widthArr={this.state.widthArr}
                                                style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                                textStyle={styles.text}
                                            />
                                            ))}
                                    </Table>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                    <ScrollView horizontal={true}>
                        <LineChart
                            data={lineGraphdata}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                        />
                    </ScrollView>
                </ScrollView>
            </SafeAreaView>
    )}
}

const styles = StyleSheet.create({
    container: { flex: 3, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
  });

export default sales