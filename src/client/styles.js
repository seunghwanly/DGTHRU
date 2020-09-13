import { StyleSheet } from 'react-native';

const clientStyles = StyleSheet.create({
    background: {
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#182335',
        flex:1
    },
    header: {
        marginTop:20,
        alignItems: 'center',
        marginBottom:40
    },
    body: {
        marginVertical:'50%'
    },
    footer: {
        // width: '100%',
        justifyContent:'center',
        bottom:'5%'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#fff'
    },
    subTitle: {
        fontSize: 22,
        color: '#ccc',
        textAlign: 'center'
    },
    components: {
        backgroundColor: '#eeaf9d',
        width: 240,
        marginTop:'10%',
        padding:10,
        borderRadius: 10,
        bottom:'0%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center'
    },
    phoneNumber: {
        borderWidth: 1,
        borderColor: '#eee',
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
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#182355',
        marginVertical:4
    },
    itemSubDesc: {
        textAlign: 'right',
        color: '#555',
        fontSize: 12,
        marginVertical:2
    },
    image: {
        resizeMode:'cover',
        width:'100%',
        height:100,
        borderTopStartRadius:20,
        borderTopEndRadius:20
    },
    itemContainer: {
        width:'50%',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    imageContainer:{
        width: '90%',
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:10,
        paddingTop:0,
        paddingVertical:20,
        borderRadius:20,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius:2
    },
    
});

export {
    clientStyles,
}