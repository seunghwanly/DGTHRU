import React, {useState} from 'react';
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
import auth from '@react-native-firebase/auth';
import { enableScreens } from 'react-native-screens';
import CustomNavigator from '../utils/CustomNavigator';
import database from '@react-native-firebase/database';
import { clientStyles } from '../client/styles';

enableScreens();

const shopData = [  
    {
        id: 'main_outdoor',
        adminPhoneNumber : '+821033333333',
        title: '가온누리',
        location: '본관 야외 휴게장소',
    },
    {
        id: 'singong_1f',
        adminPhoneNumber : '+821022221111',
        title: '남산학사',
        location: '신공학관 1층',
    },
    {
        id: 'hyehwa_roof',
        adminPhoneNumber : '+821011112222',
        title: '혜화카페',
        location: '혜화관 옥상',
    },
    {
        id: 'economy_outdoor',
        adminPhoneNumber : '+821022222222',
        title: '그루터기',
        location: '경영관 야외',
    },
    {
        id: 'munhwa_1f',
        title: '카페두리터',
        adminPhoneNumber : '+821041282470',
        location: '학술문화관 지하1층',
    },
    {
        id: 'logout',
        title: '로그아웃',
        adminPhoneNumber : '+8200000000',
        location: '오늘 하루도 수고하셨어요 !',
    },
   
];




// function putpicture(id){
//     switch (id) { 
//         case 'main_outdoor':
//             return require('../../image/shop-image/outdoor.png');
//             break;
//         case 'singong_1f':
//             return require('../../image/shop-image/shingong.png');
//             break;
//         case 'hyehwa_roof':
//             return require('../../image/shop-image/hyehwa.png');
//             break;
//         case 'economy_outdoor':
//             return require('../../image/shop-image/economy.png');
//             break;
//         case 'munhwa_1f':
//             return require('../../image/shop-image/munhwa.png');
//             break;
//         case 'favorate_shop':
//             return require('../../image/shop-image/shop.png');
//             break;
//         }
// }

class Item extends React.Component {
    componentDidMount(){
        var li = [];
      

        // var shopInfoRef = database().ref().child('adminInfo');
        // for(var i = 0; i<shopData.length; i++){
        //     shopInfoRef.child(shopData[i].adminPhoneNumber).set({
        //         id : shopData[i].id,
        //         title : shopData[i].title,
        //         location : shopData[i].location,
        //     })

        // }

    }

  

    _onPress = () => {
            this.props.onPressItem(this.props.id);
    };

    render() {
        var title = this.props.title;
        var location = this.props.location;
        var id=this.props.id;
        
        return (
            <View style = {[shopStyles.itemContainer ]}>
                <TouchableOpacity
                    style={shopStyles.imageContainer}
                    onPress={this._onPress}
                >
                     <ImageLinker
                        name={id}
                        style={
                            id ==='logout' ? {
                                width: 120,
                                height: 100,
                                marginVertical : 2,
                                marginTop: 15     
                            

                            } :
                            {
                            width: 120,
                            height: 120,
                            marginVertical : 2,
                            marginTop: 15
                            
                        }} />
                </TouchableOpacity>
                <Text style={shopStyles.itemDesc}>{title}</Text>
                <Text style={shopStyles.itemSubDesc}>{location}</Text>
            </View>
        );
    }
}

function supervisorShops({ navigation }) {
    const [userInfo, setuserInfo] = useState(1);
    
    function fetchUserInfo(){
        var newInfo = shopData.filter(function(item){    
            return item.adminPhoneNumber === auth().currentUser.phoneNumber;
          });         
          console.log("과연 ? " + newInfo.id);
         return newInfo.id;
        
    }


    function _onPress(id){
            onPressItem(id);
    };

    const onPressItem = (id) => {

        switch (id) {
            case 'main_outdoor':
                navigation.navigate('SupervisorOrderList',{ shopInfo:id });
                break;
            case 'singong_1f':
                navigation.navigate('SupervisorOrderList',{ shopInfo: id});
                break;
            case 'hyehwa_roof':
                navigation.navigate('SupervisorOrderList',{ shopInfo:id });
                break;
            case 'economy_outdoor':
                navigation.navigate('SupervisorOrderList',{ shopInfo:id });
                break;
            case 'munhwa_1f':
                navigation.navigate('SupervisorOrderList',{ shopInfo:id });
                break;
            case 'logout':
                _logOut();
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

    function _logOut(){
        auth()
        .signOut()
        .then(() => [ console.log('User Signed Out !'),])
        .catch(() => console.log('already signed out !'));
    }

    
    
    const keyExtractor = (item) => item.id;
    return (
        <>
            <View style={shopStyles.background}>
                <View style={shopStyles.header }>
                    <Text style={shopStyles.title}>DGTHRU SUPERVISOR</Text>

                    <View style={{flexDirection:'row' ,marginTop:5}}>
                    <Text style={[shopStyles.subTitle,{fontWeight:'bold' , color:'black'} ]} > {
                        shopData.find(d => d.adminPhoneNumber=== auth().currentUser.phoneNumber).title
                    } </Text>

                      <Text style={shopStyles.subTitle}> 관리자님 반갑습니다~</Text>

                    </View>
                </View>
                <View style={{alignContent:'flex-end'}}>
                <Text style={shopStyles.subTitle}>동국대학교 CAFE LIST</Text>

                </View>
                <View style={[shopStyles.body ,{ borderTopColor:'#182335' , borderTopWidth:3 ,backgroundColor:'white',}]}>
                    <View style={{

                        backgroundColor:'white'
                    }}>
                    <FlatList
                        style={{backgroundColor:'white',}}
                        data={shopData} 
                        renderItem={renderItem}
                        numColumns={3}
                        keyExtractor={keyExtractor}
                        scrollEnabled={false}
                    />
                    </View>
                </View>
            </View>
        </>
    );
}

export default supervisorShops;