import React, { Component, useEffect, } from 'react';
import { Platform, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
import { withTheme } from 'react-native-elements';
import { exampleStyle } from '../styles';
import { _setPickUpTime , _setCompleteTime , _setConfirmTime , _stringConverter, DeleteOrderList , Setconfirm , SetUnconfirm , SetReady , SetRemove ,
    addToAdmin , } from '../tabs/tabFunctions'

import { LineChart, PieChart } from 'react-native-chart-kit';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import database from '@react-native-firebase/database';
import LineGraph from '@chartiful/react-native-line-graph';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { Line } from 'react-native-svg';
const screenWidth = Dimensions.get("window").width * (4/9);
var currDate = moment().format("YYYY_MM_DD");    

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
                tableHead: ["날짜", "일 매출", "누적 매출"],
                tableWidthArr: [screenWidth * 0.3, screenWidth*0.3, screenWidth*0.3],
                tableData: [],
                dateData: [],
                costData: [],
                list: [],
                menu: [],
                shopname: this.props.shopname,
            }
        }
    
        randomColor(){return ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);}

        onPress(months){
            var datelimit;
            if(months === 0)
                datelimit = "1990_01_01";
            else
                datelimit = moment().subtract(months, 'months').format("YYYY_MM_DD");

            var len = this.state.dateData.length, newTableData = [], index = len;

            for(var i = len - 1;i>= 0;i--){
                var accumCost = 0;
                const rowData = [];
                if(this.state.dateData[i] < datelimit){
                    index = i;
                    this.setState({totalCost: 0});
                    continue;
                } 

                for(var j = index - 1;j>=i; j--)
                    accumCost += this.state.costData[j];
                
                rowData = rowData.concat(this.state.dateData[i]).concat(this.state.costData[i]).concat(accumCost);
                this.setState({totalCost: accumCost});
                newTableData.push(rowData);
            }
            var tmp = [];
            for(var i = 0;i<newTableData.length;i++){
                tmp[i] = this.state.list[this.state.list.length - i - 1];
            }
            console.log("press >> " + newTableData);
            this.setState({tableData: this.reverse(newTableData)});
        }
    
        reverse(li){
            var tmp = [];
            for(var i = 0;i<li.length;i++){
                tmp[i] = li[li.length - i - 1];
            }
            return tmp;
        }

        sortListByDate() {
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
            database().ref('admin/' + this.state.shopname).once('value').then(snapshot => {
                var li = [];
                var tempMenu = [];
                //snapshot: 날짜
                snapshot.forEach((childSnapShot) => {
                    //ChildSnapshot : 주문 날짜
                    var orderDate = childSnapShot.key;
                    childSnapShot.forEach((menuChild) => {
                        var keyName = menuChild.key;
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
                this.setState({list: li });
                this.sortListByDate();
                this.setState({list: this.reverse(this.state.list)});


                li = this.state.list;
                var dateColumn = [], costColumn = [], tableColumn = [];
                var len = this.state.list.length, prevDate, sum = 0;;
                for(var i = 0;i< len;i++){
                    if((i === 0) || (prevDate !== li[i].date)){
                        dateColumn.push(li[i].date);
                        costColumn.push(li[i].cost);
                    }
                    else{
                        costColumn[costColumn.length - 1] += li[i].cost;
                    }
                    prevDate = li[i].date;
                }
                
                for (var i = 0; i <dateColumn.length; i++) {
                    const rowData = [];
                    var accumCost = 0;
                    for(var j = i;j<dateColumn.length; j+=1)
                        accumCost += costColumn[j];
                    rowData = rowData.concat(dateColumn[i]).concat(costColumn[i]).concat(accumCost);
                    tableColumn.push(rowData);
                    sum+=costColumn[i];
                }
                this.setState({dateData: dateColumn, costData: costColumn, tableData: tableColumn, totalCost: sum});
            })
        }
    
        render(){ 
            return(
                <SafeAreaView style={styles.backgroundStyle}>
                <ScrollView style={{margin: 20}}>
                    <View style = {{flexDirection: 'row'}}>
                    <View style={styles.leftArea}>
                            <Text style = {styles.subTitle}>총 매출 : {this.state.totalCost}</Text>
                            <View style={styles.buttonArea}>
                                    <TouchableOpacity style={styles.button} onPress={() => this.onPress(1)}>
                                        <Text style={styles.buttonText}>1개월</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => this.onPress(3)}>
                                        <Text style={styles.buttonText}>3개월</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => this.onPress(6)}>
                                        <Text style={styles.buttonText}>6개월</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => this.onPress(0)}>
                                        <Text style={styles.buttonText}>전체</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal={true}>
                                    <View>
                                        <Table borderStyle={{borderWidth: 1, borderColor: '#f0fff0'}}>
                                            <Row 
                                                data={this.state.tableHead} 
                                                widthArr={this.state.tableWidthArr} 
                                                style={styles.header} 
                                                textStyle={styles.text}
                                            />
                                        </Table>
                                        <ScrollView style={styles.dataWrapper}>
                                            <Table borderStyle={{borderWidth: 1, borderColor: '#f0fff0',}}>
                                                {this.state.tableData.map((rowData, index) => (
                                                <Row
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={this.state.tableWidthArr}
                                                    style={[styles.row, index%2 && {backgroundColor: '#f5fffa'}]}
                                                    textStyle={styles.text}
                                                />
                                                ))}
                                            </Table>
                                        </ScrollView>
                                    </View>
                                </ScrollView>
                            </View>
                        <View style = {styles.rightArea}>
                            <View style = {styles.pieChartArea}>
                                <Text style = {styles.subTitle}>인기메뉴</Text>
                                <PieChart
                                    data={this.state.menu}
                                    width={screenWidth * 0.90}
                                    height={220}
                                    chartConfig={chartConfig}
                                    accessor="count"
                                    backgroundColor="#fffafa"
                                    paddingLeft="15"
                                    absolute
                                />
                            </View>
                            <View style = {styles.lineGraphArea}>
                                <Text style = {styles.subTitle}>매출 추이</Text>
                                <ScrollView horizontal={true} style = {{margin: 20,}}>
                                <LineGraph
                                    data={this.state.costData}
                                    width={screenWidth}
                                    height={250}
                                    isBezier
                                    lineColor='#EEAF9D'
                                    dotColor='#cd5c5c'
                                    hasShadow
                                    baseConfig={{
                                        startAtZero: true,
                                        hasXAxisBackgroundLines: true,
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
        backgroundStyle: {
            flex: 10, 
            margin: 15, 
            backgroundColor: 'white', 
            flexDirection: 'row', 
            borderTopStartRadius: 30, 
            borderTopEndRadius: 30,
        },
        leftArea: { 
            flex: 5, 
            margin: 20, 
            padding: 16, 
            alignItems: 'center', 
            paddingTop: 30, 
            backgroundColor: '#fffafa',
            borderRadius: 20,
            paddingTop: 20,
            shadowColor: "#333",
            shadowOffset: {
                width: 1,
                height: 2,
            },
            shadowOpacity: 0.365,
            shadowRadius: 1,
            elevation: 5 
        },
        header: { 
            height: 50, 
            backgroundColor: '#87cefa',
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
        },
        text: { 
            textAlign: 'center', 
            fontWeight: '100' 
        },
        subTitle: {
            color: 'black', 
            fontSize: 20, 
            //font: 'bold', 
            textAlign: 'center',
        },
        buttonArea:{
            flexDirection: 'row', 
            margin: 5, 
            width: "80%", 
            height: "10%", 
            alignItems: 'center'
        },
        button: {
            borderRadius: 20,
            backgroundColor: '#EEAF9D',
            width: '22%',
            height: '70%',
            margin: 5,
            alignItems: 'center',
            alignContent: 'center',
            textAlignVertical: 'center',
        },
        buttonText: {
            color: 'white',
            padding: 10,
            fontSize: 20,
        },
        dataWrapper: { 
            marginTop: -1 
        },
        rightArea: {
            flex : 5, 
            flexDirection: 'column',
            margin: 10,
        },
        pieChartArea:{
            flex: 3,
            backgroundColor: '#fffafa',
            width: screenWidth * 0.9,
            borderRadius: 20,
            paddingTop: 20,
            alignItems: 'center',
            margin: 10,
            shadowColor: "#333",
            shadowOffset: {
                width: 1,
                height: 2
            },
            shadowOpacity: 0.365,
            shadowRadius: 1,
            elevation: 5
        },
        lineGraphArea:{
            flex : 2, 
            margin: 20, 
            alignItems: 'center', 
            backgroundColor: '#fff',
            borderRadius: 20,
            paddingTop: 20,
            //padding: 5,
            width: screenWidth * 0.9,
            margin: 10,
            backgroundColor: "#fffafa",
            shadowColor: "#333",
            shadowOffset: {
                width: 1,
                height: 2,
            },
            shadowOpacity: 0.365,
            shadowRadius: 1,
            elevation: 5
        },
        row: { 
            height: 40, 
            backgroundColor: '#e0ffff' 
        },
      });
