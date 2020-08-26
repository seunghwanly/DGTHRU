import { StyleSheet } from 'react-native';

const paymentStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '10%',
        flex: 1
    },
    notifyText: {
        fontSize: 44,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loadingGif: {
        width: 200,
        height: 200,
        margin: 20
    }
});

export {
    paymentStyles,
}