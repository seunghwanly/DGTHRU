import React, { Component } from 'react';
import { Text, View ,Button, FlatList, ListItem } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


export default class Example extends Component {

  constructor(props){
    super(props);
    this.state={ 
    list:[],
    } }

    componentDidMount(){
        database().ref('hyehwa_roof/2020_08_22/+821012341234/').on('value', (snapshot) =>{
        var li = []
        snapshot.forEach((child)=>{
         li.push({
          key: child.key,
          name:child.val().name,
          cost: child.val().cost,
          count: child.val().count,
          cup : child.val().cup
        })
      })
     this.setState({list:li})
    })
   }


  // componentDidMount() {
  //   //const currentUser = auth().currentUser.uid;
  //   database().ref('hyehwa_roof/2020_08_21')
  //     .on('value', snapshot => {
  //       const lists = _.map(snapshot.val(), (uid) => {
  //         return {uid}
  //       });
  //       this.setState({lists, loading: false})
  //     })
  // } 
  //  renderItem({item}) {
  //   return (
  //       <ListItem item={item} />
  //     )
  // }
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world! </Text>
        <FlatList style={{width:'100%'}}
          data={this.state.list}
          keyExtractor={item => item.key}
          renderItem={({item})=>{
            return(
               <View>
                  <Text>{item.name}  {item.cup} {item.cost} </Text>
               </View>)
            }}
        />
      </View>
    );
  }
}