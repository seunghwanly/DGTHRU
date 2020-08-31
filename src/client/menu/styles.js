import { StyleSheet } from 'react-native';

const menuStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '5%',
        flex: 1
    },
    radiusIcon: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: 'deepskyblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    radiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 22,
        color: 'gray',
        textAlign: 'center',
        marginStart: 5,
        marginEnd: 5,
        marginBottom: 10,
        marginTop:10
    },
    subRadiusIcon: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    subRadiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'lightgray',
        textAlign: 'center',
        margin:10
    },
    subRadiusIconSoldOut: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
});

export {
    menuStyles,
}