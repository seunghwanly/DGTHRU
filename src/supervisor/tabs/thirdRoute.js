import React, { Component, useEffect, } from 'react';
import { Platform, Dimensions, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
import { withTheme } from 'react-native-elements';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from '../styles';
import { _setPickUpTime , _setCompleteTime , _setConfirmTime , _stringConverter, DeleteOrderList , Setconfirm , SetUnconfirm , SetReady , SetRemove ,
    addToAdmin , } from '../tabs/tabFunctions'

const ThirdRoute = (props) => (
    <View style={{ flexDirection: 'column', marginTop:20, alignItems:'flex-end', marginRight:'4%'}}>
    <View style={{ backgroundColor:'#182335',  width:'20%', borderColor : '#182335', borderBottomColor:"white" , borderWidth : 2.5, }}>
    <Text style={{ alignSelf:'flex-end', paddingRight:'2%', fontSize: 24, fontWeight:'bold', color: 'white', }}>{props.route.title}</Text>
    </View>

</View>
);
export default ThirdRoute;