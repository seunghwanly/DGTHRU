import React from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    ImageBackgroundBase,
    Image
} from 'react-native';
import { shopStyles } from './styles';
import { enableScreens } from 'react-native-screens';
import CustomNavigator from '../utils/CustomNavigator';

enableScreens();

const shopData = [
    {
        id: 'main_outdoor',
        title: '가온누리',
        location: '본관 야외 휴게장소',
    },
    {
        id: 'singong_1f',
        title: '남산학사',
        location: '신공학관 1층',
    },
    {
        id: 'hyehwa_roof',
        title: '혜화카페',
        location: '혜화관 옥상',
    },
    {
        id: 'economy_outdoor',
        title: '그루터기',
        location: '경영관 야외',
    },
    {
        id: 'munhwa_1f',
        title: '카페두리터',
        location: '학술문화관 지하1층',
    },
    {
        id: 'favorate_shop',
        title: '즐겨찾기',
        location: ' ',
    },
];

function putpicture(id){
    switch (id) { 
        case 'main_outdoor':
            return require('../../image/shop-image/outdoor.png');
            break;
        case 'singong_1f':
            return require('../../image/shop-image/shingong.png');
            break;
        case 'hyehwa_roof':
            return require('../../image/shop-image/hyehwa.png');
            break;
        case 'economy_outdoor':
            return require('../../image/shop-image/economy.png');
            break;
        case 'munhwa_1f':
            return require('../../image/shop-image/munhwa.png');
            break;
        case 'favorate_shop':
            return require('../../image/shop-image/shop.png');
            break;
        }
}

class Item extends React.Component {

    _onPress = () => {
        if (this.props.id === 'hyehwa_roof') {
            if (this.props.navigation !== null) {
                this.props.navigation.navigate('example',{ shopInfo: this.props.id });
            }
        }
        else
            this.props.onPressItem(this.props.id);
    };

    render() {
        var title = this.props.title;
        var location = this.props.location;
        var id=this.props.id;
        
        return (
            <View style = {shopStyles.itemContainer}>
                <TouchableOpacity
                    style={shopStyles.imageContainer}
                    onPress={this._onPress}
                >
                    <Image style = {shopStyles.image} source={putpicture(id)}/>
                </TouchableOpacity>
                <Text style={shopStyles.itemDesc}>{title}</Text>
                <Text style={shopStyles.itemSubDesc}>{location}</Text>
            </View>
        );
    }
}

function supervisorShops({ navigation }) {

    function _onPress(id){
        if (id === 'hyehwa_roof') {
            if (navigation !== null) {
                navigation.navigate('example',{ shopInfo: id });
            }
        }
        else
            onPressItem(id);
    };

    const onPressItem = (id) => {

        switch (id) {
            case 'main_outdoor':
                alert('준비중입니다!');
                break;
            case 'singong_1f':
                navigation.navigate('SupervisorTabview',{ shopInfo:id });
                break;
            case 'hyehwa_roof':
                alert('혜화관디저트카페');
                break;
            case 'economy_outdoor':
                alert('준비중입니다!');
                break;
            case 'munhwa_1f':
                navigation.navigate('SupervisorOrderList',{ shopInfo:id });
                break;
            case 'favorate_shop':
                alert('준비중입니다!');
                break;
        }
    }
    const renderItem = ({ item }) => (
        <Item
            id={item.id}
            title={item.title}
            location={item.location}
            picture={item.picture}
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
                    <Text style={shopStyles.subTitle}>동국대학교 CAFE LIST</Text>
                </View>
                <View style={shopStyles.body}>
                    <FlatList
                        data={shopData} 
                        renderItem={renderItem}
                        numColumns={2}
                        keyExtractor={keyExtractor}
                        scrollEnabled={true}
                    />
                </View>
            </View>
        </>
    );
}

export default supervisorShops;