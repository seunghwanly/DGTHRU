import { StyleSheet } from 'react-native';

export const BillStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalSubBackground: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalButton: {
        borderRadius: 10,
        backgroundColor: 'black',
        width: '90%',
        paddingHorizontal: 50,
        paddingVertical: 10
    },

});

export const MainBillStyle = StyleSheet.create({
    mainBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#182335',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    mainTopCategory: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        borderTopStartRadius: 12,
        borderTopEndRadius: 12
    },
    mainTopCategoryTotalCostText: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 10
    },
    mainTopCategoryInfoWrapper: {
        flexDirection: 'row',
        marginBottom: 5,
        borderBottomWidth: 1,
        padding: 8
    },
    subDateWrapper: {
        paddingTop: 2,
        paddingBottom: 2,
        marginBottom: 5,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    },
    subItemsWrapper: {
        flexDirection: 'row',
        marginVertical: 3,
        alignItems: 'center',
    },
    subItemsTextLeft: {
        fontSize: 13,
        width: '25%'
    },
    subItemsTextCenter: {
        fontSize: 13,
        width: '20%',
        textAlign: 'center'
    },
    subItemsTextRight: {
        fontSize: 13,
        width: '20%',
        textAlign: 'right'
    },
    imageLinkerSmall: {
        width: 25,
        height: 25,

    },
    subItemBottomBorder: {
        width: '100%',
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: '#eee',
        marginVertical: 2
    }
});

export const RecieptModal = StyleSheet.create({
    imageLinker: {
        width: 100,
        height: 100,
        alignSelf: 'flex-end',
        position: 'absolute',
        opacity: 0.3,
        right: 10,
        top: 10,
        transform: [{ rotate: '330deg' }]
    },
    orderNumberWrapper: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderStyle: 'solid',
        marginTop: 20,
        width: 250
    },
    orderNumberText: {
        fontWeight: '700',
        fontSize: 18,
        margin: 10,
        textAlign: 'center'
    },
    recieptItemWrapper: {
        marginBottom: 20,
        marginTop: 5,
        padding: 10,
        width: '100%',
        alignItems: 'stretch'
    },
    recieptTopItemWrapper: {
        flexDirection: 'row',
        marginBottom: 5,
        borderBottomWidth: 1,
        padding: 8
    },
    recieptTopItemTextLeft: {
        fontWeight: 'bold',
        width: '30%',
        textAlign: 'left'
    },
    recieptTopItemTextCenter: {
        fontWeight: 'bold',
        width: '20%',
        textAlign: 'center'
    },
    recieptTopItemTextRight: {
        fontWeight: 'bold',
        width: '30%',
        textAlign: 'right'
    },
    recieptItemSubWrapper: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 2
    },
    recieptItemTextLeft: {
        fontSize: 13,
        width: '30%'
    },
    recieptItemTextCenter: {
        fontSize: 13,
        textAlign: 'center',
        width: '20%'
    },
    recieptItemTextRight: {
        fontSize: 13,
        width: '30%',
        textAlign: 'right'
    },
    totalCostWrapper: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 10
    },
    totalCostTextLeft: {
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'left',
        width: '40%'
    },
    totalCostTextRight: {
        fontSize: 15,
        fontWeight: 'bold', textAlign: 'right',
        width: '60%'
    },
    orderTimeWrapper : {
        flexDirection: 'row', 
        width: '100%', 
        marginTop: 20 
    },
    orderTimeTextLeft:{
        fontSize: 15, 
        fontWeight: '600', 
        textAlign: 'left', 
        width: '40%'
    },
    orderTimeTextRight:{
        fontSize: 15, 
        textAlign: 'right', 
        width: '60%'
    },
    isCanceledWrapper: {
        backgroundColor: '#fff',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '125%',
        height: '100%',
        position: 'absolute',
    },
    isCanceledText: {
        fontSize: 33,
        fontWeight: 'bold',
        color: '#000'
    },
})

const couponStyles = StyleSheet.create({
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
        }
    
});

export {
    couponStyles
}