import { StyleSheet, Dimensions } from 'react-native';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

const shopStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '1%',
        flex: 1
    },
    header: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    body: {

        flex: 5,
        width: '100%',
        margin: 2,
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
    imageContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2%',
    },
});

const exampleStyle = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: "center",
        alignItems: "center",

    },
    body: {
        flexDirection: 'row',
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#EEAF9D',
        width: Dimensions.get('window').width / 4 * 3,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        padding: 5,

    },

    listbox_left: {
        width: '40%',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#EEAF9D',
        padding: 15,
        alignItems: 'center',

    },
    listbox_center: {
        width: '20%',
        alignSelf: 'center',
        backgroundColor: '#182335',
        alignItems: 'center',
        justifyContent: 'center',

    },
    listbox_right: {
        width: '40%',
        alignSelf: 'center',
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',

    },
    orderlistText_Bold: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    orderlistText_Thin: {
        fontWeight: '400',
        fontSize: 16,
        color: '#2e2e2e',
    },

    orderlistButtonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },

    orderlistTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28,
        color: 'white',
    },
    orderlistPastTime: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        marginVertical: 5
    },
    orderlistview: {
        width: '100%',
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
    },

    listContainer: {
        flexDirection: 'column',
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    listLeftContainer: {
        margin: 15,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
    },
    groupContainer: {
        flex: 12,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
        width: '100%',
        height: '100%',
    },
    innerContainer: {
        backgroundColor: 'green',
        flexDirection: 'row',
        borderWidth: 10,
        padding: 10

    },
    outerContainer: {
        width: '100%',
        marginVertical: 2,
        borderWidth: 5,
        borderColor: 'green',
        backgroundColor: 'blue',
    },

    listImage: {
        borderRadius: 30,
        width: 100,
        height: 100,
        marginVertical: 5
    },
    buttonstyle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        backgroundColor: '#EEAF9D',
        borderRadius: 12,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    pastOrderListText : {
        fontWeight: 'bold', 
        fontSize: 15, 
        width: '14%', 
        textAlign: 'center',
        color:'#182335'
    },
    pastOrderNumberListText : {
        fontWeight: 'bold', 
        fontSize: 15, 
        width: '7%', 
        textAlign: 'center',
        color:'#182335'
    },
    functionWrapper : {
        width:500,
        height:500,
        alignItems: 'center',
        borderRadius:30,
        paddingHorizontal:15,
        paddingVertical:20,
        marginHorizontal:10,
        backgroundColor:'white',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius:2
    },
    unhandledOrderSecond : {
        width:'10%',
        borderWidth:1
    }

})

// const pastListStyle = StyleSheet.create({


// }
const OrderlistStyle = StyleSheet.create({
    OrderlistBackground: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: 'lightgray',
        borderColor: 'black',


    },
    OrderlistBody_1: {
        width: '13%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    OrderlistBody_2: {
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: 'white',
    },
    OrderlistBody_2_top: {
        width: '85%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: 'lightgreen',
    },
    OrderlistBody_2_bottom: {
        width: '85%',
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: 'gray',
    },
    OrderlistButton: {
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: 'gray',
    },
    OrderlistButtonContainer: {
        width: '90%',
        margin: '2%',
        height: '22.5%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'blue',
        borderWidth: 2,
    },
})

export { shopStyles, exampleStyle, OrderlistStyle };