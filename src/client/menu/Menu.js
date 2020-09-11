import React from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { menuStyles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageLinker from '../../utils/ImageLinker';
import { enableScreens } from 'react-native-screens';

import database from '@react-native-firebase/database';
import { popFavorite, userFavoriteDatabase } from '../../utils/DatabaseRef';


enableScreens();

export default class HyehwaDessert extends React.Component {

    _drinkDataRef;
    _bakeryDataRef;
    _favoriteDatabase;

    constructor(props) {
        super(props);

        this.state = {
            _drinkData: [],
            _bakeryData: [],
            _favoriteData: []
        }

        this._drinkDataRef = database().ref('menu/' + this.props.route.params.shopInfo + '/categories_drink');
        this._bakeryDataRef = database().ref('menu/' + this.props.route.params.shopInfo + '/categories_bakery');
        this._favoriteDatabase = userFavoriteDatabase(this.props.route.params.shopInfo);
    }

    componentDidMount() {

        this._drinkDataRef
            .once('value', (snapshot) => {
                this.setState({ _drinkData: snapshot.val() });
            });

        this._bakeryDataRef
            .once('value', (snapshot) => {
                this.setState({ _bakeryData: snapshot.val() });
            });

        this._favoriteDatabase
            .on('value', (snapshot) => {
                var tempJSONArray = [];
                snapshot.forEach((childSnapShot) => {
                    tempJSONArray.push(childSnapShot.val());
                });
                this.setState({ _favoriteData: tempJSONArray });
            });
    }

    componentWillUnmount() {
        this._favoriteDatabase.off();
    }

    render() {
        return (
            <SafeAreaView style={menuStyles.background}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center', marginTop: 10, height: Dimensions.get('window').height + 100 }}
                    scrollsToTop={true}
                >
                    {
                        this.state._favoriteData.length > 0 ?
                            <View style={menuStyles.sectionHeader}>
                                <Text style={menuStyles.subTitle}>FAVORITES❤️</Text>
                                <FlatList
                                    data={this.state._favoriteData}
                                    renderItem={
                                        ({ item }) => (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    this.props.navigation.navigate('SelectMenu', {
                                                        item: item.value,
                                                        shopInfo: this.props.route.params.shopInfo,
                                                        type: item.ice_available !== null ? 'drink' : 'bakery'
                                                    })}
                                                onLongPress={() => popFavorite(this.props.route.params.shopInfo, item.key)}
                                            >
                                                {/* <View style={menuStyles.radiusIcon} /> */}
                                                <ImageLinker name={item.value.name} style={menuStyles.radiusIcon} />
                                                <Text style={[menuStyles.radiusText, { color: 'black', fontWeight: 'normal', fontSize: 12, textShadowColor:'transparent' }]}>
                                                    {item.value.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ marginStart: 10, width: this.state._favoriteData.length > 3 ? (this.state._favoriteData.length - 3) * 80 + Dimensions.get('window').width : Dimensions.get('window').width }}
                                />
                            </View>
                            :
                            <></>
                    }
                    <View style={[menuStyles.sectionHeader, { height: '40%', width: '95%' }]}>
                        <Text style={menuStyles.subTitle}>DRINKS☕️</Text>
                        {/* drink data */}
                        <FlatList
                            data={this.state._drinkData}
                            renderItem={
                                ({ item }) => {
                                    if (item.category_name !== 'Others') {
                                        return (
                                            <TouchableOpacity
                                                // style={menuStyles.radiusIcon}
                                                onPress={() => this.props.navigation.navigate('MenuDetail', {
                                                    items: item.menu,
                                                    shopInfo: this.props.route.params.shopInfo,
                                                    type: 'drink',
                                                    categoryName: item.category_name
                                                })}
                                            >
                                                <ImageLinker 
                                                    name={item.menu[0].name} 
                                                    style={menuStyles.radiusIcon}
                                                    innerStyle={menuStyles.radiusText} 
                                                    innerText={item.category_name}
                                                    />
                                                {/* <Text style={menuStyles.radiusText}>
                                                    {item.category_name}
                                                </Text> */}
                                            </TouchableOpacity>
                                        )
                                    } else {
                                        return (
                                            <></>
                                        )
                                    }
                                }
                            }
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            contentContainerStyle={{ marginStart: 10, marginEnd: 10, alignSelf: 'center' }}
                        />
                    </View>
                    <View style={[menuStyles.sectionHeader, { height: '30%', width: '95%' }]}>
                        <Text style={menuStyles.subTitle}>BAKERY🥐</Text>
                        {/* bakery data */}
                        <FlatList
                            data={this.state._bakeryData}
                            renderItem={
                                ({ item }) => (
                                    <TouchableOpacity style={menuStyles.radiusIcon}
                                        onPress={() => this.props.navigation.navigate('MenuDetail', {
                                            items: item.menu,
                                            shopInfo: this.props.route.params.shopInfo,
                                            type: 'bakery',
                                            categoryName: item.category_name
                                        })}
                                    >
                                        <Text style={menuStyles.radiusText}>
                                            {item.category_name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ marginStart: 10, marginEnd: 10, alignSelf: 'center' }}
                        />
                    </View>
                </ScrollView>
                <Text style={{ color: 'gray', fontSize: 12 }}>즐겨찾기에서 상품을 길게 누르시면 삭제가 됩니다.</Text>
            </SafeAreaView>
        )
    }
}