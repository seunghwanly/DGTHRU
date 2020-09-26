import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import ImageLinker from '../../utils/ImageLinker';
import { basketStyles } from './styles';
import { handleDeleteOrder, handleOrder } from '../../utils/DatabaseRef';

export default class BeforePayment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chooseCoupon : null, 
            totalCost : this.props.route.params.totalCost
        }
    }

    chosenCoupon = name => {
        if(name === '10잔') { // 10잔 짜리
            console.log('10 cups');
            this.setState({ 
                totalCost : this.props.route.params.totalCost - 2000,
                chooseCoupon : name 
            });
        } else if(name === '15잔') {  // 15잔 짜리
            console.log('15 cups');
            this.setState({ 
                totalCost : this.props.route.params.totalCost - 2600,
                chooseCoupon : name  
            });
        } else { // 쿠폰없음
            console.log('no coupons');
            this.setState({ 
                totalCost : this.props.route.params.totalCost - 0,
                chooseCoupon : name  
            });
        }
    }

    componentDidMount() {
        // data fetch
        this.chosenCoupon;
    }

    componentWillUnmount() {
        // data off
    }

    render() {

        const {
            shopInfo,
            itemData
        } = this.props.route.params;

        var itemDataJSON = JSON.parse(itemData);
        itemDataJSON.cost = this.state.totalCost;

        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#fff',
            }}>
                <Text style={[basketStyles.radiusText, { fontSize: 25, fontWeight: '800' }]}>주문내역확인 : 단품결제</Text>
                <ImageLinker name={shopInfo} style={
                    {
                        width: 100,
                        height: 100,
                        alignSelf: 'flex-end',
                        position: 'absolute',
                        opacity: 0.3,
                        right: '2%',
                        top: '1%',
                        transform: [{ rotate: '330deg' }]
                    }
                } />

                <View style={{
                    marginVertical: 50,
                    padding: 10,
                    width: '90%',
                    alignItems: 'stretch'
                }}>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '40%' }}>상품명 : </Text>
                        <Text style={{ fontSize: 14, textAlign: 'right', width: '60%' }}>{itemDataJSON.name}</Text>
                    </View>
                    {
                        itemDataJSON.options.selected !== null ?
                            <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '40%' }}>세부메뉴 : </Text>
                                <Text style={{ fontSize: 14, textAlign: 'right', width: '60%' }}>{itemDataJSON.options.selected}</Text>
                            </View>
                            :
                            <></>

                    }
                    {
                        itemDataJSON.options.hotOrIced !== null ?
                            <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '60%' }}>따뜻차갑 : </Text>
                                <Text style={{ fontSize: 14, textAlign: 'right', width: '40%' }}>{itemDataJSON.options.type}</Text>
                            </View>
                            :
                            <></>
                    }
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '40%' }}>가격 : </Text>
                        <Text style={{ fontSize: 14, textAlign: 'right', width: '60%' }}>{itemDataJSON.cost.toLocaleString()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '60%' }}>갯수 : </Text>
                        <Text style={{ fontSize: 14, textAlign: 'right', width: '40%' }}>{itemDataJSON.options.count}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '60%' }}>테이크아웃 : </Text>
                        <Text style={{ fontSize: 14, textAlign: 'right', width: '40%' }}>{itemDataJSON.options.cup}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '60%' }}>사이즈 : </Text>
                        <Text style={{ fontSize: 14, textAlign: 'right', width: '40%' }}>{itemDataJSON.options.size}</Text>
                    </View>

                    <View style={{ width: '100%', borderWidth: 1, borderStyle: 'dotted', marginVertical: 5 }} />

                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '60%' }}>샷 추가 : </Text>
                        <Text style={{ fontSize: 14, textAlign: 'right', width: '40%' }}>{itemDataJSON.options.shotNum}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '60%' }}>시럽 추가 : </Text>
                        <Text style={{ fontSize: 14, textAlign: 'right', width: '40%' }}>{itemDataJSON.options.syrup}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '60%' }}>휘핑 추가 : </Text>
                        <Text style={{ fontSize: 14, textAlign: 'right', width: '40%' }}>
                            {
                                itemDataJSON.options.whipping !== null ? itemDataJSON.options.whipping : '없음'
                            }
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginVertical: 2 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '60%' }}>추가금액 : </Text>
                        <Text style={{ fontSize: 14, textAlign: 'right', width: '40%' }}>{itemDataJSON.options.addedCost.toLocaleString()}원</Text>
                    </View>
                    {
                        itemDataJSON.options.offers.length > 0 ?
                            <View style={{ flexDirection: 'column', width: '100%', marginVertical: 2 }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'left', width: '60%' }}>요청사항 : </Text>
                                <Text style={{ fontSize: 14, textAlign: 'left', width: '100%', marginTop: 15, color: 'dimgray' }}>{itemDataJSON.options.offers}</Text>
                            </View>
                            :
                            <></>
                    }

                    <View style={{ width: '100%', borderWidth: 1, borderStyle: 'dotted', marginVertical: 5 }} />

                    <View style={{flexDirection:'row'}} >
                        <View style={[ basketStyles.basketOptionDesc, { width:'40%', paddingStart:0 }]}>
                            <Text style={{ color: '#182335', fontWeight: 'bold', marginBottom: 5 }}>쿠폰선택</Text>
                            <Text style={{ fontWeight: '400', fontSize: 10, color: 'gray' }}>모으신 쿠폰에 따라{'\n'}적용되는 할인이 다릅니다.</Text>
                        </View>
                       
                        <FlatList 
                            data={['적용안함', '10잔', '15잔']}
                            keyExtractor={item=>item.key}
                            horizontal={true}
                            scrollEnabled={false}
                            renderItem={({item, index}) => {

                                const backgroundColor = item.toString()
                                    === this.state.chooseCoupon ?
                                    '#EEAF9D' : '#F2F2F2';

                                const color = item.toString()
                                    === this.state.chooseCoupon ?
                                    'white' : 'black';
                                return(

                                    <TouchableOpacity 
                                        style={[basketStyles.basketThreeItem,{backgroundColor}]}
                                        onPress={() => this.chosenCoupon(item)}
                                        >
                                        <Text style={[{ fontSize:12, textAlign:'center' },color]}>
                                        {
                                            index === 0 ? item : item+'\n적용하기'
                                        }
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', paddingTop: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'left', width: '50%' }}>총 결제금액 : </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'right', width: '50%' }}>
                            {this.state.totalCost > 0 ? this.state.totalCost.toLocaleString(): 0}원
                            </Text>
                    </View>
                </View>

                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: 'dimgray', marginBottom: 10 }}>주의사항 : 신청하신 옵션은 컵 용량에 맞춰서 나갑니다.</Text>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity
                        style={[basketStyles.goToBasket, { backgroundColor: 'gold', width: 120 }]}
                        onPress={() => [
                            this.props.navigation.navigate('Paying', {
                                totalCost : this.state.totalCost > 0 ? this.state.totalCost : 0,
                                shopInfo:shopInfo,
                                itemData:JSON.stringify(itemDataJSON),
                                coupon:this.state.chooseCoupon !== null ? this.state.chooseCoupon : '-'
                            }), handleOrder(shopInfo,itemDataJSON, false)
                        ]}
                    >
                        <Text style={[basketStyles.radiusText, { textAlign: 'center', fontSize: 14 }]}>바로결제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[basketStyles.goToBasket, { width: 120 }]}
                        onPress={() => [this.props.navigation.goBack(),handleDeleteOrder(this.props.route.params.key,false)]}
                    >
                        <Text style={[basketStyles.radiusText, { textAlign: 'center', fontSize: 15, color: 'white' }]}>취소하기</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
