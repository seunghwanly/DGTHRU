import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#182335'
    },
    title: {
        fontSize: 44,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#fff'
    },
    subTitle: {
        fontSize: 20,
        color: 'gray',
        textAlign: 'center',
        color:'#ccc'
    },
    confirmButton:{
        backgroundColor: '#e15546',
        width: 180,
        marginTop:'50%',
        padding:10,
        borderRadius: 10,
        bottom:'0%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export {
    styles,
}