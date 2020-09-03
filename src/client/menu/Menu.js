import React from 'react';
import {
    View,
    Text,
    FlatList,
} from 'react-native';
import { menuStyles } from './styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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
            <View style={menuStyles.background}>
                <ScrollView>
                    {
                        this.state._favoriteData.length > 0 ?
                            <>
                                <Text style={menuStyles.subTitle}>FAVORITES</Text>
                                <FlatList
                                    data={this.state._favoriteData}
                                    renderItem={
                                        ({ item }) => (
                                            <TouchableOpacity
                                                style={menuStyles.radiusIcon}
                                                onPress={() =>
                                                    this.props.navigation.navigate('SelectMenu', {
                                                        item: item.value,
                                                        shopInfo: this.props.route.params.shopInfo,
                                                        type: item.hasOwnProperty('ice_available') ? 'drink' : 'bakery'
                                                    })}
                                                onLongPress={() => popFavorite(this.props.route.params.shopInfo, item.key)}
                                            >
                                                <Text style={menuStyles.radiusText}>
                                                    {item.value.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                />
                            </>
                            :
                            <></>
                    }
                    <Text style={menuStyles.subTitle}>DRINKS</Text>
                    {/* drink data */}
                    <FlatList
                        data={this.state._drinkData}
                        renderItem={

                            ({ item }) => {

                                if (item.category_name !== 'Others') {
                                    return (
                                        <TouchableOpacity
                                            style={menuStyles.radiusIcon}
                                            onPress={() => this.props.navigation.navigate('MenuDetail', {
                                                items: item.menu,
                                                shopInfo: this.props.route.params.shopInfo,
                                                type: 'drink'
                                            })}
                                        >
                                            <Text style={menuStyles.radiusText}>
                                                {item.category_name}
                                            </Text>
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
                    />
                    <Text style={menuStyles.subTitle}>BAKERY</Text>
                    {/* bakery data */}
                    <FlatList
                        data={this.state._bakeryData}
                        renderItem={
                            ({ item }) => (
                                <TouchableOpacity style={menuStyles.radiusIcon}
                                    onPress={() => this.props.navigation.navigate('MenuDetail', {
                                        items: item.menu,
                                        shopInfo: this.props.route.params.shopInfo,
                                        type: 'bakery'
                                    })}
                                >
                                    <Text style={menuStyles.radiusText}>
                                        {item.category_name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
                <Text style={{ marginBottom: 10, color: 'gray', fontSize: 12 }}>즐겨찾기에서 상품을 길게 누르시면 삭제가 됩니다.</Text>
            </View>
        )
    }
}