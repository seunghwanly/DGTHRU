import React, { Component, useEffect, } from 'react';
import { Platform, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
import { withTheme } from 'react-native-elements';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from '../styles';
import { _setPickUpTime , _setCompleteTime , _setConfirmTime , _stringConverter, DeleteOrderList , Setconfirm , SetUnconfirm , SetReady , SetRemove ,
    addToAdmin , } from '../tabs/tabFunctions'

import { LineChart, PieChart } from 'react-native-chart-kit';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import database from '@react-native-firebase/database';
import LineGraph from '@chartiful/react-native-line-graph';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
//import { Dimensions } from "react-native";
import { Line } from 'react-native-svg';
const screenWidth = Dimensions.get("window").width * (4/9);
    
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
    
   export default class ThirdRoute extends React.PureComponent{
    
        constructor(props) {
            super(props);
            
            this.state = {
                totalCost: 0,
                tableHead: ["날짜", "금액", "품목", "개수", "누적금액"],
                tableWidthArr: [150, 70, 90, 70, 70],
                list: [],
                menu: [],
                
                shopname: this.props.shopname,
            }
        }
    
        randomColor(){return ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);}
    
        revert(){
            var tmp = []
            for(var i = 0;i<this.state.list.length;i++){
                tmp[i] = this.state.list[this.state.list.length - i - 1];
            }
            this.setState({list : tmp});
        }

        sortListByTime() {
            this.state.list.sort(function (obj2, obj1) {
                // return obj1.cost - obj2.cost;
                //return new moment(obj1.orderTime). -new Date(obj2.orderTime).getTime().valueOf;
                var date1 = new Date(obj1.orderDate);
                var date2 = new Date(obj2.orderDate);
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
                tempMenu = this.sortListByCount(tempMenu);
                
                if(tempMenu.length > 5){
                    for(var i = 0;i<5;i++)
                        this.setState({menu: this.state.menu.concat(tempMenu[i])});
                }
                else{
                    this.setState({menu : tempMenu});
                }   
                this.setState({ totalCost: tempTotalCost, list: li });
                this.sortListByTime();
                this.revert();
                
                
            })
        }
    
        render(){ 
            var tableData = [];
            var li = this.state.list;
            var lineGraphHead = [];
            var datasets = [];
            var lineGraphCost = [];
            var listLength = this.state.list.length, prevDate;
            for(var i = 0;i< listLength;i++){
                //lineGraphHead.push(li[i].date);
                //lineGraphCost.push(li[i].cost);
                if((i === 0) || (prevDate !== li[i].date)){
                    lineGraphHead.push(li[i].date);
                    lineGraphCost.push(li[i].cost);
                }
                else{
                    lineGraphCost[lineGraphCost.length - 1] += li[i].cost;
                }
                prevDate = li[i].date;
                console.log("linedata : " + lineGraphCost);
            }

            for (var i = 0; i < this.state.list.length; i++) {
                const rowData = [];
                var accumCost = 0;
                for(var j = i;j<this.state.list.length; j+=1)
                    accumCost += this.state.list[j].cost;
                
                rowData = rowData.concat(this.state.list[i].date)
                .concat(this.state.list[i].cost)
                .concat(this.state.list[i].name)
                .concat(this.state.list[i].options.count)
                .concat(accumCost);
                
                tableData.push(rowData);
            }
    
            var lineGraphdata = {
                labels: lineGraphHead,
                datasets: [
                {
                    data: [20, 10, 0, 30, 40, 20, 20],
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }],
                legend: ["Rainy Days"] // optional
            };
            return(
                <SafeAreaView style={{flex: 10, backgroundColor: 'white', flexDirection: 'row', borderTopStartRadius: 30, borderTopEndRadius: 30,}}>
                <ScrollView style={{margin: 20}}>
                    <View style = {{flexDirection: 'row',}}>
                    <View style={styles.container}>
                            <Text style = {{color: 'black', fontSize: 15, font: 'bold', textAlign: 'center'}}>총 매출 : {this.state.totalCost}</Text>
                                <ScrollView horizontal={true}>
                                    <View>
                                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                            <Row data={this.state.tableHead} widthArr={this.state.tableWidthArr} style={styles.header} textStyle={styles.text}/>
                                        </Table>
                                        <ScrollView style={styles.dataWrapper}>
                                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                                {tableData.map((rowData, index) => (
                                                <Row
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={this.state.tableWidthArr}
                                                    style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                                    textStyle={styles.text}
                                                />
                                                ))}
                                            </Table>
                                        </ScrollView>
                                    </View>
                                </ScrollView>
                            </View>
                        <View style = {{flex : 5, flexDirection: 'column', margin: 20,}}>
                            <View style = {{flex: 3,backgroundColor: '#fff',
                                            borderRadius: 20,
                                            paddingTop: 20,
                                            padding: 5,
                                            margin: 20,
                                            shadowColor: "#333",
                                            shadowOffset: {
                                                width: 1,
                                                height: 2
                                            },
                                            shadowOpacity: 0.365,
                                            shadowRadius: 1,
                                            elevation: 5}}>
                                <Text style = {{color: 'hotpink', fontSize: 20, font: 'bold', textAlign: 'center'}}>매뉴 별 매출현황</Text>
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
                            <View style = {{flex : 2, margin: 20, alignItems: 'center', backgroundColor: '#fff',
                                            borderRadius: 20,
                                            paddingTop: 20,
                                            padding: 5,
                                            shadowColor: "#333",
                                            shadowOffset: {
                                                width: 1,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.365,
                                            shadowRadius: 1,
                                            elevation: 5}}>
                                <Text style = {{color: 'hotpink', fontSize: 20, font: 'bold', textAlign: 'center'}}>매출 추이{'\n'}</Text>
                                <ScrollView horizontal={true}>
                                <LineGraph
                                    data={lineGraphCost}
                                    Labels={lineGraphHead}
                                    width={screenWidth}
                                    height={300}
                                    isBezier
                                    lineColor='pink'
                                    hasShadow
                                    baseConfig={{
                                    startAtZero: true,
                                    hasXAxisBackgroundLines: true,
                                    hasXAxisLabels: true,
                                    }}
                                    style={{
                                    marginTop: 30,
                                    alignItems: 'center',
                                }}
                            />
                            </ScrollView>
                        </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
                
        )}
    }
    
    const styles = StyleSheet.create({
        container: { flex: 5, margin: 30, padding: 16, alignItems: 'center', paddingTop: 30, backgroundColor: '#fff',
        borderRadius: 20,
        paddingTop: 20,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.365,
        shadowRadius: 1,
        elevation: 5 },
        header: { height: 50, backgroundColor: '#537791' },
        text: { textAlign: 'center', fontWeight: '100' },
        dataWrapper: { marginTop: -1 },
        row: { height: 40, backgroundColor: '#E7E6E1' }
      });
