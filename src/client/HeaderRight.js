import React from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { DrawerActions } from '@react-navigation/native';

export default class HeaderRight extends React.Component {

    _basketDatabase;
    _currentOrderNumber;

    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            shopInfo: ''
        }
        this._basketDatabase = database().ref('user/basket/' + auth().currentUser.uid + '/' + 'group');
    }

    countProperties = (obj) => {
        var count = 0;

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                ++count;
        }
        return count;
    }

    _fetchData() {
        this._basketDatabase
            .on('value', (snapshot) => {
                var groupShopInfo = '';
                snapshot.forEach((childSnapShot) => {
                    //console.log('snapshot > ' + snapshot.key, snapshot.val(), childSnapShot.key, childSnapShot.val());
                    groupShopInfo = childSnapShot.val().shopInfo;
                })
                this.setState({
                    amount: this.countProperties(snapshot.val()),
                    shopInfo: groupShopInfo
                });
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    componentDidMount() {
        this._fetchData();
    }

    render() {
        console.log('> HeaderRight render : ' + this.state.amount);
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row-reverse' }}
                    onPress={() => this.props.navigation.navigate('Basket', { shopInfo: this.state.shopInfo })}
                >
                {
                    this.props.page === 'Shops' || this.props.page === 'MenuTabView' || this.props.page === "Result"?
                    <Image 
                        style={{ height: 30, width: 30, marginEnd: 10, position: "absolute", alignSelf: 'center' }}
                        resizeMode='cover'
                        source={require('../../image/cart-white.png')}
                    />
                    :
                    <Image
                        style={{ height: 30, width: 30, marginEnd: 10, position: "absolute", alignSelf: 'center' }}
                        resizeMode='cover'
                        source={require('../../image/cart-outline.png')}
                    />
                }
                    {
                        this.state.amount !== null ?
                            <View style={{ backgroundColor: this.props.page === 'Result' ? '#182335' : '#EEAF9D', width: 15, height: 15, borderRadius: 15, marginEnd: 8, marginBottom: 20, position: 'relative' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 10, fontWeight: 'bold' }}>{this.state.amount}</Text>
                            </View>
                            :
                            <></>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: 'row-reverse' }}
                    // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                >
                {
                    this.props.page === 'Shops' || this.props.page === 'MenuTabView' || this.props.page === 'Result'?
                    <Image
                        style={{ height: 30, width: 30, marginEnd: 10 }}
                        resizeMode='cover'
                        source={require('../../image/menu-white.png')}
                    />
                    :
                    <Image
                        style={{ height: 30, width: 30, marginEnd: 10 }}
                        resizeMode='cover'
                        source={require('../../image/menu-outline.png')}
                    />
                }
                </TouchableOpacity>
            </View>
        )
    }
}