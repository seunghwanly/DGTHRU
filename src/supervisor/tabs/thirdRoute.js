import React, { Component, useEffect, } from 'react';
import { Platform, Modal, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Text, View, 
    Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
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
                currency: [],
                list: [],
                menu: [],
                tableModalVisible: false,
                lineGraphModalViaible: false,
                PieChartModalVisible: false,
                shopname: this.props.shopname,
            }
        }

        settableModalVisible = (visible) => {
            this.setState({ tableModalVisible: visible });
        }
        setlineGraphModalViaible = (visible) => {
            this.setState({ lineGraphModalViaible: visible });
        }
        setPieChartModalVisible = (visible) => {
            this.setState({ PieChartModalVisible: visible });
        }
    
        randomColor(){return ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);}

        onPress(months){

            if(this.state.costData.length === 2 && this.state.costData[0] === 0){
                return;
            }
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
                
                rowData = rowData.concat(this.state.dateData[i]).concat(this.numberWithCommas(this.state.costData[i])).concat(this.numberWithCommas(accumCost));
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

        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            console.log("datr >> " + this.state.list.date);
        }

        sortListByCount(tempMenu) {
            tempMenu = tempMenu.sort(function (obj1, obj2) {
                // return obj1.cost - obj2.cost;
                //return new moment(obj1.orderTime). -new Date(obj2.orderTime).getTime().valueOf;
                var count1 = obj1.count;
                var count2 = obj2.count;
                return count2 - count1;
            });

            var piecolor = [];
            piecolor.push('#162338');
            piecolor.push('#f5deb3');
            piecolor.push('#4D7ACA');
            piecolor.push('#536178');
            piecolor.push('#eaaf9d');


            var i = 0;
            while(i < tempMenu.length){
                console.log("color >> " + tempMenu[i].color + '\n');
                if(i >= 5)
                break;
                tempMenu[i].color = piecolor[i];
                console.log("color >> " + tempMenu[i].color + '\n');
                i++;
            }
            return tempMenu;
        }
    
        componentDidMount(){
            database().ref('admin/' + this.state.shopname).on('value', snapshot => {
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

                var currencyli = [];
                for(var i = 0;i<costColumn.length;i++){
                   currencyli.push(this.numberWithCommas(costColumn[i]));
                }
                
                for (var i = 0; i <dateColumn.length; i++) {
                    const rowData = [];
                    var accumCost = 0;
                    for(var j = i;j<dateColumn.length; j+=1)
                        accumCost += costColumn[j];
                    rowData = rowData.concat(dateColumn[i]).concat(currencyli[i]).concat(this.numberWithCommas(accumCost));
                    tableColumn.push(rowData);
                    sum+=costColumn[i];
                }
                
                // 라인그래프에서 데이터가 1개 이하면 에러가 뜸, 2개 이상으로 만들어 주기 위함
                if(costColumn.length === 1){
                    costColumn.push(0);
                    dateColumn.push("0");
                    costColumn=this.reverse(costColumn);
                    dateColumn=this.reverse(dateColumn);
                }
                else if(costColumn.length === 0){
                    for(var i = 0;i<2;i++)
                        costColumn.push(0);
                        dateColumn.push("0");
                }
                
                //costColumn = this.reverse(costColumn);
                currencyli = this.reverse(currencyli);
               
                this.setState({dateData: dateColumn, costData: costColumn, currency: currencyli, tableData: tableColumn, totalCost: sum});
            })
        }
    
        render(){ 
            return(
                <SafeAreaView style={styles.backgroundStyle}>
                    <ScrollView scrollEnabled={false} style={{margin: 15}}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.tableModalVisible}
                            onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            }}
                        >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style = {{marginBottom: 15,}}>
                                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>총 매출 : {this.state.totalCost}원</Text>
                                </View>
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
                                            <Table borderStyle={{borderWidth: 1, borderColor: '#e6e6fa'}}>
                                                <Row 
                                                    data={this.state.tableHead} 
                                                    widthArr={this.state.tableWidthArr} 
                                                    style={styles.header} 
                                                    textStyle={styles.text}
                                                />
                                            </Table>
                                            <ScrollView style={styles.dataWrapper}>
                                                <Table borderStyle={{borderWidth: 1, borderColor: '#e6e6fa',}}>
                                                    {this.state.tableData.map((rowData, index) => (
                                                    <Row
                                                        key={index}
                                                        data={rowData}
                                                        widthArr={this.state.tableWidthArr}
                                                        style={[styles.row, index%2 && {backgroundColor: '#f2f2f2'}]}
                                                        textStyle={styles.tableText}
                                                    />
                                                    ))}
                                                </Table>
                                            </ScrollView>
                                        </View>
                                    </ScrollView>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "#162338" }}
                                        onPress={() => {this.settableModalVisible(false);}}
                                    >
                                        <Text style={styles.textStyle}>    닫기    </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.lineGraphModalViaible}
                            onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.ModalLineGraph}>
                                    <Text style={{ textAlign: 'center', fontSize: 20,}}>매출 추이(원)</Text>
                                    <ScrollView horizontal={true} >
                                    <LineGraph
                                        data={this.reverse(this.state.costData)}
                                        width={screenWidth*1.5}
                                        height={300}
                                        labels={this.state.dateData}
                                        lineColor='#162338'
                                        dotColor='#162338'
                                        hasShadow={true}
                                        baseConfig={{
                                            startAtZero: true,
                                            //hasXAxisBackgroundLines: true,
                                            //hasYAxisLabels: true,
                                            xAxisLabelStyle: {
                                                //suffix: '원',
                                                //offset: 0,
                                                //position: "right",
                                            }

                                        }}
                                        style={{
                                            marginTop: 20,
                                            alignItems: 'center',
                                        }}
                                    />
                                        </ScrollView>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "#162338" }}
                                        onPress={() => {this.setlineGraphModalViaible(false);}}
                                    >
                                        <Text style={styles.textStyle}>    닫기    </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.PieChartModalVisible}
                            onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={{ textAlign: 'center', fontSize: 20,}}>인기메뉴</Text>
                                    <PieChart
                                        data={this.state.menu}
                                        width={screenWidth}
                                        height={180}
                                        chartConfig={chartConfig}
                                        accessor="count"
                                        backgroundColor="white"
                                        paddingLeft="15"
                                        absolute
                                    />
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "#162338" }}
                                        onPress={() => {this.setPieChartModalVisible(false);}}
                                    >
                                        <Text style={styles.textStyle}>    닫기    </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
                    <View style = {{flexDirection: 'row'}}>
                        <View style={styles.leftArea}>
                            <TouchableOpacity
                                style={
                                    {
                                       // width: '10%',
                                        alignContent: "flex-start",
                                        alignItems: 'flex-start',
                                    }
                                }
                                onPress={() =>
                                    this.settableModalVisible(true)
                                }
                            >
                                <View style={   // 상위 탭
                                    {
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                    }
                                }>
                                    <View style={
                                        {
                                            flexDirection: 'row',
                                            width: '90%',
                                            marginBottom: 10,
                                        }
                                    }>
                                        <Text style={
                                            {
                                                fontSize: 22,
                                                fontWeight: 'bold',
                                                color: '#182335',
                                            }
                                        }>총 매출 : {this.state.totalCost}원</Text>
                                    </View>
                                    <Image
                                        style={{ width: 24, height: 24, }}
                                        resizeMode='cover'
                                        source={require('../../../image/chevron-forward-outline.png')} 
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.buttonArea}>
                                    <TouchableOpacity style={styles.button} onPress={() => this.onPress(1)}>
                                        <Text style={styles.buttonText}>1개월</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => this.onPress(2)}>
                                        <Text style={styles.buttonText}>3개월</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => this.onPress(3)}>
                                        <Text style={styles.buttonText}>6개월</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => this.onPress(0)}>
                                        <Text style={styles.buttonText}>전체</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal={true}>
                                    <View>
                                        <Table borderStyle={{borderWidth: 1, borderColor: '#e6e6fa'}}>
                                            <Row 
                                                data={this.state.tableHead} 
                                                widthArr={this.state.tableWidthArr} 
                                                style={styles.header} 
                                                textStyle={styles.text}
                                            />
                                        </Table>
                                        <ScrollView style={styles.dataWrapper}>
                                            <Table borderStyle={{borderWidth: 1, borderColor: '#e6e6fa',}}>
                                                {this.state.tableData.map((rowData, index) => (
                                                <Row
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={this.state.tableWidthArr}
                                                    style={[styles.row, index%2 && {backgroundColor: '#f2f2f2'}]}
                                                    textStyle={styles.tableText}
                                                />
                                                ))}
                                            </Table>
                                        </ScrollView>
                                    </View>
                                </ScrollView>
                            </View>
                        <View style = {styles.rightArea}>
                            <View style = {styles.pieChartArea}>
                            <TouchableOpacity
                                style={{
                                        //width: '10%',
                                        alignContent: "flex-end",
                                        alignItems: 'flex-end',
                                    }}
                                onPress={() =>this.setPieChartModalVisible(true)}
                            >
                                <View style={{flexDirection: 'row', paddingHorizontal: 20,}}>
                                    <View style={   // 상위 탭
                                        {
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            //paddingVertical: 20,
                                            paddingHorizontal: 10,
                                        }
                                    }>
                                        <View style={
                                            {
                                                flexDirection: 'row',
                                                width: '90%'
                                            }
                                        }>
                                            <Text style={
                                                {
                                                    fontSize: 22,
                                                    fontWeight: 'bold',
                                                    color: '#182335',
                                                }
                                            }>인기 메뉴</Text>
                                        </View>
                                        <Image
                                            style={{ width: 24, height: 24, }}
                                            resizeMode='cover'
                                            source={require('../../../image/chevron-forward-outline.png')} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                                <PieChart
                                    data={this.state.menu}
                                    width={screenWidth * 0.90}
                                    height={180}
                                    chartConfig={chartConfig}
                                    accessor="count"
                                    backgroundColor="white"
                                    paddingLeft="15"
                                    absolute
                                />
                            </View>
                            <View style = {styles.lineGraphArea}>
                                <TouchableOpacity
                                    style={
                                        {
                                            //width: '10%',
                                            alignContent: "flex-start",
                                            alignItems: 'flex-start',
                                        }
                                    }
                                    onPress={() =>
                                        this.setlineGraphModalViaible(true)
                                    }
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={   // 상위 탭
                                            {
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                //paddingVertical: 10,
                                                paddingHorizontal: 20,
                                            }
                                        }>
                                            <View style={
                                                {
                                                    flexDirection: 'row',
                                                    width: '90%',
                                                    paddingTop: 10,
                                                }
                                            }>
                                                <Text style={
                                                    {
                                                        fontSize: 22,
                                                        fontWeight: 'bold',
                                                        color: '#182335',
                                                    }
                                                }>매출 추이(원)</Text>
                                            </View>
                                            <Image
                                                style={{ width: 24, height: 24, }}
                                                resizeMode='cover'
                                                source={require('../../../image/chevron-forward-outline.png')} 
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                    <ScrollView horizontal={true} style = {{margin: 20, width: screenWidth*0.8,}}>
                                        <LineGraph
                                            data={this.reverse(this.state.costData)}
                                            width={screenWidth*0.75}
                                            height={200}
                                            labels={this.state.dateData}
                                            lineColor='#162338'
                                            dotColor='#162338'
                                            hasShadow={true}
                                            baseConfig={{
                                                startAtZero: true,
                                                //hasXAxisBackgroundLines: true,
                                                //hasYAxisLabels: true,
                                                xAxisLabelStyle: {
                                                    //suffix: '원',
                                                    //offset: 0,
                                                    //position: "right",
                                                }
                                            }}
                                            style={{
                                                marginTop: 20,
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
            backgroundColor: 'white',
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
            backgroundColor: '#182335',
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
        },
        text: { 
            textAlign: 'center',
            color: 'white', 
            fontWeight: '600', 
        },
        tableText: {
            textAlign: 'center',
            color: '#333', 
            fontWeight: '600', 
        },
        subTitle: {
            color: 'black', 
            fontSize: 20, 
            //font: 'bold', 
            textAlign: 'center',
        },
        buttonArea:{
            flexDirection: 'row', 
            //marginVertical: 5,
            marginBottom: 10,
            margin: 5, 
            width: "80%", 
            height: "10%", 
            alignItems: 'center'
        },
        button: {
            borderRadius: 20,
            backgroundColor: '#182335',
            
            width: '22%',
            height: '70%',
            margin: 5,
            alignItems: 'center',
            alignContent: 'center',
            textAlignVertical: 'center',
            justifyContent: 'center',
        },
        buttonText: {
            fontWeight: 'bold',
            color: 'white', 
            fontSize: 18,
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
            backgroundColor: 'white',
            //width: screenWidth * 0.9,
            borderRadius: 20,
            paddingTop: 15,
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
            //width : screenWidth * 0.9, 
            backgroundColor: 'white',
            //width: screenWidth * 0.9,
            borderRadius: 20,
            paddingTop: 15,
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
        row: { 
            height: 40, 
            backgroundColor: '#fff' 
        },
        //////////////////////////////////////////////////////
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          },
          ModalLineGraph: {
            margin: 20,
            height: '60%',
            backgroundColor: "white",
            borderRadius: 20,
            padding: 30,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          },
          openButton: {
            backgroundColor: "#F194FF",
            borderRadius: 20,
            padding: 10,
            elevation: 2
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 20,
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center"
          }
      });
