import { StyleSheet } from 'react-native';

const paymentStyles = StyleSheet.create({
    background: {
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#eeaf9d',
        padding: '10%',
        flex: 1
    },
    notifyText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'gray'
    },
    loadingGif: {
        width: 200,
        height: 200,
        margin: 20
    },
    orderWrapper:{
        width:300,
        flexDirection :'column',
        borderRadius:15,
        marginVertical:2,
        padding:20,
        backgroundColor:'white',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius:1
    }
});

export {
    paymentStyles,
}