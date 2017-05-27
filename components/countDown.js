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

const animations = (state) => {
  const result = []
  for(let i = 0; i < state.quantity; i++) {
    //Start
    result.push(Animated.timing(
          state.countDown,
          {
            toValue: 0,
            duration: 0
          }
        )
    );
    //Animate
    for(let j = 0; j < state.quantity; j++) {
      result.push(Animated.timing(
            state.images[j],
            {
              toValue: i === j ? 1 : 0,
              duration: 0
            }
          )
      );
    }
    //Stop
    result.push(Animated.timing(
          state.countDown,
          {
            toValue: 1,
            duration: state.duration
          }
        )
    );
  }
  return result;
};
export default class StartingGameCountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
      countDown: new Animated.Value(0),
      currentTimeToBegin: props.currentTimeToBegin,
      quantity: 3,
      sizes: [],
      duration: 1000,
      images: [new Animated.Value(1), new Animated.Value(0), new Animated.Value(0)]
    };
  }
  componentDidMount() {
    Animated.sequence(animations(this.state)).start();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  createImagesAnimated(transitionY) {
    let result = [];
    //What to be Animated
    for(let i = 0; i < this.state.quantity; i++) {
      let image =this.state.images[i];
      // I could not make it dissapear but i can move it to the left with 0 opacity
      let actualImage = image.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10]
      });
      result.push(
          <Animated.Image
              key={util.uniqueId()}
              source={timeLapse[i]}
              style={{
                //How to animate it
                  position: 'absolute',
                  left: actualImage,
                  opacity: image,
                  transform: [{
                    translateY: transitionY
                  }]
              }}
          />
      );
    }
    return result;
  }
  render() {
    let transitionY = this.state.countDown.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    });
    return (
      <View>
        {this.createImagesAnimated(transitionY)}
      </View>
    );
  }
}
