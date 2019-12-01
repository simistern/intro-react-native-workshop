import React from 'react';
import { SafeAreaView, Image, AsyncStorage, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { withNavigationFocus } from 'react-navigation';
import {NavigationEvents} from "react-navigation";
import { TouchableOpacity } from 'react-native-gesture-handler';

function Item({name, url, id}) {
  return (
    <View style={styles.item}>
      <Image source={{uri: url}} width={150} height={150}  style={{width: 150, height: 150}} />
      <Text style={styles.title}>{name}</Text>
      <Image source={{uri: url}} width={150} height={150} />
    </View>
  );
}

class FavouritesList extends React.Component {
    constructor(props){
        super(props);
        this.getCards = this.getCards.bind(this);
        this.state = {
            favorites: []
        }
    }
    async getCards(){
        let short = [];
        const value = await AsyncStorage.getAllKeys();
        const allvalues = await AsyncStorage.multiGet(value);
        allvalues.map((result, i, store) => {
          let key = store[i][0];
          let value = store[i][1];
          short.push({id: i, name: key, url: value})
        });
        this.setState({
            favorites: short
        })               
    }
    render(){
        return (
            <SafeAreaView style={styles.container}>
              <NavigationEvents onDidFocus={()=> this.getCards()} />
              <TouchableOpacity onPress={() => {
                AsyncStorage.clear()
                this.setState({favorites: []})
                }}><Text>Clear</Text></TouchableOpacity>
            {this.state.favorites.length < 1 ? 
              <Text>No Cards to Show!</Text> :
              <FlatList
                data={this.state.favorites || []}
                renderItem={({ item }) => <Item {...item}  />} 
                keyExtractor={item => `list-item-${item.id}`}
              />}
            </SafeAreaView>
        );
    }  
}

export default withNavigationFocus(FavouritesList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 100,
  },
  item: {
    backgroundColor: '#1fb3d1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
