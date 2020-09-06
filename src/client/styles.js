import { StyleSheet } from 'react-native';

const clientStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '1%',
        flex: 5
    },
    header: {
        flex:1,
        width: '100%',
        marginTop:20,
        alignItems: 'center',
    },
    body: {
        flex:5,
        width: '100%',
        margin:5,
        alignItems: 'center',
    },
    footer: {
        flex:1,
        // width: '100%',
        justifyContent:'center'
        
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 22,
        color: 'gray',
        textAlign: 'center'
    },
    components: {
        fontSize: 20,
    },
    phoneNumber: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingTop: 10,
        paddingStart: 40,
        paddingEnd: 40,
        margin: 10,
        fontSize: 15,
        width: 240,
        textAlign: 'center'

    },
    appleButton: {
        width: 200,
        height: 45,
        margin: 'auto',
        alignSelf: 'center'
    },
    itemWrapper: {
        flexDirection: 'row',
        margin: 5,
        padding: 5,
        alignItems: 'center'
    },
    itemCircle: {
        borderRadius: 25,
        width: 25,
        height: 25,
        backgroundColor: 'cornflowerblue'
    },
    itemNameBar: {
        backgroundColor: 'ghostwhite',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginStart: 20,
        borderRadius: 12,
        padding: 5
    },
    itemDesc: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemSubDesc: {
        textAlign: 'right',
        color: 'gray',
        fontSize: 10,
        marginEnd: 10
    },
    image: {
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
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2%', 
    },
});

export {
    clientStyles,
}