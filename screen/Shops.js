import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

function Shops() {
    return(
        <>
            <View style={styles.container}>
                <Text style={styles.text}>Welcome !</Text>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text : {
        fontSize:44,
        fontWeight:'bold',
        textAlign:'center'
    }
});
export default Shops;