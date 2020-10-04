import { StyleSheet } from 'react-native';

export const menuManage = StyleSheet.create({
    mainBackground: {
        backgroundColor: '#fff',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        marginTop: 15,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    keyboardAvoidingView: {
        width: '100%',
        alignItems:'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    resetSearch: {
        borderRadius: 20,
        width: 120,
        height: 30,
        backgroundColor: '#eaaf9d',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginEnd: 20,
        alignSelf:'flex-end'
    },
    searchBarIcon: {
        width: 30,
        height: 30,
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 5,
        marginHorizontal: 5,
        alignItems:'center',
        justifyContent:'center'
    },
    searchBarTextInput: {
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
        width: 200
    },
    mainWrapper: {
        flexDirection: 'row',
    },
    categoryWrapper: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 204,
        paddingTop: 20,
        padding: 5,
        margin: 5,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.365,
        shadowRadius: 1,
        elevation: 5
    },
    categoryWrapperTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingStart: 10
    },
    categoryFlatList: {
        marginTop: 20,
    },
    categoryFlatlistItems: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        shadowColor: "#333",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius: 1
    },
    categoryFlatlistItemsTitle: {
        fontSize: 13,
        textAlign: 'center'
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
        backgroundColor: "#fff",
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
        width: 120,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginBottom:10
    },
    modalSubTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%'
    },
    modalSubTitleText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#182335',
        fontSize: 22,
    },
    modalSubItemWrapper: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        alignItems: 'center'
    },
    modalSubItemDescText: {
        width: 200,
    },
    modalSubUtemDescBtn: {
        borderRadius: 20,
        backgroundColor: '#ea5517',
        justifyContent: 'center'
    },
    modalSubUtemDescBtnText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#fff',
        fontWeight: 'bold'
    },
    flatlistItemBtn: {
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
        shadowRadius: 1
    },
    addMenu : {
        flexDirection:'row',
        marginVertical:8,
        paddingVertical:2,
        width:400,
        alignItems:'center'
     },
     addMenuLeftText : {
        fontSize:14,
        fontWeight:'bold',
        color : '#333',
        width:100
    },
    addMenuRightText : {
        width:300
    },
    addSubMenuTextInput :{
        width:180,
        paddingVertical:10,
        paddingHorizontal:15,
        marginBottom:5,
        alignSelf:'flex-start',
        borderRadius:20,
        borderColor:'#eee',
        borderWidth:1
    },
    addSubMenuBtn : {
        backgroundColor:'lightgray',
        width:25,
        height:25,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:2                                                                
    },
    addMenuTypeView : {
        flexDirection:'column',
        width:110,
        marginHorizontal:10,
        marginVertical:'2%',
        justifyContent:'center',
        alignItems:'center'
    },
    addMenuTypeText :{
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:10
    },
    addMenuTypeTextInput : {
        width:100,
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:20,
        borderColor:'#eee',
        borderWidth:1,
    }

});

export const myMenuStyle = StyleSheet.create({
    header: {
        justifyContent:'center',
        width:'100%',
        height:'10%',
        backgroundColor:'gray',
    }
    ,
    body: {
        justifyContent:'flex-end',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'70%',
        backgroundColor:'white',
    }
    ,
    footer: {
        width:'100%',
        height:'20%',
        backgroundColor:'gray',
    }
})