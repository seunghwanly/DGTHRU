import React from 'react';
import { Image, ImageBackground, View, Text } from 'react-native';

export default ImageLinker = (item) => {

    switch (item.name) {

        case "에스프레소":
            if (item.hasOwnProperty('innerText'))
                return (<ImageBackground imageStyle={{ borderRadius: 90 }} style={item.style} resizeMode='cover' source={require('../../image/menu-image/espresso.jpg')}><Text style={item.innerStyle}>{item.innerText}</Text></ImageBackground>)
            else
                return (<Image style={item.style} resizeMode='cover' source={require('../../image/menu-image/espresso.jpg')} />)
        case "아메리카노":
            return (<Image style={item.style} resizeMode='cover' source={require('../../image/menu-image/americano.jpg')} />)
        case "카페라떼":
            if (item.hasOwnProperty('innerText'))
                return (<ImageBackground imageStyle={{ borderRadius: 90 }} style={item.style} resizeMode='cover' source={require('../../image/menu-image/caffe-latte.jpg')}><Text style={item.innerStyle}>{item.innerText}</Text></ImageBackground>)
            else
                return (<Image style={item.style} resizeMode='cover' source={require('../../image/menu-image/caffe-latte.jpg')} />)
        case "카푸치노":
            return (<Image style={item.style} resizeMode='cover' source={require('../../image/menu-image/cappuccino.jpg')} />)
        case "바닐라라떼":
            return (<Image style={item.style} resizeMode='cover' source={require('../../image/menu-image/vanilla-latte.jpg')} />)
        case "헤즐넛라떼":
            return (<Image style={item.style} resizeMode='cover' source={require('../../image/menu-image/hazelnut-latte.jpg')} />)
        case "카라멜마키아또":
            return (<Image style={item.style} resizeMode='cover' source={require('../../image/menu-image/caramel-macchiato.jpg')} />)
        case "카페모카":
            return (<Image style={item.style} resizeMode='cover' source={require('../../image/menu-image/cafe-mocha.jpg')} />)

        case "main_outdoor":
            return (<Image style={[item.style, { backgroundColor: null }]} resizeMode='cover' source={require('../../image/cafe-icon/가온누리.png')} />)
        case "singong_1f":
            return (<Image style={[item.style, { backgroundColor: null }]} resizeMode='cover' source={require('../../image/cafe-icon/남산학사.png')} />)
        case "hyehwa_roof":
            return (<Image style={[item.style, { backgroundColor: null }]} resizeMode='cover' source={require('../../image/cafe-icon/혜화.png')} />)
        case "economy_outdoor":
            return (<Image style={[item.style, { backgroundColor: null }]} resizeMode='cover' source={require('../../image/cafe-icon/그루터기.png')} />)
        case "munhwa_1f":
            return (<Image style={[item.style, { backgroundColor: null }]} resizeMode='cover' source={require('../../image/cafe-icon/두리터.png')} />)
        case "favorite_shop":
            return (<Image style={[item.style, { backgroundColor: null }]} resizeMode='cover' source={require('../../image/cafe-icon/favorite.png')} />)

        case "logout":
              return (<Image style={[item.style, { backgroundColor: null }]} source={require('../../image/exit.png')} />)

        default:
            return (<View style={item.style}><Text style={{ color: 'white', fontSize: 12 }}>준비중</Text></View>)
    }
}