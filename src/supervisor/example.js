import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Image, TextInput, Alert, FlatList, ListItem, Button, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


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

    //deleteItem(k) {
    //    let forward = this.state.list.slice(0,k)
    //    //console.log(`for : `,forward);
      
        

    //    for(var i = k + 1;k<this.state.list.length;i++){
    //        this.state.list[i].index = this.state.list[i].index - 1;
    //    }

    //    let back = this.state.list.slice(k+1,this.state.list.length)
    //    //console.log(`back : `,back);
      
    //    let total = forward.concat(back)	//forward¿¡ back ºÙÀÌ±ë
    //    //console.log(`total : `,total);
    //    this.setState({
    //        list:total
    //    })
    //}

    deleteorderlist(k){
        var arr = this.state.list;
        this.setState({
            list: arr.filter(arr => arr.key !== k)
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
                 <TouchableOpacity
                        style={{ 
                            margin: 15, 
                            backgroundColor:'dodgerblue', 
                            width:350, 
                            padding:10,
                            borderRadius:10,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        onPress={() => this.deleteorderlist(item.key)}
                        >
                        <Text style={{fontWeight:'bold', fontSize:15, color:'white'}}>{item.name}  {item.cup} {item.cost}</Text>
                  </TouchableOpacity>
               </View>)
            }}
        />
      </View>
    );
  }
}