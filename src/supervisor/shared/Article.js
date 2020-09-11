import * as React from 'react';
import { ScrollView, Image, Dimensions, StyleSheet } from 'react-native';



export default class Article extends React.Component{
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
       <Text>hello222</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343C46',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cover: {
    width: '50%',
    height: Dimensions.get('window').width / 2,
  },
});