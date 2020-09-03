import React from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import moment from 'moment';

//firebase
import { userHistoryTotalDatabase } from '../../utils/DatabaseRef';

// const wait = (timeout) => {
//     return new Promise(resolve => {
//         setTimeout(resolve, timeout);
//     });
// }

export default class Bill extends React.Component {

    _userHistoryDB;

    constructor(props) {
        super(props);

        this.state = {
            totalCost: 0,
            userHistory: [],
            refreshing: false
        };

        this._userHistoryDB = userHistoryTotalDatabase();
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        var tempTotalCost = 0;

        this._userHistoryDB
            .once('value', (snapshot) => {

                //this.setState({ userHistory: [] });
                var tempJSONArray = [];
                var tempSubObject;
                // console.log('snapshot >> ' + snapshot.val());
                snapshot.forEach((childSnapShot) => {
                    var subObjectKey = childSnapShot.key;
                    // console.log('childSnapShot >> ' + childSnapShot.key, childSnapShot.val());
                    // 날짜 : { autokey : { values } }
                    childSnapShot.forEach((dataSnapShot) => {
                        // console.log('dataChildSnapShot >> ' + dataSnapShot.val().orderTime );
                        tempJSONArray.push({
                            orderTime:dataSnapShot.val().orderTime,
                            name:dataSnapShot.val().name,
                            cost:dataSnapShot.val().cost,
                            count:dataSnapShot.val().count,
                            selected:dataSnapShot.val().selected,
                            cup:dataSnapShot.val().cup,
                            type:dataSnapShot.val().type
                        });
                        
                        tempTotalCost += dataSnapShot.val().cost;
                        //autokey : { values }
                    });
                    tempJSONArray.sort((d1, d2) => new moment(d2.orderTime,'HH:mm:ss') - new moment(d1.orderTime,'HH:mm:ss'));
                    
                    // tempJSONArray.sort((i, j) => (i.orderTime,moment().format('HH:mm:ss')) - (j.orderTime,moment().format('HH:mm:ss')));
                    tempSubObject = {
                        'date': subObjectKey,
                        'item': tempJSONArray
                    };
                });

                this.setState({
                    userHistory: this.state.userHistory.concat(tempSubObject),
                    totalCost: tempTotalCost
                });
                // console.log('BILL >>>>\n\n' + JSON.stringify(this.state.userHistory));
            });
    }

    _onRefresh = React.Component(() => {
        console.log('onRefresh !!');
        this.setState({ refreshing: true });
        this._fetchData()
            .then(() => [this.setState({ refreshing: false }), alert('새로고침되었습니다 !')]);
    }, []);

    render() {
        return (
            <>
                <Header
                    containerStyle={{ backgroundColor: 'white' }}
                    centerComponent={(<Text style={{fontWeight:'bold', fontSize:16}}>e-Receipt / History</Text>)}
                    rightComponent={
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
                                    <Text style={{ fontWeight: 'bold', width: '25%' }}>주문상품</Text>
                                    <Text style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>가격</Text>
                                    <Text style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>용기</Text>
                                    <Text style={{ fontWeight: 'bold', width: '25%', textAlign: 'right' }}>주문시간</Text>
                                </View>,
                                <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
                                    {
                                        this.state.userHistory.map(items => {
                                            return (
                                                <>
                                                    <View style={{ borderBottomWidth: 1, margin: 5 }} />
                                                    <Text style={{ textAlign: 'right', fontStyle: 'italic' }}>
                                                        {items.date.substr(0, 4)}년{items.date.substr(5, 2)}월{items.date.substr(8, 2)}일
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
