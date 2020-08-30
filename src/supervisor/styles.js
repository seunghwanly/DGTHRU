import { StyleSheet } from 'react-native';

const shopStyles = StyleSheet.create({
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
    }
});

const exampleStyle = StyleSheet.create({
    background: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
    },
    listbox: {
        alignSelf:'center',
        margin: 5, 
        backgroundColor:'dodgerblue', 
        width: '85%', 
        padding:10,
        flex:1,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },
    orderlisttext: {
        fontWeight:'bold', 
        fontSize:15, 
        color:'white',
    },
    orderlistview: {
        flexDirection : 'row',
    },
    buttonstyle: {
        padding: 5,
    },
})

export {shopStyles, exampleStyle};