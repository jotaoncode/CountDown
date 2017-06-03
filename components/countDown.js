import React from 'react';
import {
  Animated,
  Text,
  View,
  Dimensions,
  Image,
  Easing,
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
    top: -100,
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
  let result = []
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
    let parallel = [];
    //Animate
    //First animation
    parallel.push(
      Animated.timing(
          state.images[0],
          {
            easing: Easing.bezier(.07,.42,.85,.5),
            toValue: i === 0 ? 1 : 0,
            duration: i === 0 ? state.duration : 0
          }
        )
    );

    for(let j = 1; j < state.quantity; j++) {
      parallel.push(
        Animated.timing(
            state.images[j],
            {
              easing: Easing.bezier(.07,.42,.85,.5),
              toValue: i === j ? 1 : 0,
              duration: i === j ? state.duration : 0
            }
          )
      );
    }
    //Stop
    parallel.push(Animated.timing(
          state.countDown,
          {
            easing: Easing.bezier(.07,.42,.85,.5),
            toValue: 1,
            duration: state.duration
          }
        )
    );

    result = [...result, Animated.parallel(parallel)];
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
      duration: 3000,
      images: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]
    };
  }
  componentDidMount() {
    Animated.sequence(animations(this.state)).start();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  createImagesAnimated(transitionY, opacity) {
    let result = [];
    //What to be Animated
    for(let i = 0; i < this.state.quantity; i++) {
      let image = this.state.images[i].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      });
      result.push(
          <Animated.Image
              key={util.uniqueId()}
              source={timeLapse[i]}
              style={{
                //How to animate it
                  position: 'absolute',
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
      outputRange: [0, 200]
    });
    let opacity = this.state.countDown.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    return (
      <View style={styles.container}>
        {this.createImagesAnimated(transitionY, opacity)}
      </View>
    );
  }
}
