import React from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import { clientStyles } from '../styles';
import ImageLinker from '../../utils/ImageLinker'
import { enableScreens } from 'react-native-screens';

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
            return require('../../../image/shop-image/outdoor.png');
            break;
        case 'singong_1f':
            return require('../../../image/shop-image/shingong.png');
            break;
        case 'hyehwa_roof':
            return require('../../../image/shop-image/hyehwa.png');
            break;
        case 'economy_outdoor':
            return require('../../../image/shop-image/economy.png');
            break;
        case 'munhwa_1f':
            return require('../../../image/shop-image/munhwa.png');
            break;
        case 'favorate_shop':
            return require('../../../image/shop-image/shop.png');
            break;
        }
}


class Item extends React.Component {

    _onPress = () => {
        if (this.props.id === 'hyehwa_roof' || this.props.id === 'singong_1f') {
            if (this.props.navigation !== null) {
                this.props.navigation.navigate('MenuTabView',{ shopInfo: this.props.id })
            }
        }
        else
            this.props.onPressItem(this.props.id);
    };

    _LongPress = () => {
        if (this.props.id === 'hyehwa_roof') {
            if (this.props.navigation !== null) {
                this.props.navigation.navigate('Menu',{ shopInfo: this.props.id })
            }
        }
        else
            this.props.onPressItem(this.props.id);
    }

    render() {
        var title = this.props.title;
        var location = this.props.location;
        var id=this.props.id;
        
        return (
            <View style = {clientStyles.itemContainer}>

                <TouchableOpacity
                    style={clientStyles.imageContainer}
                    onPress={this._onPress}
                    onLongPress={this._LongPress}
                >
                    <ImageLinker
                        name={id}
                        style={{
                            width: 80,
                            height: 80,
                            marginVertical : 2,
                            marginTop: 15
                        }} />
                    {/* <Image style = {clientStyles.image} source={putpicture(id)}/> */}
                    <Text style={clientStyles.itemDesc}>{title}</Text>
                    <Text style={clientStyles.itemSubDesc}>{location}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function Shops({ navigation }) {
    console.log('[Shops]');
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
            <View style={[clientStyles.background,{ padding:'2%' }]}>
                <View style={
                    { 
                        paddingTop:50, 
                        paddingHorizontal:5,
                        marginTop: '20%', 
                        borderTopStartRadius:30, 
                        borderTopEndRadius:30,
                        backgroundColor:'#fff'
                    }
                    }
                    >
                    <FlatList
                        data={shopData}
                        renderItem={renderItem}
                        numColumns={2}
                        keyExtractor={keyExtractor}
                        scrollEnabled={false}
                        contentContainerStyle={{ width : '100%'}}
                    />
                </View>
            </View>
        </>
    );
}

export default Shops;