import { StyleSheet } from 'react-native';

const paymentStyles = StyleSheet.create({
    background: {
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
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
        width:'100%',
        justifyContent:'center',
        flexDirection :'column',
        borderRadius:15,
        marginVertical:2,
        padding:10,
        backgroundColor:'white',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius:2
    }
});

export {
    paymentStyles,
}