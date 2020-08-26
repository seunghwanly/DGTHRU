import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 44,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 20,
        color: 'gray',
        textAlign: 'center'
    },
    confirmButton:{
        margin: 15,
        backgroundColor: 'dodgerblue',
        width: 180,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export {
    styles,
}