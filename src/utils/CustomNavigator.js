import React from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';


function CustomDrawerContent(props) {

    console.log('Custom Navigator >>'+props.state.routes, props.state.index);

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
        <DrawerContentScrollView {...props}
          style={{ flex: 1 }}
          >
          <DrawerItem
            label={() => <Text style={{ fontSize: 14, fontWeight:'bold' }}>{
              auth().currentUser !== null ?
                auth().currentUser.phoneNumber + ' 님'
                :
                ''
            }</Text>}
          />
          <DrawerItemList {...props}
          />
        </DrawerContentScrollView>
        <SafeAreaView>
        <TouchableOpacity style={{justifyContent:'flex-start', alignItems:'center', paddingStart:20, flexDirection:'row'}} onPress={() => signOut()}>
            <Image source={require('../../image/close-outline.png')} resizeMode='cover' style={{width: 20, height: 20, marginEnd:25}}/>
            <Text>로그아웃</Text>
        </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }
  
  export default withNavigation(CustomDrawerContent);