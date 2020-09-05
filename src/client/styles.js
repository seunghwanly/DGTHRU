import { StyleSheet } from 'react-native';

const clientStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '3%',
        //margin: '5%',
        flex: 1
    },
    header: {
        flex:1,
        //height: '20%',
        width: '100%',
        //margin: 5,
        alignItems: 'center',
    },
    body: {
        flex: 6,
        width: '100%',
        //height: '90%',
        alignItems: 'center',
        margin: 3,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 15,
        color: 'gray',
        textAlign: 'center'
    },
    itemWrapper: {
        flexDirection: 'row',
        margin: 4,
        padding: 4,
        flex: 1,
        alignItems: 'center'
    },
    itemDesc: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemSubDesc: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 10,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: "center",
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 12,

    },
    itemContainer: {
        width: "50%",
        alignItems: 'center',
    },
    imageContainer:{
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10, 
    },

});

export {
    clientStyles,
}