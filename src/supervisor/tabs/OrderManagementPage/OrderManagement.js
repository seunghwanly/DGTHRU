import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';
import { exampleStyle } from '../../styles';
import moment from 'moment';

export default OrderManagement = (props) => {

    const {
        data, route, onPressFunction,
    } = props;

    return (
        <View style={[exampleStyle.background,
        {
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            marginTop: 15,
            paddingTop: 5,
            backgroundColor: '#fff',
            flexDirection: 'row',
        }
        ]}>
            <StatusBar barStyle='light-content' />
            <View style={exampleStyle.functionWrapper}>
                <View style={   // 상위 탭
                    {
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingVertical: 20,
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
                        }>미처리</Text>
                        <Text style={
                            {
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#eaaf9d',
                                marginHorizontal: 8
                            }
                        }>주문</Text>
                        <Text style={
                            {
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#182335',
                            }
                        }>건</Text>
                    </View>
                    <TouchableOpacity
                        style={
                            {
                                width: '10%',
                                alignItems: 'flex-end'
                            }
                        }
                        onPress={() =>
                            onPressFunction(1)
                        }
                    >
                        <Image
                            style={{ width: 24, height: 24, }}
                            resizeMode='cover'
                            source={require('../../../../image/chevron-forward-outline.png')} />
                    </TouchableOpacity>
                </View>
                <View style={
                    {
                        flexDirection: 'row',
                        width: '95%',
                        borderBottomWidth: 2,
                        paddingVertical: 10,
                        borderColor: '#777',
                        marginTop: 10
                    }
                }>
                    <Text style={exampleStyle.pastOrderListText}>주문번호</Text>
                    <Text style={exampleStyle.pastOrderListText}>상품명</Text>
                    <Text style={exampleStyle.pastOrderListText}>갯수</Text>
                    <Text style={[exampleStyle.pastOrderListText, { width: '25%' }]}>비고</Text>
                    <Text style={exampleStyle.pastOrderListText}>주문시간</Text>
                    <Text style={exampleStyle.pastOrderListText}>경과시간</Text>
                </View>
                {
                    data.length > 0 ?

                        <FlatList
                            data={data}
                            keyExtractor={item => item.key}
                            contentContainerStyle={
                                {
                                    paddingHorizontal: '5%',
                                }
                            }
                            scrollEnabled={true}
                            renderItem={({ item, index }) => {

                                if (item.hasOwnProperty('groupOrder')) {
                                    return (
                                        <FlatList
                                            data={item.groupOrder}
                                            keyExtractor={item => item.key}
                                            renderItem={
                                                ({ item }) => (
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
                                                            <Text style={[exampleStyle.pastOrderListText, { fontWeight: 'normal', fontSize: 14 }]}>
                                                                {
                                                                    item.date.substr(5, 2) + '월 ' + item.date.substr(8, 2) + '일  ' + item.orderInfo.orderTime
                                                                }
                                                            </Text>
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
                                            }
                                        />
                                    )
                                } else {
                                    return (
                                        <>
                                            <View style={
                                                {
                                                    paddingVertical: 10,
                                                    flexDirection: 'row',

                                                }
                                            }>
                                                <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal', textAlign:'left' }]}>{item.orderInfo.orderNumber}</Text>
                                                <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal' }]}>{item.name}</Text>
                                                <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal' }]}>{item.options.count}</Text>
                                                <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal', width: '25%' }]}> 샷 추가 : {item.options.shotNum}{'\n'}시럽 추가 : {item.options.syrup}{'\n'}크림 추가 : {item.options.whipping} </Text>                                               
                                                <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal' }]}>{item.orderInfo.orderTime}</Text>
                                                <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal' }]}>
                                                    {
                                                        moment().diff(new moment(item.orderInfo.orderTime, 'HH:mm:ss'), 'minutes') + '분'
                                                    }
                                                </Text>
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
                                }
                            }
                            }

                        />

                        :

                        <View style={
                            {
                                height: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%'
                            }
                        }>
                            <Text style={
                                {
                                    color: '#aaa',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginTop: '20%'
                                }
                            }>아직 들어온 주문이 없어요 !</Text>
                        </View>
                }
            </View>


            {/* ================================================================================================== */}


            <View style={exampleStyle.functionWrapper}>
                <View style={   // 상위 탭
                    {
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingVertical: 20,
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
                        }>처리된</Text>
                        <Text style={
                            {
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#eaaf9d',
                                marginHorizontal: 8
                            }
                        }>주문</Text>
                        <Text style={
                            {
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#182335',
                            }
                        }>건</Text>
                    </View>
                    <TouchableOpacity
                        style={
                            {
                                width: '10%',
                                alignItems: 'flex-end'
                            }
                        }
                        onPress={() =>
                            onPressFunction(2)
                        }
                    >
                        <Image
                            style={{ width: 24, height: 24, }}
                            resizeMode='cover'
                            source={require('../../../../image/chevron-forward-outline.png')} />
                    </TouchableOpacity>
                </View>
                <View style={
                    {
                        flexDirection: 'row',
                        width: '95%',
                        borderBottomWidth: 2,
                        paddingVertical: 10,
                        borderColor: '#777',
                        marginTop: 10
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
                    data={props.pastData}
                    keyExtractor={item => item.key}
                    contentContainerStyle={
                        {
                            width: '100%',
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
                                        alignItems: 'center'
                                    }
                                }>
                                    <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal' }]}>{item.orderInfo.orderNumber}</Text>
                                    <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal' }]}>{item.name}</Text>
                                    <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal' }]}>{item.options.count}</Text>
                                    <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal' }]}>{item.orderInfo.clientPhoneNumber}</Text>
                                    <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal' }]}>{item.orderInfo.orderTime}</Text>
                                    <Text style={[exampleStyle.pastOrderListText, { fontSize: 12, fontWeight: 'normal', width: '20%', textAlign: 'right' }]}>샷 추가 : {item.options.shotNum}{'\n'}시럽 추가 : {item.options.syrup}{'\n'}크림 추가 : {item.options.whipping}</Text>
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
        </View>
    )
}