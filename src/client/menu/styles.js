import { StyleSheet } from 'react-native';

const menuStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor:'#182335',
    },
    radiusIcon: {
        width: 90,
        height: 90,
        borderRadius: 90,
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
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: 'gray',
        margin:2
    },
    subTitle: {
        fontSize: 14,
        fontWeight:'bold',
        color: 'gray',
        alignSelf:'flex-start',
        textAlignVertical:'center',
        marginStart: 15,
        marginEnd: 5,
        marginBottom: 10,
        marginTop:10
    },
    subRadiusIcon: {
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    subRadiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'dimgray',
        textAlignVertical: 'center',
        margin:1
    },
    subRadiusIconSoldOut: {
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    sectionHeader : {
        backgroundColor:'white',
        width:'95%',
        borderTopStartRadius:20,
        borderTopEndRadius:20
    }
});

const basketStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#2C4061',
        
    },
    subBackground: {
        padding:'5%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:5,        
    },
    radiusIcon: {
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallRadiusIcon: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'royalblue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    radiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        margin: 10
    },
    smallRadiusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#182335',
        textAlignVertical: 'center',
        margin: 5
    },
    amountButton: {
        backgroundColor: '#e2e2e2',
        borderRadius: 5,
        marginHorizontal:10,
        width: 26,
        height: 26,
    },
    chooseDetailWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        margin: 5,
    },
    chooseDetailText: {
        alignSelf: 'center',
        margin: 5
    },
    chooseDetailItem: {
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 2,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius:1
    },
    basketWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
    },
    basketTopColumnWrapper: {
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    basketTopColumnButtonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:3
    },
    basketOptionWrapper: {
        width:340,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection :'row',
        borderRadius:15,
        marginVertical:2,
        padding:5,
        backgroundColor:'white',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius:2
    },
    basketOptionDesc : {
        width: '35%',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingStart:10
    },
    basketPreferOptionWrapper: {
        flexDirection: 'column', 
        justifyContent:'center',
        alignSelf:'flex-start',
        paddingStart: 5, 
        paddingVertical:10
    },
    basketPreferOptionCount: {
        flexDirection: 'row', 
        marginStart: 10, 
        width: '65%',
        justifyContent: 'flex-end',
        alignItems:'center'
    },
    basketTwoItem: {
        width: 80,
        height: 80,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius:1
    },
    basketThreeItem: {
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius:1
    },
    pushToBasket: {
        backgroundColor: '#eeaf9d',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 40,
        paddingLeft: 45,
        paddingRight: 45,
        marginVertical:5,
        width:300
    },
    goToBasket: {
        backgroundColor: '#EEAF9D',
        borderRadius: 10,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 5,
        width: 150
    },
    detailWrapper: {
        flexDirection: 'row',
        padding: 2,
        margin:2,
        width: '100%',
        borderRadius:20,
        backgroundColor:'#fff',
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius:1
    },
    detailItemNameWrapper: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailItemInfoWrapper: {
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    },
    detailImgButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal:10
    },
    detailTotalInfoWrapper: {
        width:'90%',
        marginVertical:10,
        backgroundColor: '#eeaf9d',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal:10,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius:1
    },
    goToPayment: {
        backgroundColor: 'gold',
        alignSelf:'center',
        borderRadius: 10,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom:40,
        width: 300
    },
    offerLayout : {
        width:320,
        borderWidth:1,
        borderColor:'lightgrey', 
        alignSelf:'center',
        fontSize:12, 
        paddingVertical:10,
        paddingStart:10,
        backgroundColor:'white',
        borderRadius:10,
        marginVertical:5
    }

});

export {
    menuStyles,
    basketStyles
}