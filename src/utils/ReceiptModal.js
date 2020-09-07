import React from 'react';
import {
    Modal,
    View,
    Text,
    Button,
    Image,
    FlatList
} from 'react-native';
import { getCafeIcon, getCafeLocation, getCafeName } from './getCafeIcon';

export class ReceiptModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.group === true) {

            return (
                <>
                    <Text style={[{ fontSize: 25, fontWeight: '800' }]}>e-Receipt</Text>
                    <Image
                        source={getCafeIcon(this.props.item.shopInfo)}
                        resizeMode='cover'
                        style={{
                            width: 100,
                            height: 100,
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            opacity: 0.3,
                            right: 10,
                            top: 10,
                            transform: [{ rotate: '330deg' }]
                        }}
                    />
                    <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderStyle: 'solid', marginTop: 20, width: 250 }}>
                        <Text style={{ fontWeight: '700', fontSize: 18, margin: 10, textAlign: 'center' }}>주문번호 {this.props.item.orderNumber}</Text>
                    </View>
                    <View style={{ padding: 10, marginTop: 20 }}>
                        <Text style={{ fontSize: 14, marginVertical: 2 }}>{getCafeName(this.props.item.shopInfo)}</Text>
                        <Text style={{ fontSize: 14, marginVertical: 2 }}>사장님 성함 OOO</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'stretch', marginVertical: 2 }}>
                            <Text style={{ fontSize: 12 }}>사업자번호 / </Text>
                            <Text style={{ fontSize: 12 }}>TID : ------- / </Text>
                            <Text style={{ fontSize: 12 }}>Tel: 가게전화번호임</Text>
                        </View>
                        <Text style={{ fontSize: 14, marginVertical: 2 }}>서울특별시 중구 필동로 1길 30 동국대학교, {'\n' + getCafeLocation(this.props.item.shopInfo)}</Text>
                    </View>
                    <View style={{
                        marginBottom: 20,
                        marginTop: 5,
                        padding: 10,
                        width: '100%',
                        alignItems: 'stretch'
                    }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5, borderBottomWidth: 1, padding: 8 }}>
                            <Text style={{ fontWeight: 'bold', width: '35%', textAlign: 'left' }}>주문상품</Text>
                            <Text style={{ fontWeight: 'bold', width: '35%', textAlign: 'center' }}>유형</Text>
                            <Text style={{ fontWeight: 'bold', width: '30%', textAlign: 'right' }}>가격</Text>
                        </View>
                        <FlatList
                            data={this.props.item.group}
                            renderItem={({ item }) => (
                                <>
                                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                        <Text style={{ fontSize: 14, width: '35%' }}>{item.name}</Text>
                                        <Text style={{ fontSize: 14, textAlign: 'center', width: '35%' }}>{item.type}</Text>
                                        <Text style={{ fontSize: 14, width: '30%', textAlign: 'right' }}>{item.cost}원</Text>
                                    </View>
                                </>
                            )}
                            keyExtractor={(item, index) => item.key}
                        />
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 20, borderTopWidth: 1, borderBottomWidth: 1, borderStyle: 'solid', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '40%' }}>총 결제금액 : </Text>
                            <Text style={{ fontSize: 15, textAlign: 'right', width: '60%' }}>
                                {Number(this.props.item.totalCost).toLocaleString() + '원(VAT포함)'}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                            <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '40%' }}>주문시간 : </Text>
                            <Text style={{ fontSize: 15, textAlign: 'right', width: '60%' }}>{

                                this.props.item.date.substr(2, 2) + '.' + this.props.item.date.substr(5, 2) + '.' + this.props.item.date.substr(8, 2) + '  '
                                + this.props.item.orderTime

                            }</Text>
                        </View>
                    </View>
                </>
            );
        }   // if
        else {
            return (
                <>
                    <Text style={[{ fontSize: 25, fontWeight: '800' }]}>e-Receipt</Text>
                    <Image
                        source={getCafeIcon(this.props.item.shopInfo)}
                        resizeMode='cover'
                        style={{
                            width: 100,
                            height: 100,
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            opacity: 0.3,
                            right: 10,
                            top: 10,
                            transform: [{ rotate: '330deg' }]
                        }}
                    />
                    <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderStyle: 'solid', marginTop: 20, width: 250 }}>
                        <Text style={{ fontWeight: '700', fontSize: 18, margin: 10, textAlign: 'center' }}>주문번호 {this.props.item.orderNumber}</Text>
                    </View>
                    <View style={{ padding: 10, marginTop: 20 }}>
                        <Text style={{ fontSize: 14, marginVertical: 2 }}>{getCafeName(this.props.item.shopInfo)}</Text>
                        <Text style={{ fontSize: 14, marginVertical: 2 }}>사장님 성함 OOO</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'stretch', marginVertical: 2 }}>
                            <Text style={{ fontSize: 12 }}>사업자번호 / </Text>
                            <Text style={{ fontSize: 12 }}>TID : ------- / </Text>
                            <Text style={{ fontSize: 12 }}>Tel: 가게전화번호임</Text>
                        </View>
                        <Text style={{ fontSize: 14, marginVertical: 2 }}>서울특별시 중구 필동로 1길 30 동국대학교, {'\n' + getCafeLocation(this.props.item.shopInfo)}</Text>
                    </View>
                    <View style={{
                        marginBottom: 20,
                        marginTop: 5,
                        padding: 10,
                        width: '100%',
                        alignItems: 'stretch'
                    }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5, borderBottomWidth: 1, padding: 8 }}>
                            <Text style={{ fontWeight: 'bold', width: '35%', textAlign: 'left' }}>주문상품</Text>
                            <Text style={{ fontWeight: 'bold', width: '35%', textAlign: 'center' }}>유형</Text>
                            <Text style={{ fontWeight: 'bold', width: '30%', textAlign: 'right' }}>가격</Text>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                            <Text style={{ fontSize: 14, width: '35%' }}>{this.props.item.name}</Text>
                            <Text style={{ fontSize: 14, textAlign: 'center', width: '35%' }}>{this.props.item.type}</Text>
                            <Text style={{ fontSize: 14, width: '30%', textAlign: 'right' }}>{this.props.item.cost}원</Text>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 20, borderTopWidth: 1, borderBottomWidth: 1, borderStyle: 'solid', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '40%' }}>총 결제금액 : </Text>
                            <Text style={{ fontSize: 15, textAlign: 'right', width: '60%' }}>
                                {  Number(this.props.item.cost).toLocaleString() + '원(VAT포함)'}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                            <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '40%' }}>주문시간 : </Text>
                            <Text style={{ fontSize: 15, textAlign: 'right', width: '60%' }}>{

                                this.props.item.date.substr(2, 2) + '.' + this.props.item.date.substr(5, 2) + '.' + this.props.item.date.substr(8, 2) + '  '
                                + this.props.item.orderTime

                            }</Text>
                        </View>
                    </View>
                </>
            );
        }   //else

    }
}