import React from 'react';
import {
    Modal,
    View,
    Text,
    Button,
    Image,
    FlatList
} from 'react-native';
import { getCafeLocation, getCafeName, getCafeTelNumber } from './cafeInformation';
import ImageLinker from './ImageLinker';
import { RecieptModal } from '../client/drawer/styles';

export default class ReceiptGroupModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { totalCost } = this.props.item;



        return (
            <>
                <Text style={[{ fontSize: 25, fontWeight: '800' }]}>e-Receipt</Text>
                <ImageLinker style={RecieptModal.imageLinker} name={this.props.item.shopInfo} />
                <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderStyle: 'solid', marginTop: 20, width: 250 }}>
                    <Text style={{ fontWeight: '700', fontSize: 18, margin: 10, textAlign: 'center' }}>주문번호 {this.props.item.orderNumber}</Text>
                </View>
                <View style={{ padding: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', marginVertical: 2, alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, width: '50%' }}>{getCafeName(this.props.item.shopInfo)}</Text>
                        <Text style={{ fontSize: 14, width: '50%', textAlign: 'right' }}>사장님 성함 OOO</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'stretch', marginVertical: 2 }}>
                        <Text style={{ fontSize: 12 }}>사업자번호 / </Text>
                        <Text style={{ fontSize: 12 }}>TID : ------- / </Text>
                        <Text style={{ fontSize: 12 }}>Tel: {getCafeTelNumber(this.props.item.shopInfo)}</Text>
                    </View>
                    <Text style={{ fontSize: 14, marginVertical: 2 }}>서울특별시 중구 필동로 1길 30 동국대학교, {'\n' + getCafeLocation(this.props.item.shopInfo)}</Text>
                </View>
                <View style={RecieptModal.recieptItemWrapper}>
                    <View style={RecieptModal.recieptTopItemWrapper}>
                        <Text style={RecieptModal.recieptTopItemTextLeft}>주문상품</Text>
                        <Text style={RecieptModal.recieptTopItemTextCenter}>갯수</Text>
                        <Text style={RecieptModal.recieptTopItemTextCenter}>유형</Text>
                        <Text style={RecieptModal.recieptTopItemTextRight}>가격</Text>
                    </View>
                    <FlatList
                        data={this.props.item.group}
                        renderItem={({ item }) => (
                            <>
                                <View style={RecieptModal.recieptItemSubWrapper}>
                                    <Text style={RecieptModal.recieptItemTextLeft}>{item.name}</Text>
                                    <Text style={RecieptModal.recieptItemTextCenter}>{item.options.count}</Text>
                                    <Text style={RecieptModal.recieptItemTextCenter}>{item.options.type}</Text>
                                    <Text style={RecieptModal.recieptItemTextRight}>{item.cost.toLocaleString()}원</Text>
                                </View>
                                {
                                    item.orderInfo.isCanceled === true ?
                                        <View style={[RecieptModal.isCanceledWrapper,{width:'100%'}]}>
                                            <Text style={[RecieptModal.isCanceledText, {fontSize:13}]}>취소된 결제</Text>
                                        </View>
                                        :
                                        <></>
                                }
                            </>
                        )}
                        keyExtractor={(item, index) => item.key}
                    />
                    <View style={RecieptModal.totalCostWrapper}>
                        <Text style={RecieptModal.totalCostTextLeft}>총 결제금액 : </Text>
                        <Text style={RecieptModal.totalCostTextRight}>
                            {totalCost.toLocaleString()} 원(VAT포함)
                        </Text>
                    </View>
                    <View style={RecieptModal.orderTimeWrapper}>
                        <Text style={RecieptModal.orderTimeTextLeft}>주문시간 : </Text>
                        <Text style={RecieptModal.orderTimeTextRight}>{

                            this.props.item.date.substr(2, 2) + '.' + this.props.item.date.substr(5, 2) + '.' + this.props.item.date.substr(8, 2) + '  '
                            + this.props.item.orderTime

                        }</Text>
                    </View>
                </View>
            </>
        );

    }
}