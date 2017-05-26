import React, { Component } from 'react';
import CountDownComponent from './components/countDown2.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class CountDown extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CountDownComponent time={2222} currentTimeToBegin={2225}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('CountDown', () => CountDown);
