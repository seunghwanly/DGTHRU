import React, { Component, useEffect, } from 'react';
import { Platform, Dimensions, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from '../styles';
import { _setPickUpTime , _setCompleteTime , _setConfirmTime , _stringConverter, DeleteOrderList , Setconfirm , SetUnconfirm , SetReady , SetRemove ,
    addToAdmin , } from '../tabs/tabFunctions'
import moment from 'moment';

const SecondRoute = (props) => {


    return(
    <View style={[exampleStyle.background,{ borderTopStartRadius:30, borderTopEndRadius:30, marginTop:10, paddingTop:10, backgroundColor:'#182335' }]} >
        
        
        <View style={{ width:'100%',flexDirection: 'column', alignItems:'center'}}>
    <View style={{ backgroundColor:'#182335',  width:'25%', borderColor : '#182335', borderBottomColor:"white" , borderWidth : 2.5, }}>
    <Text style={{ alignSelf:'center',  fontSize: 20, fontWeight:'bold', color: 'white', }}> 
    오늘의 주문 총 {props.data.length}건이 있습니다.
         </Text>
    </View>


</View>
        <FlatList
            style={{marginTop:20,}}
            data={props.data}
            keyExtractor={item => item.key}
            contentContainerStyle={
                {
                    backgroundColor:'gray',
                    borderRadius:20,
                    paddingHorizontal: '5%',
                    marginLeft:'1%',
                    marginRight: '1%',
                    width: Dimensions.get('window').width/10 *9,

                   

                }
            }
            scrollEnabled={true}
            renderItem={({ item, index }) => {
                
                return (
                    <>                         
                    <View style={
                        {
                            width: '100%',
                            flexDirection: 'row',
                            borderRadius: 20,
                            backgroundColor: '#fff',
                            padding: 10,
                            marginVertical: 4,
                            alignSelf: 'center',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 1,
                                height: 2
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 2
                        }
                    }>
                        <View style={
                            {
                                flexDirection: 'row',
                                width: '35%',
                                marginEnd: 5,
                            }
                        }
                        >
                            <View style={
                                {
                                    alignItems: 'center',
                                    marginEnd: 5,
                                }
                            }
                            >
                                <ImageLinker style={exampleStyle.listImage} name={item.name} />
                        <Text textAlign="center">{item.orderInfo.orderNumber}</Text>
                        <Text style={{fontSize:16,}} textAlign="center">{_stringConverter(item.orderInfo.orderState)}</Text>
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
                                marginHorizontal: '5%',
                                borderRadius: 20
                            }
                        }>
                            <Image style={{alignSelf:"center", width:24, height:24, marginBottom:5 }} source={require('../../../image/alarm-white.png')}/>
                            <Text style={exampleStyle.orderlistPastTime}>총 경과시간</Text>
                            <Text style={exampleStyle.orderlistPastTime}>   
                                        {  
                        
                                            moment.duration((new moment(item.date + item.orderInfo.orderTime,"YYYY_MM_DD HH:mm")).diff(new moment(item.orderInfo.pickupTime,"HH:mm"))).asMinutes() + '분 소요'
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
                        
                    </>
                )
            }}
        />
    </View>
    )
}
export default SecondRoute;