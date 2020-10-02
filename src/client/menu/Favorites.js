import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    Alert,
    StatusBar
} from 'react-native';
import RecentOrder from './RecentOrder';
import { userFavoriteDatabase, popFavorite, favoriteRef } from '../../utils/DatabaseRef';
import database from '@react-native-firebase/database';
import ImageLinker from '../../utils/ImageLinker';

export default class Favorites extends React.Component {

    _favoriteDatabase;

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this._favoriteDatabase = userFavoriteDatabase();
    }

    shouldComponentUpdate(nextState) {
        console.log('> Favorites shouldComponentUpdate');
        return nextState.data !== this.state.data;
    }

    componentDidMount = async () => {
        console.log('> Favorites constructor');
        this._fetchData();
        this._setData();
    }

    _fetchData() {
        this._favoriteDatabase
            .on('value', (snapshot) => {

                snapshot.forEach((child) => {

                    //before update get real data now only for sold_out
                    const type = child.val().type === 'drink' ? 'categories_drink' : 'categories_bakery';

                    database().ref(
                        'menu/' + child.val().shopInfo + '/' +
                        type + '/'
                    ).once('value', menuSnapshot => {

                        menuSnapshot.forEach((menuCategory) => {

                            if (menuCategory.val().category_name === child.val().categoryName) {

                                menuCategory.val().menu.forEach((menuItems) => {   // menu

                                    if (menuItems.name === child.val().value.name) {  // same item

                                        //update favorite database
                                        database()
                                            .ref(favoriteRef() + '/' + child.val().key + '/value')
                                            .update({ sold_out: menuItems.sold_out }); // update
                                    }   //if
                                })  //menu forEach
                            }   //if
                        })  // menuCategory forEach
                    });  // database()
                }); // snapshot forEach
            });
    }

    _setData() {
        //push to tempJSON
        this._favoriteDatabase
            .once('value', forPush => {
                var tempJSON = [];
                forPush.forEach((item) => {
                    tempJSON.push(item.val());
                }); // once
                this.setState({ data : this.state.data.concat(tempJSON) });
            });// tempJSON push
    }

    componentWillUnmount() {
        this._favoriteDatabase.off();
    }

    render() {
        console.log('> Favorites render');
        if (this.state.data.length > 0) {
            return (
                <View style={
                    {
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        flex: 1
                    }
                }>
                    <StatusBar barStyle='dark-content' />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10%', }}>
                        <Text style={
                            {
                                fontSize: 24,
                                color: '#182335',
                                fontWeight: 'bold',
                                marginStart: '5%',
                                textAlignVertical: 'center'
                            }
                        }>즐겨찾는 </Text>
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
                    <FlatList
                        data={this.state.data}
                        style={
                            {
                                height: '30%',
                                marginVertical: '10%'
                            }
                        }
                        contentContainerStyle={
                            {
                                padding: '5%',
                                width: this.state.data.length * 165,
                            }
                        }
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={
                            ({ item }) => {

                                if (!item.value.sold_out) {

                                    return (
                                        <>
                                            <View style={
                                                {
                                                    marginStart: 15,
                                                    marginTop: 15,
                                                    height: 200,
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
                                                <TouchableOpacity
                                                    style={
                                                        {
                                                            alignSelf: 'flex-end',
                                                            justifyContent: 'center'
                                                        }
                                                    }
                                                    onPress={() => {
                                                        Alert.alert('DGTHRU 알림', item.value.name + '를 삭제하시겠습니까?',
                                                            [
                                                                { text: '취소', onPress: () => console.log('canceled !') },
                                                                { text: '확인', onPress: () => popFavorite(item.key) }
                                                            ])
                                                    }}
                                                >
                                                    <Image resizeMode='cover' style={{ width: 20, height: 20 }} source={require('../../../image/close-outline.png')} />
                                                </TouchableOpacity>
                                                <ImageLinker name={item.value.name} style={{ width: 60, height: 60, borderRadius: 50 }} />
                                                <View
                                                    style={
                                                        {
                                                            height: '20%',
                                                            marginVertical: '10%',
                                                            alignItems: 'center',
                                                        }
                                                    }>
                                                    <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>{item.value.name}</Text>
                                                    <Text style={{ marginVertical: 5, fontSize: 12, color: '#666' }}>{item.value.cost.toLocaleString()}원</Text>
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
                                                            item: item.value,
                                                            shopInfo: item.shopInfo,
                                                            type: item.type,
                                                            categoryName: item.categoryName
                                                        })
                                                    }}
                                                >
                                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12, paddingVertical: 5, paddingHorizontal: 15 }}>주문하기</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <ImageLinker name={item.shopInfo} style={{ width: 40, height: 40, position: 'absolute', }} />
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <View style={
                                                {
                                                    marginStart: 15,
                                                    marginTop: 15,
                                                    height: 200,
                                                    width: 135,
                                                    borderRadius: 20,
                                                    backgroundColor: '#777',
                                                    padding: 10,
                                                    marginVertical: 4,
                                                    alignItems: 'center',
                                                    shadowColor: "#000",
                                                    shadowOffset: {
                                                        width: 1,
                                                        height: 2
                                                    },
                                                    shadowOpacity: 0.3,
                                                    shadowRadius: 2,
                                                    elevation: 1
                                                }
                                            }>
                                                <View
                                                    style={
                                                        {
                                                            alignSelf: 'flex-end',
                                                            justifyContent: 'center',
                                                            opacity: 0.5
                                                        }
                                                    }
                                                >
                                                    <Image resizeMode='cover' style={{ width: 20, height: 20 }} source={require('../../../image/close-outline.png')} />
                                                </View>
                                                <ImageLinker name={item.value.name} style={{ width: 60, height: 60, borderRadius: 50, opacity: 0.5 }} />
                                                <View
                                                    style={
                                                        {
                                                            height: '20%',
                                                            marginVertical: '10%',
                                                            alignItems: 'center',
                                                            opacity: 0.5
                                                        }
                                                    }>
                                                    <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>{item.value.name}</Text>
                                                    <Text style={{ marginVertical: 5, fontSize: 12, color: '#666' }}>{item.value.cost.toLocaleString()}원</Text>
                                                </View>
                                                <View
                                                    style={
                                                        {
                                                            borderRadius: 20,
                                                            height: 30,
                                                            backgroundColor: '#eeaf9d',
                                                            justifyContent: 'center',
                                                            opacity: 0.5
                                                        }
                                                    }
                                                >
                                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12, paddingVertical: 5, paddingHorizontal: 15 }}>주문하기</Text>
                                                </View>
                                            </View>
                                            <Text style={
                                                {
                                                    fontSize: 33,
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    position: 'absolute',
                                                    left: '35%',
                                                    top: '35%'
                                                }
                                            }>품 절</Text>
                                            <ImageLinker name={item.shopInfo} style={{ width: 40, height: 40, position: 'absolute', }} />
                                        </>
                                    )
                                }
                            }
                        }
                        keyExtractor={item => item.key}
                    />
                    <RecentOrder navigation={this.props.navigation} favorites={this.state.data} />
                </View>
            );
        }
        else {
            return (
                <>
                    <View
                        style={
                            {
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                            }
                        }
                    >
                        <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>즐겨찾기로 등록된 상품이 없어요</Text>
                        <Text style={{ marginVertical: 20, textAlign: 'center', fontSize: 14, color: '#777', fontWeight: '500' }}>메뉴선택화면에서 길게 누르면 {'\n'} 즐겨찾기로 등록이 가능합니다 ! {'\n'} 자주 찾는 메뉴를 등록해보세요 !</Text>
                        <TouchableOpacity
                            style={
                                {
                                    marginTop: 30,
                                    borderRadius: 15,
                                    width: 150,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#eeaf9d',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 1,
                                        height: 2
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 2
                                }
                            }
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, paddingVertical: 5, paddingHorizontal: 15 }}>등록하러 가기</Text>
                        </TouchableOpacity>
                    </View>
                    <RecentOrder navigation={this.props.navigation} favorites={this.state.data} />
                </>
            );
        }
    }
}