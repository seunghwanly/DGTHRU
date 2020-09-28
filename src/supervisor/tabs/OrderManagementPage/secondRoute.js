import React, { Component, useEffect, } from 'react';
import { Platform, Dimensions, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from '../../styles';
import {
    _setPickUpTime, _setCompleteTime, _setConfirmTime, _stringConverter, DeleteOrderList, Setconfirm, SetUnconfirm, SetReady, SetRemove,
    addToAdmin,
} from '../tabFunctions'
import moment from 'moment';

const SecondRoute = (props) => {


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

            <View style={
                {
                    width: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: '3%',
                    paddingVertical: '1%'
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

                <View style={
                    {
                        width: '90%',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
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

            <View style={
                {
                    flexDirection: 'row',
                    width: '90%',
                    borderBottomWidth: 2,
                    paddingVertical: 10,
                    borderColor: '#777'
                }
            }>
                <Text style={exampleStyle.pastOrderListText}>주문번호</Text>
                <Text style={exampleStyle.pastOrderListText}>상품명</Text>
                <Text style={exampleStyle.pastOrderListText}>갯수</Text>
                <Text style={exampleStyle.pastOrderListText}>주문자번호</Text>
                <Text style={exampleStyle.pastOrderListText}>주문시간</Text>
                <Text style={[exampleStyle.pastOrderListText, { width: '25%' }]}>비고</Text>
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
                            <View style={
                                {
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                }
                            }>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.orderInfo.orderNumber}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.name}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.options.count}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.orderInfo.clientPhoneNumber}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>{item.orderInfo.orderTime}</Text>
                                <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14, width: '25%' }]}>샷 추가 : {item.options.shotNum} / 시럽 추가 : {item.options.syrup} / 크림 추가 : {item.options.whipping}</Text>
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