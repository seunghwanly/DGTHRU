import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native';

import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import example from './example';
import { shopStyles } from './styles';
import { enableScreens } from 'react-native-screens';

enableScreens();

const shopData = [
    // 체인점
    // {
    //     id: 'hyehwa_1f',
    //     title: '혜화 디초콜릿',
    //     location: '혜화관 1층'
    // },
    {
        id: 'main_outdoor',
        title: '가온누리',
        location: '본관 야외 휴게장소'
    },
    {
        id: 'singong_1f',
        title: '남산학사 1층 카페',
        location: '신공학관 1층'
    },
    {
        id: 'hyehwa_roof',
        title: '혜화 디저트 카페',
        location: '혜화관 옥상'
    },
    //생협아닌가봄 >> 인가봄
    {
        id: 'economy_outdoor',
        title: '그루터기',
        location: '경영관 야외'
    },
    {
        id: 'munhwa_1f',
        title: '카페두리터',
        location: '학술문화관 지하1층'
    },
    // 체인점
    // {
    //     id: 'iphakcheo_outdoor',
    //     title: '블루팟 : 커피를 마신다',
    //     location: '입학처 야외공간'
    // },
    // 생협아닌가봄
    // {
    //     id: 'library_1f',
    //     title: '팬도로시',
    //     location: '중앙도서관 1층'
    // }
];

class Item extends React.Component {


    _onPress = () => {
        var user = firebase.auth().currentUser;
        const phonenumber = user.phoneNumber;
        console.log("phonenumber : ", phonenumber);
        if (this.props.id === 'hyehwa_roof') {  
            
            database().ref('admin/' + 'hyehwa_roof').on('value', (snapshot) =>{
                if(snapshot.val() == phonenumber)this.props.navigation.navigate('example',{ShopInfo : this.props.id});
                else{
                    alert('권한이없습니다!');
                }
            })

                
        }
        else
            this.props.onPressItem(this.props.id);


    };

    render() {

        var title = this.props.title;
        var location = this.props.location;

        return (
            <TouchableOpacity
                style={{ width: 300 }}
                onPress={this._onPress}
            >
                <View style={shopStyles.itemWrapper}>
                    <View style={shopStyles.itemCircle}/>
                    <View style={shopStyles.itemNameBar}>
                        <Text style={shopStyles.itemDesc}>{title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={shopStyles.itemSubDesc}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

function supervisorShops({ navigation }) {

    signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User Signed Out !'));
    }

    const onPressItem = (id) => {

        switch (id) {
            case 'main_outdoor':
                alert('준비중입니다!');
                break;
            case 'singong_1f':
                alert('준비중입니다!');
                break;
            case 'hyehwa_roof':
                alert('혜화관디저트카페');
                break;
            case 'economy_outdoor':
                alert('준비중입니다!');
                break;
            case 'munhwa_1f':
                alert('준비중입니다!');
                break;
        }
    }

    const renderItem = ({ item }) => (
        <Item
            id={item.id}
            title={item.title}
            location={item.location}
            onPressItem={onPressItem}
            navigation={navigation}
        />
    );

    const keyExtractor = (item) => item.id;

    return (
        <>
            <View style={shopStyles.background}>
                <View style={shopStyles.header}>
                    <Text style={shopStyles.title}>DGTHRU SUPERVISOR</Text>
                    <Text style={shopStyles.subtitle}>동국대학교 CAFE LIST</Text>
                </View>

                <View style={shopStyles.body}>
                    <FlatList
                        data={shopData}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        //scrollEnabled={false}

                    />
                </View>
                <View style={shopStyles.footer}>
                    <Button
                        title='로그아웃'
                        onPress={() => signOut()}
                    />
                </View>
            </View>
        </>
    );
   }


export default supervisorShops;
