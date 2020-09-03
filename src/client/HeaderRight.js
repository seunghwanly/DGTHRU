import React from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native';
import { commonDatabase, getBasketLength } from '../utils/DatabaseRef';

export default class HeaderRight extends React.Component {

    _basketDatabase;

    constructor(props) {
        super(props);

        this.state = {
            amount: 0
        }

        this._basketDatabase = commonDatabase(this.props.shopInfo);
    }

    countProperties = (obj) => {
        var count = 0;

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                ++count;
        }
        return count;
    }

    componentDidMount() {
        this._basketDatabase
            .on('value', (snapshot) => {
                this.setState({
                    amount: this.countProperties(snapshot.val())
                });
            });
    }

    render() {
        return (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    style={{ flexDirection: 'row-reverse' }}
                    onPress={() => this.props.navigation.navigate('Basket', { shopInfo: 'hyehwa_roof' })}
                >
                    <Image
                        style={{ height: 30, width: 30, marginEnd: 10, position: "absolute", alignSelf: 'center' }}
                        resizeMode='cover'
                        source={require('../../image/cart-outline.png')}
                    />
                    {
                        this.state.amount !== null ?
                            <View style={{ backgroundColor: 'deepskyblue', width: 15, height: 15, borderRadius: 15, marginEnd: 8, marginBottom: 20, position: 'relative' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 10, fontWeight: 'bold' }}>{this.state.amount}</Text>
                            </View>
                            :
                            <></>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexDirection: 'row-reverse' }}
                    // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    onPress={() => this.props.navigation.toggleDrawer()}
                >
                    <Image
                        style={{ height: 30, width: 30, marginEnd: 10 }}
                        resizeMode='cover'
                        source={require('../../image/menu-outline.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}