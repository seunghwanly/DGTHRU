import React, { Component, useEffect, } from 'react';
import { Platform, Dimensions, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight, StatusBar } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from '../styles';
import moment from 'moment';
import {
    _setPickUpTime, _setCompleteTime, _setConfirmTime, _stringConverter, DeleteOrderList, Setconfirm, SetUnconfirm, SetReady, SetRemove,
    addToAdmin,
} from '../tabs/tabFunctions'


const FirstRoute = (props) => {

    return (
        <View style={[exampleStyle.background,
        {
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            marginTop: 15,
            paddingTop: 5,
            backgroundColor: '#fff'
        }
        ]} >
        <StatusBar barStyle='light-content' /> 
            <View style={
                {
                    width: '100%',
                    flexDirection: 'row',
                    paddingHorizontal:'3%',
                    paddingVertical:'1%'
                }
            }>
                <TouchableOpacity 
                    style={
                        {
                            width:'10%'
                        }
                    }
                    onPress={() => props.onPressFunction(0)}
                >
                    <Image 
                        style={{width:24, height:24}}
                        resizeMode='cover'
                        source={require('../../../image/chevron-back-outline.png')}
                    />
                </TouchableOpacity>
                <View style={
                    {
                        width: '90%',
                        flexDirection:'row',
                        justifyContent:'flex-end',
                        alignItems:'center',
                    }
                }>
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
                            color: '#ea5567',
                        }
                    }>  {props.data.length}  </Text>
                    <Text style={
                        {
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: '#182335',
                        }
                    }>개의 주문이 있습니다.</Text>
                </View>


            </View>

            <FlatList
                data={props.data}
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
                            {item.hasOwnProperty('groupOrder') ?
                                <FlatList
                                    data={item.groupOrder}
                                    keyExtractor={item => item.key}
                                    style={
                                        {
                                            width: '100%',
                                            backgroundColor: '#182335',
                                            marginVertical: 5,
                                            alignSelf: 'center',
                                            borderRadius: 20,
                                            padding: '1%',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 2,
                                                height: 2
                                            },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 3,
                                            elevation: 2,
                                        }
                                    }
                                    contentContainerStyle={
                                        {
                                            flexDirection: 'row',

                                        }
                                    }
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={
                                                {
                                                    margin: 10,
                                                    backgroundColor: '#fff',
                                                    flexDirection: 'row',
                                                    borderRadius: 20,
                                                }
                                            }>
                                                <View style={
                                                    {
                                                        flexDirection: 'row',
                                                        width: '40%',
                                                        marginEnd: '5%',
                                                    }
                                                }>

                                                    <View style={
                                                        {
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginEnd: 5,
                                                            marginStart: 5,
                                                        }
                                                    }>
                                                        <ImageLinker style={exampleStyle.listImage} name={item.name} />
                                                        <Text textAlign="center" style={{ fontWeight: 'bold' }}>
                                                            {
                                                                item.orderInfo.orderNumber
                                                            }
                                                        </Text>
                                                        <Text style={{ fontSize: 16, fontWeight: "bold", }} textAlign="center">{_stringConverter(item.orderInfo.orderState)}</Text>
                                                    </View>


                                                    <View style={
                                                        {

                                                            padding: 10
                                                        }
                                                    }>
                                                        <Text style={exampleStyle.orderlistText_Bold}>{item.name}</Text>
                                                        <Text style={exampleStyle.orderlistText_Thin}> 수량 : {item.options.count}</Text>
                                                        <Text style={exampleStyle.orderlistText_Thin}> 주문자 번호 : {item.orderInfo.clientPhoneNumber}</Text>
                                                        <Text style={exampleStyle.orderlistText_Thin}> 주문시간 : {item.date} / {item.orderInfo.orderTime}</Text>
                                                        <Text style={exampleStyle.orderlistText_Thin}> 옵 션 : {item.options.cup} / {item.options.type} / {item.options.size}</Text>
                                                        <Text style={exampleStyle.orderlistText_Thin}> 샷 추가 : {item.options.shotNum} / 시럽 추가 : {item.options.syrup} / 크림 추가 : {item.options.whipping}</Text>
                                                        <Text style={exampleStyle.orderlistText_Thin}> 요청사항 : {item.options.offers}</Text>

                                                    </View>


                                                </View>



                                                <View style={
                                                    {
                                                        width: '10%',
                                                        backgroundColor: '#182335',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        margin: 5,
                                                        borderRadius: 20,
                                                        padding: 10
                                                    }
                                                }>
                                                    <Image style={{ alignSelf: "center", width: 24, height: 24, marginBottom: 5 }} source={require('../../../image/alarm-white.png')} />
                                                    <Text style={[exampleStyle.orderlistPastTime, { color: '#ddd' }]}>경과시간</Text>
                                                    <Text style={exampleStyle.orderlistPastTime}>
                                                        {
                                                            moment().diff(new moment(item.orderInfo.orderTime, 'HH:mm:ss'), 'minutes') + '분'
                                                        }
                                                    </Text>
                                                </View>




                                                <View style={
                                                    {

                                                        flexDirection: 'row',
                                                        width: '40%'
                                                    }
                                                }>
                                                    <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetUnconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, true)}>
                                                        <Text style={exampleStyle.orderlistButtonText}>승인취소</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => [

                                                        addToAdmin(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, item)
                                                        , Setconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, true, item.orderInfo.orderNumber)
                                                    ]}>
                                                        <Text style={exampleStyle.orderlistButtonText}>주문승인</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetReady(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, true, item.orderInfo.orderNumber)}>
                                                        <Text style={exampleStyle.orderlistButtonText}>준비완료</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[exampleStyle.buttonstyle, { backgroundColor: '#ea5517' }]} onPress={() => SetRemove(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, true, item.orderInfo.orderNumber)}>
                                                        <Text style={exampleStyle.orderlistButtonText}>픽업완료</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                        )
                                    }}
                                />



                                :



                                <View style={
                                    {
                                        width: '100%',
                                        backgroundColor: '#182335',
                                        marginVertical: 5,
                                        alignSelf: 'center',
                                        borderRadius: 20,
                                        padding: '1%',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 2,
                                            height: 2
                                        },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 3,
                                        elevation: 2,

                                    }
                                }>

                                    <View style={{

                                        margin: 10,
                                        backgroundColor: '#fff',
                                        flexDirection: 'row',
                                        borderRadius: 20,
                                    }} >

                                        <View style={
                                            {

                                                flexDirection: 'row',
                                                width: '40%',
                                                marginEnd: 5,
                                            }
                                        }
                                        >
                                            <View style={
                                                {
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginEnd: 5,
                                                    marginStart: 5,
                                                }
                                            }
                                            >
                                                <ImageLinker style={exampleStyle.listImage} name={item.name} />
                                                <Text textAlign="center">{item.orderInfo.orderNumber}</Text>
                                                <Text style={{ fontSize: 16, fontWeight: "bold", }} textAlign="center">{_stringConverter(item.orderInfo.orderState)}</Text>
                                            </View>
                                            <View style={
                                                {
                                                    padding: 10
                                                }
                                            }>
                                                <Text style={exampleStyle.orderlistText_Bold}>{item.name}</Text>
                                                <Text style={exampleStyle.orderlistText_Thin}> 수량 : {item.options.count}</Text>
                                                <Text style={exampleStyle.orderlistText_Thin}> 주문자 번호 : {item.orderInfo.clientPhoneNumber}</Text>
                                                <Text style={exampleStyle.orderlistText_Thin}> 주문시간 : {item.orderInfo.orderDate}{item.orderInfo.orderTime}</Text>
                                                <Text style={exampleStyle.orderlistText_Thin}> 옵 션 : {item.options.cup} / {item.options.type} / {item.options.size}</Text>
                                                <Text style={exampleStyle.orderlistText_Thin}> 샷 추가 : {item.options.shotNum} / 시럽 추가 : {item.options.syrup} / 크림 추가 : {item.options.whipping}</Text>
                                                <Text style={exampleStyle.orderlistText_Thin}> 요청사항 : {item.options.offers}</Text>

                                            </View>

                                        </View>



                                        <View style={
                                            {
                                                width: '10%',
                                                backgroundColor: '#182335',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                margin: 5,
                                                borderRadius: 20,
                                                padding: 10
                                            }
                                        }>
                                            <Image style={{ alignSelf: "center", width: 24, height: 24, marginBottom: 5 }} source={require('../../../image/alarm-white.png')} />
                                            <Text style={exampleStyle.orderlistPastTime}>경과시간</Text>
                                            <Text style={exampleStyle.orderlistPastTime}>
                                                {
                                                    moment().diff(new moment(item.orderInfo.orderTime, 'HH:mm:ss'), 'minutes') + '분'
                                                }
                                            </Text>
                                        </View>



                                        <View style={
                                            {


                                                flexDirection: 'row',
                                                width: '40%'
                                            }
                                        }>
                                            <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetUnconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false)}>
                                                <Text style={exampleStyle.orderlistButtonText}>승인취소</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => [

                                                addToAdmin(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, item, item.orderInfo.orderNumber),
                                                Setconfirm(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false, item.orderInfo.orderNumber)
                                            ]}>
                                                <Text style={exampleStyle.orderlistButtonText}>주문승인</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetReady(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false, item.orderInfo.orderNumber)}>
                                                <Text style={exampleStyle.orderlistButtonText}>준비완료</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={exampleStyle.buttonstyle} onPress={() => SetRemove(item.orderInfo.shopInfo, item.date, item.orderInfo.clientPhoneNumber, item.key, false, item.orderInfo.orderNumber)}>
                                                <Text style={exampleStyle.orderlistButtonText}>픽업완료</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>



                                </View>
                            }
                        </>
                    )
                }}
            />
        </View>
    )
}
export default FirstRoute;