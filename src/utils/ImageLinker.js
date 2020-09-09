import React from 'react';
import { Image, View, Text } from 'react-native';


export default ImageLinker = (item) => {
    console.log("ImageLinker ... "+ JSON.stringify(item));
    
    switch(item.name) {
        case "바닐라라떼":
            return (<Image style={item.style} resizeMode='cover' source={require('../../image/menu-image/vanilla-latte.jpg')} />)
        default:
            return (<View style={item.style}><Text style={{color:'white', fontSize:12}}>준비중</Text></View>)
    }
}