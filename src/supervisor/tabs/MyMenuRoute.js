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
import auth from '@react-native-firebase/auth';
import { enableScreens } from 'react-native-screens';
import {myMenuStyle} from './styles';

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
        adminPhoneNumber : '+821044444444',
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



function MyMenuRoute({ navigation }) {
    function _logOut(){
        auth()
        .signOut()
        .then(() => [ console.log('User Signed Out !'),])
        .catch(() => console.log('already signed out !'));
    }
    return (
        <>
            <View style={myMenuStyle.header}>
            <Text  style={{alignSelf:'center',
                fontSize:22,
                fontWeight:'bold',
                color:'#fff',
                }}>DGTHRU SUPERVISOR</Text>
            </View>
            <View style={myMenuStyle.body}>
                <Text style={{alignItems:'flex-start'}}>
                    안녕하세요
                    
                </Text>
                <Text>
                     {shopData.find(d => d.adminPhoneNumber=== auth().currentUser.phoneNumber).title} 관리자님
                </Text>

                <TouchableOpacity
                    onPress={_logOut}
                    style={{alignSelf:'center',flexDirection:'column' , justifyContent:'flex-end'}}
                >   
                     <ImageLinker
                        name={'logout'}
                        style={
                            
                           {
                                
                                width: 50,
                                height: 50,
                                marginVertical : 2,
                                marginTop: 15     
                            
                            } 
                            } />
                             <Text>로그아웃</Text>
                </TouchableOpacity>
            </View>
            <View style={myMenuStyle.footer}>
           
            </View>
           
        </>
    );
}

export default MyMenuRoute;