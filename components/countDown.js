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
              <Image source={require('../images/1.png')} key={util.uniqueId()}/>,
              <Image source={require('../images/2.png')} key={util.uniqueId()}/>,
              <Image source={require('../images/3.png')} key={util.uniqueId()}/>
];

export default class StartingGameCountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
      countDown: new Animated.Value(0),
      currentTimeToBegin: props.currentTimeToBegin,
      imagePosition: new Animated.Value(0)
    };
  }
  componentDidMount() {
      Animated.loop(
        Animated.timing(
          this.state.countDown,
          {
            toValue: 1,
            duration: 1000
          }
        ).start(() => {
          let imagePos = this.state.imagePosition;
          imagePos.setValue(imagePos + 1);
        }), {
          iterations: 3
        }).start(() => {
          this.state.countDown.setValue(0);
        }
      );
  }
  render() {
    return (
      <Animated.View
        style={{
          opacity: this.state.countDown,
          transform: [{
            translateY: this.state.countDown.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100]
            })
          }]
        }}
      >
      {timeLapse[
        0
      ]}
      </Animated.View>
    );
  }
}
