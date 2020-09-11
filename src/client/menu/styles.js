import { StyleSheet } from 'react-native';

const menuStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
        borderRadius:10,
        margin:10,
        paddingTop:10,
        height:'22%'
    }
});

const basketStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '5%',
    },
    subBackground: {
        width: '95%',
        height: 'auto',
        backgroundColor: 'ghostwhite',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10
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
        color: 'midnightblue',
        textAlign: 'center',
        margin: 10
    },
    smallRadiusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'midnightblue',
        textAlignVertical: 'center',
        margin: 10
    },
    amountButton: {
        backgroundColor: 'darkgray',
        borderRadius: 10,
        width: '5%',
        height: '5%',
        color: 'midnightblue'
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
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 2,
    },
    basketWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    basketLeftColumnWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginStart:5
    },
    basketLeftColumnButtonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    basketRightColumnWrapper: {
        alignItems: 'center',
        width: '72%',
    },
    basketTwoItem: {
        width: 80,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 2,
    },
    basketThreeItem: {
        width: 60,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 2,
    },
    pushToBasket: {
        backgroundColor: 'dodgerblue',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 40,
        paddingLeft: 45,
        paddingRight: 45,
    },
    goToBasket: {
        backgroundColor: '#69302A',
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
        width:'90%', 
        borderWidth:1,
        borderColor:'lightgrey', 
        alignSelf:'center', 
        fontSize:12, 
        padding:10, 
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