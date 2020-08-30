import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        //width: '100%',
        //height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '10%',
        flex: 1
    },
    header: {
        height: '20%',
        width: '100%'
    },
    body: {
        flex:4,
        // width: '100%',
        margin:5,
    },
    footer: {
        height: '20%',
        width: '100%',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 22,
        color: 'gray',
        textAlign: 'center'
    },
    item: {

    },
});

export {styles};