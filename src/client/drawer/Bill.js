import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Image,
    Text, FlatList, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';

//firebase
import { userHistoryDatabase } from '../../utils/DatabaseRef';

export default Bill = ({ navigation }) => {

    const userHistoryDB = userHistoryDatabase();
    
    const [userHistory, setUserHistory] = useState(null);

    useEffect(() => {
        var tempJSON = [];
        userHistoryDB
            .once('value', (snapshot) => {
                snapshot.forEach((childSnapShot) => {
                    // console.log(childSnapShot);
                    tempJSON.push(childSnapShot.val());
                    // console.log(childSnapShot.val());
                    setUserHistory(() => tempJSON);
                    // console.log(userHistory.length);
                })
                // console.log(snapshot.val());
            })
    }, []);

    return (
        <>
            <Header
                containerStyle={{ backgroundColor: 'white' }}
                leftComponent={
                    () => (
                        <TouchableOpacity
                            style={{ flexDirection: 'row-reverse' }}
                            // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Image
                                style={{ height: 30, width: 30, }}
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
                    backgroundColor: 'white'
                }}>
                <FlatList 
                    data={userHistory}
                    renderItem={
                        ({item}) => (
                            <View>
                                <Text>{item.name} {item.cost} {item.cup} {item.orderTime}</Text>
                            </View>
                        )
                    }
                    keyExtractor={(item) => item.toString()}
                />
            </SafeAreaView>
        </>
    )

}
