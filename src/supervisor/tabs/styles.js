import { StyleSheet } from 'react-native';

export const menuManage = StyleSheet.create({
    mainBackground :{
        backgroundColor: '#fff',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        marginTop: 30,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
    },
    searchBar : {
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    mainWrapper : {
        flexDirection:'row',
    },
    categoryWrapper : {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 200,
        paddingTop:20,
        padding:5,
        margin: 5,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius: 1
    },
    categoryWrapperTitle : {
        fontWeight:'bold',
        fontSize:16,
        paddingStart:10
    },
    categoryFlatList : {
        marginTop:20,
    },
    categoryFlatlistItems : {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor:'#eee',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 1
    },
    categoryFlatlistItemsTitle:  {
        fontSize:12,
        textAlign:'center'
    }
});

export const modalItem = StyleSheet.create({
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
        backgroundColor: '#182335',
        width: 100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal:10
    },
    modalSubTitleView : {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:'5%'
    },
    modalSubTitleText :{
        textAlign:'center',
        fontWeight:'bold',
        color:'#182335',
        fontSize:22,
    },
    modalSubItemWrapper : {
        flexDirection: 'row',
        width: '100%',
        height:60,
        alignItems: 'center'
    },
    modalSubItemDescText : {
        width: 200,
    },
    modalSubUtemDescBtn : {
        borderRadius: 20,
        backgroundColor: '#ea5517',
        justifyContent: 'center'
    },
    modalSubUtemDescBtnText : {
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#fff',
        fontWeight: 'bold'
    },
    flatlistItemBtn : {
        width: 50,
        height: 40,
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
    }

});