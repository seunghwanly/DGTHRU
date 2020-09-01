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

enableScreens();


export default class HyehwaDessert extends React.Component {

    _drinkDataRef;
    _bakeryDataRef;
    
    constructor(props) {
        super(props);

        this.state = {
            _drinkData: [],
            _bakeryData: []
        }

        this._drinkDataRef = database().ref('menu/' + this.props.route.params.shopInfo + '/categories_drink');
        this._bakeryDataRef = database().ref('menu/' + this.props.route.params.shopInfo + '/categories_bakery');
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

    }

    render() {
        return (
            <View style={menuStyles.background}>
                <ScrollView>
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
                                                type : 'drink'
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
                                        type : 'bakery'
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
            </View>
        )
    }
}