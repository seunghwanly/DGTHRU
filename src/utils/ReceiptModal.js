import React from 'react';
import {
    Modal,
    View,
    Text,
    Button,
    Image
} from 'react-native';
import { getCafeIcon } from './getCafeIcon';

export class ReceiptModal extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        console.log('receipt modal >> ' + JSON.stringify(this.props));

        return (
            <>
                <Text style={[{ fontSize: 25, fontWeight: '800' }]}>e-Receipt</Text>
                <Image
                    source={getCafeIcon(this.props.shopInfo)}
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

                <View style={{
                    marginVertical: 50,
                    padding: 10,
                    width: 200,
                    alignItems: 'stretch'
                }}>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '40%' }}>상품명 : </Text>
                        <Text style={{ fontSize: 15, textAlign: 'right', width: '60%' }}>{this.props.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '40%' }}>가격 : </Text>
                        <Text style={{ fontSize: 15, textAlign: 'right', width: '60%' }}>{this.props.cost}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '60%' }}>갯수 : </Text>
                        <Text style={{ fontSize: 15, textAlign: 'right', width: '40%' }}>{this.props.count}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '60%' }}>테이크아웃 : </Text>
                        <Text style={{ fontSize: 15, textAlign: 'right', width: '40%' }}>{this.props.inOrOut}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '60%' }}>따뜻차갑 : </Text>
                        <Text style={{ fontSize: 15, textAlign: 'right', width: '40%' }}>{this.props.hotOrIced}</Text>
                    </View>
                    {
                        this.props.offers !== null ?
                            <View style={{ flexDirection: 'column', width: '100%', marginVertical: 2 }}>
                                <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'left', width: '60%' }}>요청사항 : </Text>
                                <Text style={{ fontSize: 15, textAlign: 'left', width: '100%', marginTop: 15, color: 'dimgray' }}>{this.props.offers}</Text>
                            </View>
                            :
                            <></>
                    }
                </View>
            </>
        );
    }
}