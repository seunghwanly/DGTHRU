import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';

//json
import * as data from './data/DormDessert.json';

enableScreens();

const drinkData = data.categories_drink;

const CategroyInfo = ({ category, menu }) => {

  const MenuDetail = () => {
    const mapToList = (data) => {
      return data.map((menu, i) => {
        return (
          <MenuInfo
            menu={menu}
            key={i}
          />
        );
      });
    };
    return (
      <View style={{flexDirection:'row', margin:10}}>
        { mapToList(category.menu)}
      </View>
    )
  }

  const MenuInfo = ({ menu }) => {
    return (
      <View>
        <Text>{menu.name}</Text>
        <Text>{menu.cost}</Text>
      </View>
    )
  }

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{category.category_name}</Text>
      <ScrollView
        horizontal='true'
        >
        <MenuDetail />
      </ScrollView>
    </View>
  );
}

const CategoryMenu = () => {
  const mapToComponent = (data) => {
    return data.map((category, i) => {
      return (
        <CategroyInfo
          category={category}
          key={i}
        />);
    });
  };
  return (
    <View>
      { mapToComponent(drinkData)}
    </View>
  );
}

  function Dorm({ navigation }) {

  return (
    <View style={{ flex: 1, flexDirection: 'column', padding:10 }}>
      <ScrollView>
        <CategoryMenu />
      </ScrollView>
    </View>
  );
}

export default Dorm;