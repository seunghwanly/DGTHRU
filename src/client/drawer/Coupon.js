import React from 'react';
import {
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';

export default Coupon = ({ navigation }) => {
    return (
        <>
            <Header
                containerStyle={{ backgroundColor: 'white' }}
                leftComponent={
                    () => (
                        <TouchableOpacity
                            style={{ flexDirection: 'row-reverse' }}
                            // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                style={{ height: 30, width: 30,}}
                                resizeMode='cover'
                                source={require('../../../image/chevron-back-outline.png')}
                            />
                        </TouchableOpacity>
                    )
                }
                rightComponent={
                    () => (
                        <TouchableOpacity
                            style={{ flexDirection: 'row-reverse' }}
                            // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Image
                                style={{ height: 30, width: 30,}}
                                resizeMode='cover'
                                source={require('../../../image/menu-outline.png')}
                            />
                        </TouchableOpacity>
                    )
                } />
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:'white'
                }}>
                <Text>정인이화이팅</Text>
            </SafeAreaView>
        </>
    )
}