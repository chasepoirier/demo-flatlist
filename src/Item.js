import React from 'react';
import {Animated, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const ITEM_HEIGHT = 45;

const Item = ({active, item, onUpdate, index}) => {
  const toggle = React.useRef(new Animated.Value(active ? 1 : 0)).current;

  const colorToggle = React.useRef(new Animated.Value(active ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(toggle, {
      toValue: active ? 1 : 0,
      useNativeDriver: true,
      duration: 100,
    }).start();
    Animated.timing(colorToggle, {
      toValue: active ? 1 : 0,
      duration: 100,
      delay: 200,
    }).start();
  }, [active]);

  if (active) {
    console.log('ACTIVE', index);
  }
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onUpdate(index)}>
        <Animated.View
          style={{
            transform: [
              {
                scale: toggle.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                }),
              },
            ],
          }}>
          <Animated.Text
            style={[
              styles.text,
              {
                color: colorToggle.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#222', 'blue'],
                }),
              },
            ]}>
            {item.label.toString()}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {zIndex: 20},
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },

  centered: {
    height: ITEM_HEIGHT,
    backgroundColor: 'red',
    opacity: 0.3,
  },
  text: {
    textAlign: 'center',
    fontSize: 21,
    color: '#222',
  },
});

export default Item;
