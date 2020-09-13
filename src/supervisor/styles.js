import { StyleSheet } from 'react-native';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

const shopStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '1%',
        flex: 1
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
        margin:2,
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
        flex:1,
        backgroundColor:'darkgray',
        justifyContent: "center", 
        alignItems: "center",

    },
    body: {
        flexDirection: 'row',
        flex: 9,
        margin: 3,
        borderRadius:10,
        borderWidth:2,
        borderColor:'white',
        width: '100%',
        height:'100%',
        backgroundColor:'white',
        justifyContent: "center", 
        alignItems: "center",
        padding:5,

    },
   
    listbox_left: {
        alignSelf:'center',
        flex:4,
        backgroundColor:'lightblue', 
        width: '30%', 
        height:'95%',
        padding:5,
        alignItems:'center',
        justifyContent:'center',
    },
    listbox_center: {
        alignSelf:'center',
        backgroundColor:'#182335', 
        width: '30%',
        height:'95%',
        flex:2,
        alignItems:'center',
        justifyContent:'center',
    },
    listbox_right: {
        alignSelf:'center',
        height:'95%',
        flex:3,
        backgroundColor:'lightgray', 
        width: '35%', 
        alignItems:'center',
        justifyContent:'center',
    },
    orderlistText_Bold: {
        fontWeight:'bold',
        fontSize:22, 
        color:'black',
    },
    orderlistText_Thin: {
        fontWeight:'400',
        fontSize:16, 
        color:'#2e2e2e',
    },
    
    orderlistTitle: {
       
        textAlign:'center',
        fontWeight:'bold', 
        fontSize:35, 
        color:'white',
    },
    orderlistPastTime: {
        textAlign:'center',
        fontWeight:'bold', 
        fontSize:25,
        color:'white',
    },
    orderlistview: {
        justifyContent: "center", 
        alignItems: "center",
        flexDirection : 'row',
    },
    
    listContainer: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
    },
    buttonstyle: {
        flex: 1, 
        backgroundColor:'lightgray',
        justifyContent: "center", 
        alignItems: "center",
    },
    
    
})
const OrderlistStyle = StyleSheet.create({
   OrderlistBackground:{
        width: '100%',
        height: '90%',
        justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: 'lightgray',
        borderColor:'black',


    },
    OrderlistBody_1:{
        width: '13%' ,
        height: '90%',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    OrderlistBody_2:{
        width: '85%',
        justifyContent:'center',
        alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: 'white',
    },
     OrderlistBody_2_top:{
        width: '85%',
        height: '15%',
        justifyContent:'center',
        alignItems:'center',
        // flexDirection: 'column',
        backgroundColor: 'lightgreen',
    },
      OrderlistBody_2_bottom:{
        width: '85%',
        height: '75%',
        justifyContent:'center',
        alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: 'gray',
    },
    OrderlistButton:{
        justifyContent:'center',
        alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: 'gray',
    },
    OrderlistButtonContainer:{
        width: '90%',
        margin: '2%',
        height: '22.5%',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'blue',
        borderWidth:2,
    },
})

export {shopStyles, exampleStyle,OrderlistStyle};