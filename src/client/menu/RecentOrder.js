import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import ImageLinker from '../../utils/ImageLinker';
import { userHistoryTotalDatabase } from '../../utils/DatabaseRef';
import database from '@react-native-firebase/database';

import Loading from '../payment/Loading';

export default class RecentOrder extends React.Component {
    _userHistoryDatabase;

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading : true,
            
        }

        this._userHistoryDatabase = userHistoryTotalDatabase();
    }

    // shouldComponentUpdate(nextProps) {
    //     return nextProps.favorites !== this.props.favorites;
    // }

    componentDidMount = async () => {

        setTimeout(() => { this.setState({ isLoading : false })}, 3000);

        var recentOrder = [];

        this._userHistoryDatabase
            .once('value', snapshot => {

                snapshot.forEach((item, index) => {
                    if (index <= snapshot.numChildren() - 1) {
                        item.forEach((childItem, idx) => {
                            if (idx >= item.numChildren() - 3 && idx <= item.numChildren() - 1) {
                                console.log('> RecentOrder : ' + childItem.key);
                                // single menu
                                if (childItem.key.charAt(0) === '-') {
                                    // set type
                                    var type = 'categories_drink';
                                    if (childItem.val().options.hasOwnProperty('type') === false)
                                        type = 'categories_bakery';
                                    // for push
                                    var temp = {
                                        name: childItem.val().name,
                                        cost: childItem.val().cost,
                                        shopInfo: childItem.val().orderInfo.shopInfo,
                                        type: type
                                    };
                                    recentOrder.push(temp);
                                }
                                // group menu
                                else {
                                    childItem.forEach(groupItem => {
                                        groupItem.forEach(groupChild => {
                                            console.log('> RecentOrder : ' + groupChild.key)
                                            // set type
                                            var type = 'categories_drink';
                                            if (groupChild.val().options.hasOwnProperty('type') === false)
                                                type = 'categories_bakery';
                                            // for push
                                            var temp = {
                                                name: groupChild.val().name,
                                                cost: groupChild.val().cost,
                                                shopInfo: groupChild.val().orderInfo.shopInfo,
                                                type: type
                                            };
                                            recentOrder.push(temp);
                                        })
                                    })
                                }
                            }
                        })
                    }
                })
            }).then(() => {
                //데이터베이스에서 item 가져오기
                recentOrder.forEach((item) => {
                    database()
                        .ref('menu/' + item.shopInfo + '/' + item.type)
                        .once('value', snapshot => {
                            snapshot.forEach(numbers => {              // 0,1,2,3,4, ...
                                numbers.forEach(menu => {              //category_name, menu
                                    menu.forEach(menuItems => {     // 0,1,2, ...
                                        if (menuItems.val().name === item.name) {
                                            // console.log('> after before set : ' + JSON.stringify(menuItems.val()));

                                            var forPushData = {
                                                categoryName: menuItems.val().category_name,
                                                menu: menuItems.val(),
                                                shopInfo:item.shopInfo,
                                                type:item.type
                                            };
                                            this.setState({ data: this.state.data.concat(forPushData) });   // 중복된 값 삭제
                                        }
                                    })
                                })
                            })
                        }).then(() => {
                            // 중복된 값을 삭제
                            console.log('fetched data');
                        })
                })
            })
    }

    render() {
        if(!this.state.isLoading) {
        return (
            <SafeAreaView style={{ backgroundColor:'#fff' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '10%', }}>
                    <Text style={
                        {
                            fontSize: 24,
                            color: '#182335',
                            fontWeight: 'bold',
                            marginStart: '5%',
                            textAlignVertical: 'center'
                        }
                    }>최근 주문한 </Text>
                    <Text style={
                        {
                            fontSize: 24,
                            color: '#eeaf9d',
                            fontWeight: 'bold',
                            textAlignVertical: 'center'
                        }
                    }>
                        메뉴
                        </Text>
                </View>
                <ScrollView horizontal={true} style={{ paddingStart:'5%'}} showsHorizontalScrollIndicator={false}>
                {
                    this.state.data.map((item, index) => {
                        return (
                            <View>
                                <View style={
                                    {
                                        marginStart: 15,
                                        marginTop: 15,
                                        height: 180,
                                        width: 135,
                                        borderRadius: 20,
                                        backgroundColor: '#fff',
                                        padding: 10,
                                        marginVertical: 4,
                                        alignItems: 'center',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 1,
                                            height: 2
                                        },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 2
                                    }
                                }>   
                                    <ImageLinker name={item.menu.name} style={{ width: 60, height: 60, borderRadius: 50, marginTop:10 }} />
                                    <View
                                        style={
                                            {
                                                height: '20%',
                                                marginVertical:'10%',
                                                alignItems: 'center'
                                            }
                                        }>
                                        <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>{item.menu.name}</Text>
                                        <Text style={{ marginVertical: 5, fontSize: 12, color: '#666' }}>{item.menu.cost.toLocaleString()}원</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={
                                            {
                                                borderRadius: 20,
                                                height: 30,
                                                backgroundColor: '#eeaf9d',
                                                justifyContent: 'center'
                                            }
                                        }
                                        onPress={() => {
                                            this.props.navigation.navigate('SelectMenu', {
                                                item: item.menu,
                                                shopInfo: item.shopInfo,
                                                type: item.type === 'categories_drink' ? 'drink' : 'bakery',
                                                categoryName: item.categoryName
                                            })
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12, paddingVertical: 5, paddingHorizontal: 15 }}>주문하기</Text>
                                    </TouchableOpacity>
                                </View>
                                <ImageLinker name={item.shopInfo} style={{ width: 40, height: 40, position:'absolute'}} />
                            </View>
                        )
                    })
                }
                </ScrollView>
            </SafeAreaView>
        )
            }
            else {
                return(
                    <Loading style={{ backgroundColor : '#fff' }} fontStyle={{ color:'#aaa' }} />
                )
            }
    }
}