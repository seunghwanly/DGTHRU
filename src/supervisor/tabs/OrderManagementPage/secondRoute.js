import React, { Component, useEffect, useState } from 'react';
import { Platform, Dimensions, TouchableOpacity, StatusBar, Text, View, Image, TextInput, Alert, FlatList, Modal, Pressable } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { exampleStyle } from '../../styles';
import {
    _setPickUpTime, _setCompleteTime, _setConfirmTime, _stringConverter, DeleteOrderList, Setconfirm, SetUnconfirm, SetReady, SetRemove,
    addToAdmin,
} from '../tabFunctions'
import Moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';
const SecondRoute = (props) => {


    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [DateBoxState, setDateBoxState] = useState(false);
    const [numberBoxState, setnumberBoxState] = useState(true);
    const [pastList, setpastList] = useState(props.data);
    const [currentList, setCurrentList] = useState(props.data);
    const [originList, setOriginList] = useState(props.data);
    const [flag, setflag] = useState(0);

    const [startDate, setStartDate] = useState(new Moment().format('YYYY-MM-DD').toString());
    const [endDate, setEndDate] = useState(new Moment().format('YYYY-MM-DD').toString());


    const dateRangeFilter = () => {
        var start = new Moment(startDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
        var end = new Moment(endDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
        var li = originList;
        var li2 = li.filter(function (n) {
            return new Moment(n.date, 'YYYY-MM-DD').isBetween(start, end, null, '[]');
        });

        console.log(li2.length);
        setpastList(li2);
    }

    const toggleStateDateBox = (item) => {
        if (item == 'Date') {
            setnumberBoxState(!numberBoxState);
            setDateBoxState(!DateBoxState);
            filterList();
        }
    }
    const toggleStatenumberBox = (item) => {
        if (item == 'Number') {
            setnumberBoxState(!numberBoxState);
            setDateBoxState(!DateBoxState);
            filterList();
        }
    }

    const filterList = () => {
        var li = pastList;
        if (numberBoxState == true) {

            li.sort((d2, d1) => new Moment(d1.date + ' ' + d1.orderInfo.orderTime, 'YYYY_MM_DD HH:mm:ss') - new Moment(d2.date + ' ' + d2.orderInfo.orderTime, 'YYYY_MM_DD HH:mm:ss'));
            // li.sort((d2, d1) => new Moment(d1.orderInfo.orderTime, 'HH:MM:ss') - new Moment(d2.orderInfo.orderTime, 'HH:MM:ss')
            // );
            setpastList(li);
        } else {
            li.sort((d2, d1) => parseInt(d2.orderInfo.orderNumber.substring(2, d2.orderInfo.orderNumber.length)) -
                parseInt(d1.orderInfo.orderNumber.substring(2, d1.orderInfo.orderNumber.length)));

            setpastList(li);
        }
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        var str = new Moment(currentDate).format('YYYY-MM-DD').toString();
        if (flag === 1) {
            setStartDate(str);
            setflag(0);
            //dateRangeFilter();     
        }
        else if (flag === 2) {
            setEndDate(str);
            setflag(0);
            //dateRangeFilter();     
        }


    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        setflag(1);
        showMode('date');

    };

    const showTimepicker = () => {
        setflag(2);
        showMode('date');
    };

    return (
        <View style={[
            exampleStyle.background,
            {
                borderTopStartRadius: 30,
                borderTopEndRadius: 30,
                marginTop: 10,
                paddingTop: 10,
                backgroundColor: '#fff'
            }
        ]} >
            <StatusBar barStyle='light-content' />
            <View style={
                {
                    width: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: '3%',
                    paddingVertical: '1%',
                    alignItems: 'center'
                }
            }>
                <TouchableOpacity
                    style={
                        {
                            width: '10%'
                        }
                    }
                    onPress={() => props.onPressFunction(0)}
                >
                    <Image
                        style={{ width: 24, height: 24 }}
                        resizeMode='cover'
                        source={require('../../../../image/chevron-back-outline.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '10%',
                            height: 34,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            paddingBottom: 1,
                            marginRight: 5,
                        }
                    }
                    onPress={() => showDatepicker()}
                >
                    <Text> {startDate.toString()}</Text>
                </TouchableOpacity>
                <Text style={
                    {
                        paddingBottom: 3
                    }
                }> - </Text>
                <TouchableOpacity
                    style={
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '10%',
                            height: 34,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            paddingBottom: 1,
                            marginRight: 5,
                        }
                    }
                    onPress={() => showTimepicker()}
                >
                    <Text> {endDate.toString()} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={
                        {
                            backgroundColor: '#182335',
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0.8%',
                            marginLeft: 5,
                            marginRight: 5,
                        }
                    }
                    onPress={() => dateRangeFilter()}
                >
                    <Text style={{ fontSize: 14, color: 'white', }}> 기간설정 </Text>
                </TouchableOpacity>


                <View style={
                    {

                        width: '60%',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }
                }>






                    {/* <View style={{marginRight:5,}}>
                    <Button onPress={dateRangeFilter} title=' >> 기간으로 검색 !' /> 
                    </View>

                    <View style={{marginRight:5,}}>
                        
                    <Button onPress={showDatepicker} title={startDate.toString()} />
                   
                </View>

                <View>
                    <Button onPress={showTimepicker} title={endDate.toString() } />
                </View> */}
                    {
                        Platform.OS === 'ios' ?
                                <Modal
                                    animationType='slide'
                                    transparent={true}
                                    visible={show}
                                >
                                <View style={
                                    {
                                        width:400,
                                        height:300,
                                        margin: 20,
                                        backgroundColor: "#fff",
                                        borderRadius: 20,
                                        padding: 35,
                                        alignItems: 'center',
                                        justifyContent:'center',
                                        alignSelf:'center',
                                        top:'30%',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 1,
                                            height: 2
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5
                                    }
                                }>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                        style={{ width: '100%', backgroundColor:'#fff' }}
                                    />
                                    <Pressable
                                        style={
                                            {
                                                borderRadius: 20,
                                                backgroundColor: '#182335',
                                                width:200,
                                                height:50,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                marginVertical:10
                                            }
                                        }
                                        onPress={() => setShow(!show)}
                                    >
                                        <Text style={{ fontWeight: 'bold', color:'#fff', fontSize:20 }}>확인</Text>
                                    </Pressable>
                                    </View>
                                </Modal>
                            :
                            show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )
                    }
                    <View style={
                        {
                            flexDirection: 'row',
                            marginRight: '3%',
                            alignItems: 'center'
                        }
                    }>
                        {
                            Platform.OS === 'ios' ?
                                <CheckBox
                                    style={
                                        {
                                            height: 24,
                                            width: 24,
                                        }
                                    }
                                    boxType='square'
                                    lineWidth={true}
                                    tintColor='#eaaf9d'
                                    onCheckColor='#fff'
                                    onTintColor='#eaaf9d'
                                    onFillColor='#eaaf9d'
                                    onAnimationType='bounce'
                                    offAnimationType='bounce'
                                    value={numberBoxState}
                                    disabled={false}
                                    onChange={() => toggleStatenumberBox('Number')}
                                />
                                :
                                <CheckBox
                                    value={numberBoxState}
                                    disabled={false}
                                    onChange={() => toggleStatenumberBox('Number')}
                                />
                        }
                        <Text style={{ padding: 2, }}> 주문번호순 </Text>
                        {
                            Platform.OS === 'ios' ?
                                <CheckBox
                                    style={
                                        {
                                            height: 24,
                                            width: 24,
                                        }
                                    }
                                    boxType='square'
                                    lineWidth={true}
                                    tintColor='#eaaf9d'
                                    onCheckColor='#fff'
                                    onTintColor='#eaaf9d'
                                    onFillColor='#eaaf9d'
                                    onAnimationType='bounce'
                                    offAnimationType='bounce'
                                    value={DateBoxState}
                                    disabled={false}
                                    onChange={() => toggleStateDateBox('Date')}
                                />
                                :
                                <CheckBox
                                    value={DateBoxState}
                                    disabled={false}
                                    onChange={() => toggleStateDateBox('Date')}
                                />
                        }
                        <Text style={{ padding: 2 }}> 최근순 </Text>
                        <View>


                        </View>
                    </View>


                </View>
            </View>
            <View style={{
                marginRight: '3%',
                marginVertical: '1%',
                alignSelf: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={
                    {
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: '#182335',
                    }
                }>
                    총
                    </Text>
                <Text style={
                    {
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: '#ea5517',
                    }
                }>  {pastList.length}  </Text>
                <Text style={
                    {
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: '#182335',
                    }
                }>개의 주문이 있습니다.</Text>
            </View>
            <View style={
                {
                    flexDirection: 'row',
                    width: '90%',
                    borderBottomWidth: 2,
                    paddingVertical: 10,
                    borderColor: '#777'
                }
            }>
                <Text style={exampleStyle.pastOrderNumberListText}>주문번호</Text>
                <Text style={exampleStyle.pastOrderListText}>상품명</Text>
                <Text style={exampleStyle.pastOrderNumberListText}>갯수</Text>
                <Text style={exampleStyle.pastOrderListText}>주문자번호</Text>
                <Text style={exampleStyle.pastOrderListText}>주문날짜</Text>
                <Text style={exampleStyle.pastOrderListText}>주문시간</Text>
                <Text style={[exampleStyle.pastOrderListText, { width: '30%' }]}>비고</Text>
            </View>
            <FlatList
                data={pastList}
                keyExtractor={item => item.key}
                contentContainerStyle={
                    {
                        paddingHorizontal: '5%',
                        width: Dimensions.get('window').width,
                    }
                }
                scrollEnabled={true}
                renderItem={({ item, index }) => {

                    return (
                        <>
                            <View style={
                                {
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                }
                            }>
                                <Text style={[exampleStyle.pastOrderNumberListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.orderInfo.orderNumber}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.name}</Text>
                                <Text style={[exampleStyle.pastOrderNumberListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.options.count}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>0{item.orderInfo.clientPhoneNumber.substring(3, item.orderInfo.clientPhoneNumber.length)}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.date}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.orderInfo.orderTime}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14, width: '30%' }]}>샷 추가 : {item.options.shotNum} / 시럽 추가 : {item.options.syrup} / HOT/ICED : {item.options.type}</Text>
                            </View>
                            <View style={
                                {
                                    borderBottomWidth: 2,
                                    borderColor: '#eee',
                                    marginBottom: 2
                                }
                            } />
                        </>
                    )
                }}
            />
        </View>
    )
}
export default SecondRoute;