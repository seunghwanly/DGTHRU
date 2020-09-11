import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { exampleStyle } from './styles';
import Tabs from 'react-native-tabs';
import { color } from 'react-native-reanimated';
import { OrderlistStyle } from './styles';
import moment from 'moment';
import database from '@react-native-firebase/database';
var currentTime = moment().format('YYYY_MM_DD');
var shopname = '';

export default class SupervisorTabview extends Component {
  constructor(props){
    super(props);
    shopname = "hyehwa_roof";
    this.state = {
     page:"주문",
     list:[],
  };

    database().ref('shops/' + shopname).on('value', (snapshot) =>{
      var li = []
      snapshot.forEach((childSnapShot) => {
      var orderDate = childSnapShot.key
      childSnapShot.forEach((child)=>{
          var phonenumber = child.key
          child.forEach((menuChild)=>{
              console.log('orderTime2 : ' , menuChild.val().orderTime)
              li.push({
                  key: menuChild.key,
                  phonenum: phonenumber,
                  date: orderDate,
                  name: menuChild.val().name,
                  orderTime: menuChild.val().orderTime,
                  cost: menuChild.val().cost,
                  count: menuChild.val().count,
                  cup : menuChild.val().cup,
                  shotnum : menuChild.val().shotnum,
              })
          })
      })
      
      })
      const Moment = require('moment')
      console.log('what? : ' , li);
      li.sort((d2, d1) => new Moment(d2.orderTime,'HH:mm:ss') - new Moment(d1.orderTime,'HH:mm:ss'));
      console.log('after? : ' , li);
      this.setState({list:li})
    // this.sortListByTime(li)
  })
  
  } 
  _onPress = () => {
    console.log('clickTest !!!');
  };

  onPressItem = (id) => {

    switch (id) {
        case 'main_outdoor':
            alert('준비중입니다!');
            break;
        case 'singong_1f':
            alert('준비중입니다!');
            break;
        case 'hyehwa_roof':
            alert('혜화관디저트카페');
            break;
        case 'economy_outdoor':
            alert('준비중입니다!');
            break;
        case 'munhwa_1f':
           
            break;
        case 'favorate_shop':
            alert('준비중입니다!');
            break;
    }
}
  
 
  render() {
    return (
      <View style={styles.container}>
        <Tabs selected={this.state.page} style={{backgroundColor:'#050852',}}
              selectedStyle={{color:'white'}} onSelect={el=>this.setState({page:el.props.name})}>
            <Text fontColor="white" name="주문" selectedStyle={{color:'white',}} styles={{fontColor:'white'}}
            selectedIconStyle={{backgroundColor:'#e98122', borderTopColor:'white',borderTopWidth:2,}}
            >주문</Text>
            <Text name="지난주문" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>지난주문</Text>
            <Text name="메뉴" selectedStyle={{color:'white',}} styles={{fontColor:'white'}}
            selectedIconStyle={{backgroundColor:'#e98122', borderTopColor:'white',borderTopWidth:2,}}
            >메뉴</Text>
        </Tabs>

        <View style={OrderlistStyle.OrderlistBackground} >
                <View style={OrderlistStyle.OrderlistBody_2} >
                    <View style={OrderlistStyle.OrderlistBody_2_top} > 
                    <Text style={{ fontSize:25,color: 'white', fontWeight: 'bold', textAlign: 'center' }}>주 문 현 황</Text>
                     </View>

                      <View style={OrderlistStyle.OrderlistBody_2_bottom} >
                     <Text>BODY_2_down</Text>
                        <FlatList
                            data={this.state.list}
                        
                            numColumns={2}
                            keyExtractor={item => item.key}
                            scrollEnabled={true}
                            renderItem={({item})=>{
                              return(
                                  <View  style={exampleStyle.listbox}>    
                                      <Text style={exampleStyle.orderlisttext}>{item.name} {item.orderTime}</Text>
                                      <Text style={exampleStyle.orderlisttext}> {item.orderTime}</Text>
                                      {/* <View style={exampleStyle.orderlistview}>
                                          <Button 
                                          style={exampleStyle.buttonstyle}
                                          title="승인취소" onPress={() => SetUnconfirm(shopname, item.date , item.phonenum, item.key)}></Button> 
                                          <Button  style={{margin:5}}
                                          title="주문승인" onPress={() => Setconfirm(shopname, item.date , item.phonenum, item.key)}></Button> 
                                          <Button  style={{margin:5}}
                                          title="준비완료" onPress={() => SetReady(shopname, item.date , item.phonenum, item.key)}></Button> 
                                      </View> */}
                                  </View>)
                              }}
                        />
                     </View>
                   
                </View>
            </View>

          <Text style={styles.welcome}>
              Welcome to React Native
          </Text> 
          <Text style={styles.instructions}>
              Selected page: {this.state.page}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#222222',
    marginBottom: 5,
  },
});

//AppRegistry.registerComponent('Example', () => Example);