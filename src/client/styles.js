import { StyleSheet } from 'react-native';

const clientStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
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
        height: '60%',
        width: '100%'
    },
    footer: {
        height: '20%',
        width: '100%',
    },
    title: {
        fontSize: 44,
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
        borderRadius: 5,
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingTop: 10,
        paddingStart: 40,
        paddingEnd: 40,
        margin: 10,
        fontSize: 15,
        width: 200,
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
        backgroundColor: 'royalblue',
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
        backgroundColor: 'midnightblue',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 40,
        paddingLeft: 45,
        paddingRight: 45,
    },
    goToBasket: {
        backgroundColor: 'midnightblue',
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
    }

});



export {
    clientStyles,
    basketStyles,
}