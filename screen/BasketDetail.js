import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet
} from 'react-native';

//firebase
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

//moment
import moment from 'moment';

import { enableScreens } from 'react-native-screens';

enableScreens();

const UserBasketData = ({ userBasketData }) => {

    const mapToComponent = (data) => {
        return data.map((value, i) => {
            return (
                <UserBasketInfo
                    item={value}
                    key={i}
                />
            );
        });
    };
    return (
        <View>
            { mapToComponent(userBasketData)}
        </View>
    )
}

const UserBasketInfo = ({ item }) => {
    return (
        <View>
            <Text>렌더링되냐?</Text>
            <Text>{item}</Text>
        </View>
    )
}

class BasketDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userBasketData : [],
            userBasketJSON : {}
        }
        console.log('constructor');

        const userPhoneNumber = auth().currentUser.phoneNumber;
        const reference = database().ref('users/' + moment().format('YYYY_MM_DD') + '/' + userPhoneNumber);

        reference
            .once('value')
            .then(
                (snapshot) => {
                    var idx = 0;
                    snapshot.forEach(
                        (childSnapShot) => {
                            var key = childSnapShot.key;
                            var val = childSnapShot.val();

                            this.state.userBasketJSON[idx] = val;
                            idx++;
                        }
                    )
                    this.state.userBasketData.push(this.state.userBasketJSON);
                    console.log(this.state.userBasketData.length);
                }
            )
        
    }

    componentDidMount () {
        console.log('componentDidMount');


    }

    shouldComponentUpdate () {
        
        console.log('shouldComponenetUpdate');

        

    }

    componentDidUpdate () {
      
    }
    
    render() {

        

        console.log('render');

        return (
            <View>
                <Text>render result</Text>
                <Text>{this.state.userBasketData.length}</Text>
            </View>
        )
    }

}

export default BasketDetail;