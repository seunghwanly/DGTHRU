import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import { getCafeLocation, getCafeName, getCafeTelNumber } from './cafeInformation';
import { RecieptModal, } from '../client/drawer/styles';
import ImageLinker from './ImageLinker';

export default class RecieptSingleModal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <>
                <Text style={[{ fontSize: 25, fontWeight: '800' }]}>e-Receipt</Text>
                <ImageLinker style={RecieptModal.imageLinker} name={this.props.item.shopInfo} />
                <View style={RecieptModal.orderNumberWrapper}>
                    <Text style={RecieptModal.orderNumberText}>주문번호 {this.props.item.orderInfo.orderNumber}</Text>
                </View>
                <View style={{ padding: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', marginVertical: 2, alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, width: '50%' }}>{getCafeName(this.props.item.shopInfo)}</Text>
                        <Text style={{ fontSize: 12, width: '50%', textAlign: 'right' }}>사장님 성함 OOO</Text>
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

                    <View style={RecieptModal.recieptItemSubWrapper}>
                        <Text style={RecieptModal.recieptItemTextLeft}>{this.props.item.name}</Text>
                        <Text style={RecieptModal.recieptItemTextCenter}>{this.props.item.options.count}</Text>
                        <Text style={RecieptModal.recieptItemTextCenter}>{this.props.item.options.type}</Text>
                        <Text style={RecieptModal.recieptItemTextRight}>{this.props.item.cost.toLocaleString()}원</Text>
                    </View>

                    <View style={RecieptModal.totalCostWrapper}>
                        <Text style={RecieptModal.totalCostTextLeft}>총 결제금액 : </Text>
                        <Text style={RecieptModal.totalCostTextRight}>
                            {this.props.item.cost.toLocaleString() + '원(VAT포함)'}
                        </Text>
                    </View>
                    <View style={RecieptModal.orderTimeWrapper}>
                        <Text style={RecieptModal.orderTimeTextLeft}>주문시간 : </Text>
                        <Text style={RecieptModal.orderTimeTextRight}>{
                            this.props.item.date.substr(2, 2) + '.' + this.props.item.date.substr(5, 2) + '.' + this.props.item.date.substr(8, 2) + '  ' +
                            this.props.item.orderTime
                        }</Text>
                    </View>
                </View>
                {
                    this.props.item.orderInfo.isCanceled === true ?
                        <View style={RecieptModal.isCanceledWrapper}>
                            <Text style={RecieptModal.isCanceledText}>취소된 결제</Text>
                        </View>
                        :
                        <></>
                }
            </>
        );
    }
}
