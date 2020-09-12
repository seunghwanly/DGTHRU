import { StyleSheet } from 'react-native';

const menuStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor:'#182335'
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
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    sectionHeader : {
        backgroundColor:'white',
        width:'95%',
        marginTop:'20%',
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
        backgroundColor: '#182335',
        
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
        margin: 5
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
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        textAlignVertical: 'center',
        margin: 5
    },
    amountButton: {
        backgroundColor: '#DDD',
        borderRadius: 5,
        marginHorizontal:10,
        width: 20,
        height: 20,
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
        width: 80,
        height: 80,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 4,
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
        width:'100%',
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
    basketPreferOptionWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingStart: 5, 
        alignSelf:'flex-start'
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
        width: '100%',
    },
    detailItemNameWrapper: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailItemInfoWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    detailImgButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginStart: 10,
    },
    detailTotalInfoWrapper: {
        marginStart: 'auto',
        marginEnd: 'auto',
        marginTop: 5,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        flexDirection: 'row',
        // width: '100%',
    },
    goToPayment: {
        backgroundColor: 'gold',
        borderRadius: 10,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 15,
        width: 300
    },
    offerLayout : {
        width:300,
        borderWidth:1,
        borderColor:'lightgrey', 
        alignSelf:'center',
        fontSize:12, 
        paddingVertical:10,
        paddingStart:10,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:5,
        marginBottom:15
    }

});

export {
    menuStyles,
    basketStyles
}