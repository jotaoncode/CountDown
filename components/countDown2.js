import React from 'react';
import {
  Animated,
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let counter = 0;
const util = {
  uniqueId: () => {
    return counter++;
  }
};

const styles = StyleSheet.create({
  mainOption: {
  },
  container: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
});
const timeLapse = [
  require('../images/1.png'),
  require('../images/2.png'),
  require('../images/3.png')
];

export default class StartingGameCountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
      countDown: new Animated.Value(0),
      currentTimeToBegin: props.currentTimeToBegin,
      imageOne: new Animated.Value(1),
      imageTwo: new Animated.Value(0),
      imageThree: new Animated.Value(0)
    };
  }
  componentDidMount() {
    Animated.sequence([
      Animated.timing(
        this.state.countDown,
        {
          toValue: 1,
          duration: 1000
        }
      ),
      Animated.timing(
        this.state.imageOne,
        {
          toValue: 0,
          duration: 0
        }
      ),
      Animated.timing(
        this.state.imageTwo,
        {
          toValue: 1,
          duration: 0
        }
      ),
      Animated.timing(
        this.state.imageThree,
        {
          toValue: 0,
          duration: 0
        }
      ),
      Animated.timing(
        this.state.countDown,
        {
          toValue: 0,
          duration: 0
        }
      ),
      Animated.timing(
        this.state.countDown,
        {
          toValue: 1,
          duration: 1000
        }
      ),
      Animated.timing(
        this.state.imageOne,
        {
          toValue: 0,
          duration: 0
        }
      ),
      Animated.timing(
        this.state.imageTwo,
        {
          toValue: 0,
          duration: 0
        }
      ),
      Animated.timing(
        this.state.imageThree,
        {
          toValue: 1,
          duration: 0
        }
      ),
      Animated.timing(
        this.state.countDown,
        {
          toValue: 0,
          duration: 0
        }
      ),
      Animated.timing(
        this.state.countDown,
        {
          toValue: 1,
          duration: 1000
        }
      )
    ]).start();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    let transitionY = this.state.countDown.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    });
    return (
      <View>
        <Animated.Image
          source={timeLapse[0]}
          style={{
            opacity: this.state.imageOne,
            transform: [{
              translateY: transitionY
            }]
          }}
        />
        <Animated.Image
          source={timeLapse[1]}
          style={{
            opacity: this.state.imageTwo,
            transform: [{
              translateY: transitionY
            }]
          }}
        />
        <Animated.Image
          source={timeLapse[2]}
          style={{
            opacity: this.state.imageThree,
            transform: [{
              translateY: transitionY
            }]
          }}
        />
      </View>
    );
  }
}
