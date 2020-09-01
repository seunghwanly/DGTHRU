import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    View,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';

//firebase
import { userHistoryTotalDatabase } from '../../utils/DatabaseRef';

export default class Bill extends React.Component {

    _userHistoryDB;

    constructor(props) {
        super(props);

        this.state = {
            totalCost: 0,
            userHistory: []
        }

        this._userHistoryDB = userHistoryTotalDatabase();
    }

    componentDidMount() {

        var tempTotalCost = 0;

        this._userHistoryDB
            .once('value', (snapshot) => {
                this.setState({ userHistory: [] });

                // console.log('snapshot >> ' + snapshot.val());
                snapshot.forEach((childSnapShot) => {
                    // console.log('childSnapShot >> ' + childSnapShot.key, childSnapShot.val());
                    var tempJSONArray = [];
                    // 날짜 : { autokey : { values } }
                    childSnapShot.forEach((dataSnapShot) => {
                        // console.log('dataChildSnapShot >> ' + dataSnapShot.key, dataSnapShot.val() );
                        tempJSONArray.push(dataSnapShot.val());
                        tempJSONArray.reverse();
                        tempTotalCost += dataSnapShot.val().cost;
                        //autokey : { values }
                    });
                    var tempSubObject = {
                        'date': childSnapShot.key,
                        'item': tempJSONArray
                    };
                    this.setState({
                        userHistory: this.state.userHistory.concat(tempSubObject),
                        totalCost: tempTotalCost
                    });
                })
                // console.log('BILL >>>>\n\n' + JSON.stringify(this.state.userHistory));
            });
    }

    render() {
        return (
            <>
                <Header
                    containerStyle={{ backgroundColor: 'white' }}
                    centerComponent={(<Text>e-Receipt / History</Text>)}
                    leftComponent={
                        () => (
                            <TouchableOpacity
                                style={{ flexDirection: 'row-reverse' }}
                                // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                                onPress={() => this.props.navigation.toggleDrawer()}
                            >
                                <Image
                                    style={{ height: 30, width: 30, }}
                                    resizeMode='cover'
                                    source={require('../../../image/menu-outline.png')}
                                />
                            </TouchableOpacity>
                        )
                    } />
                <SafeAreaView
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        backgroundColor: 'white',
                        padding: 20
                    }}>
                    {
                        this.state.userHistory !== null ?
                            [
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Text style={{ fontWeight:'bold', width: '25%' }}>주문상품</Text>
                                    <Text style={{ fontWeight:'bold', width: '25%', textAlign: 'center' }}>가격</Text>
                                    <Text style={{ fontWeight:'bold', width: '25%', textAlign: 'center' }}>용기</Text>
                                    <Text style={{ fontWeight:'bold', width: '25%', textAlign: 'right' }}>주문시간</Text>
                                </View>,
                                <ScrollView>
                                    {
                                        this.state.userHistory.reverse().map(items => {
                                            return (
                                                <>
                                                    <View style={{ borderBottomWidth: 1, margin: 5 }} />
                                                    <Text style={{textAlign:'right', fontStyle:'italic'}}>
                                                    {items.date.substr(0,4)}년{items.date.substr(5,2)}월{items.date.substr(8,2)}일
                                                    </Text>
                                                    <View style={{ borderBottomWidth: 1, margin: 5 }} />

                                                    <FlatList
                                                        data={items.item}
                                                        renderItem={
                                                            ({ item }) => (
                                                                <View style={{ flexDirection: 'row', }}>
                                                                    <Text style={{ width: '25%' }}>{item.name}</Text>
                                                                    <Text style={{ width: '25%', textAlign: 'center' }}>{item.cost}</Text>
                                                                    <Text style={{ width: '25%', textAlign: 'center' }}>{item.cup}</Text>
                                                                    <Text style={{ width: '25%', textAlign: 'right' }}>{item.orderTime}</Text>
                                                                </View>
                                                            )
                                                        }
                                                        keyExtractor={(item) => item.toString()}
                                                        scrollEnabled={false}
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </ScrollView>
                                ,
                                <Text style={{ alignSelf: 'flex-end' }}>총 사용금액 : {this.state.totalCost}</Text>
                            ]
                            :
                            <Text>주문내역이 없네요 ~</Text>
                    }
                </SafeAreaView>
            </>
        )
    }

}
