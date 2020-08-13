import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { enableScreens } from 'react-native-screens';

import HyehwaDessert from './data/HyehwaDessert.json';


enableScreens();

function Hyehwa({ navigation }) {

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Text >
        HyehwaDessert List
           </Text>
      <FlatList
        data={HyehwaDessert}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <View >
            <Text>{item.name}</Text>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}


export default Hyehwa;