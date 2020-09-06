import { StyleSheet } from 'react-native';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

const shopStyles = StyleSheet.create({
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
    title: {
        fontSize: 25,
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