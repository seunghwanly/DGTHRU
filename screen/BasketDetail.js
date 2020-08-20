import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native';

//firebase
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

//moment
import moment from 'moment';

import { enableScreens } from 'react-native-screens';
import { TouchableOpacity } from 'react-native-gesture-handler';

enableScreens();

export default class BasketDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orderData: [],
            orderJson: {
                'name': '',
                'count': 0,
                'cup': '',
                'cost': 0
            }
        }
    };

    componentDidMount() {
        const userPhoneNumber = auth().currentUser.phoneNumber;
        const reference = database().ref(this.props.route.params.shopInfo + '/' + moment().format('YYYY_MM_DD') + '/' + userPhoneNumber);

        reference
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((childSnapShot) => {
                    console.log(childSnapShot.val());
                    this.setState({
                        orderData: this.state.orderData.concat(childSnapShot.val())
                    })
                    console.log('\n after : ' + this.state.orderData.length);
                })
            });
    }

    render() {

        return (
            <View style={styles.background}>
                <View style={styles.subBackground}>
                    {
                        this.state.orderData.map(value => {
                            return (
                                <View style={
                                    {
                                        flexDirection: 'row',
                                        padding: 5,
                                        width: '100%',
                                    }
                                }>
                                    <View style={{
                                        alignSelf: 'flex-start',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <View style={[styles.radiusIcon, { marginEnd: 5 }]} />
                                        <Text style={styles.radiusText}>{value.name} [ {value.selected !== null ? value.selected : ''} ]</Text>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignSelf: 'flex-end',
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center'
                                    }}>
                                        {/* <Text>{value.cup}</Text>
                                        <Text>{value.count}</Text> */}
                                        <Text>{value.cost}원</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor:'gold',
                        borderRadius:10,
                        paddingStart:10,
                        paddingEnd:10,
                        paddingTop:5,
                        paddingBottom:5,
                        margin:15
                    }}

                    onPress={() => alert('카카오페이로 결제합니다 !')}
                >
                    <Text style={styles.radiusText}>카카오페이로 결제하기</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '5%',
        flex: 1
    },
    subBackground: {
        width: '90%',
        height: 'auto',
        backgroundColor: 'ghostwhite',
        justifyContent: 'center',
        alignItems: 'baseline',
        borderRadius: 10,
        padding: 10
    },
    radiusIcon: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'royalblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    radiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'midnightblue',
        textAlign: 'center',
        margin: 10
    },

});