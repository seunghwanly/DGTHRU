import React from 'react';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';


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
            // onPress={
              
            //   // props.name === 'Home' ? props.navigation.popToTop() : {}
            // }
          />
        </DrawerContentScrollView>
        <DrawerItem
          style={{ marginBottom: 40, marginStart: 20 }}
          label='로그아웃'
          // onPress={() => { [ signOut(), navigation.reset({ index:0, routes :  [{ name : 'HOME' }] })] }}
          onPress={() => signOut() }
          // icon={require('../../image/close-outline.png')} >> iconㅇㅕ기에 추가할 예정
        />
      </>
    );
  }
  
  export default withNavigation(CustomDrawerContent);