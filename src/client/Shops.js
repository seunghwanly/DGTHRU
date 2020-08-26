import React from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { clientStyles } from './styles';

import auth from '@react-native-firebase/auth';

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
        if (this.props.id === 'hyehwa_roof') {
            if (this.props.navigation !== null) {
                console.log('fucking shit !');
                this.props.navigation.navigate('Menu',{ shopInfo: this.props.id });
                // this.props.navigation.setParams({ shopInfo: this.props.id });
            }
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
                <View style={clientStyles.itemWrapper}>
                    <View style={clientStyles.itemCircle}/>
                    <View style={clientStyles.itemNameBar}>
                        <Text style={clientStyles.itemDesc}>{title}</Text>
                    </View>
                </View>
                <View>
                    <Text style={clientStyles.itemSubDesc}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

function Shops({ navigation }) {

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



    signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User Signed Out !'));
    }

    return (
        <>
            <View style={clientStyles.background}>
                <View style={clientStyles.header}>
                    <Text style={clientStyles.title}>DGTHRU</Text>
                    <Text style={clientStyles.subTitle}>동국대학교 CAFE LIST</Text>
                </View>

                <View style={clientStyles.body}>
                    <FlatList
                        data={shopData}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}

                    />
                </View>
                <View style={clientStyles.footer}>
                    <Button
                        title='로그아웃'
                        onPress={() => signOut()}
                    />
                </View>



            </View>
        </>
    );
}

export default Shops;