import React from 'react';
import { SafeAreaView, Text, Image, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';


function CustomDrawerContent(props) {

    // console.log('Custom Navigator >>'+ JSON.stringify(props.descriptor));

    signOut = () => {
      auth()
        .signOut()
        .then(() => [ console.log('User Signed Out !'),])
        .catch(() => console.log('already signed out !'));

      props.navigation.closeDrawer();
      props.navigation.reset({ index:0, routes :  [{ name : 'Home' }] });
    }
  
    return (
      <>
        <StatusBar barStyle='dark-content'/>
        <DrawerContentScrollView {...props}
          style={{ flex: 1, backgroundColor:'#182335'}}
          contentContainerStyle={{backgroundColor:'#fff', borderBottomStartRadius:30, paddingBottom:10}}
          >
          <DrawerItem
            style={{backgroundColor:'#fff'}}
            label={() => (
              <>
                <Image
                  style={{
                    width:180,
                    margin: 10
                  }}
                  resizeMode='contain'
                  source={require('../../image/dgu.jpg')}
                />
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                  {
                    auth().currentUser !== null ?
                      auth().currentUser.phoneNumber + ' 님'
                      :
                      ''
                  }
                </Text>
              </>
            )
            }
          />
          <DrawerItemList {...props}
            activeTintColor='white'
            activeBackgroundColor='#eeaf9d'
            itemStyle={{ borderTopStartRadius:30, borderBottomStartRadius:30, borderColor:'transparent', paddingStart:5, width:'100%'}}
            inactiveBackgroundColor='transparent'
            inactiveTintColor='#182335'
          />
        </DrawerContentScrollView>
        <SafeAreaView style={
          {
            backgroundColor: '#182335',
          }
        }>
        <TouchableOpacity style={{justifyContent:'flex-start', alignItems:'center', paddingStart:20, flexDirection:'row'}} onPress={() => signOut()}>
            <Image source={require('../../image/log-out-outline-white.png')} resizeMode='cover' style={{width: 20, height: 20, marginEnd:25}}/>
            <Text style={{width:'60%' ,textAlign:'right', color:'#fff'}}>로그아웃</Text>
        </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }
  
  export default withNavigation(CustomDrawerContent);