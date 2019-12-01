// SwipeCards.js
'use strict';
 
import React, { Component } from 'react';
import {StyleSheet,AsyncStorage, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("Show card ", this.props)
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Image style={{width: '100%', height: '100%'}} source={{uri : this.props.url}}   />            
      </View>
    )
  }
}
 
class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}
 
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }
  componentDidMount(){
    fetch('https://uu8v8b0rod.execute-api.us-east-1.amazonaws.com/dev/api/pics')
    .then(res => res.json())
    .then(result => {
      this.setState({
        cards: result
      })      
    })
    .catch(err => {
      console.log("Show err ", err);
    })
  }  
  handleYup (card) {
    console.log(`Yup for ${card.name}`)
    try {
        AsyncStorage.setItem(`${card.name}`, `${card.url}`)
    } catch (error) {        
        alert("error ", error)
    }
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }
  render() {
    return (
      <View style={{marginTop: 0}}>
        <SwipeCards        
          cards={this.state.cards}
          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          handleMaybe={this.handleMaybe}  
          hasMaybeAction
        />
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})
