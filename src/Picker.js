import React, {useRef} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import DATA from './data';
import Item from './Item';

const ITEM_HEIGHT = 45;

const AndroidPicker = ({onChange, initialIndex}) => {
  const flatlistRef = React.useRef();

  const [activeIndex, setActiveIndex] = React.useState(2);

  const [selectedIndex, setSelectedIndex] = React.useState(2);

  const onMomentEnd = (e) => {
    const currentY = e.nativeEvent.contentOffset.y;
    const index = Math.round(currentY / ITEM_HEIGHT);

    flatlistRef.current.scrollToIndex({
      index: index < 0 ? 0 : index,
    });

    setTimeout(() => {
      setActiveIndex(index + 2);
    }, 10);
  };

  const updateCurrentIndex = (idx) => {
    let newIndex = idx;
    if (idx < activeIndex) {
      newIndex = activeIndex - 1;
    } else if (idx > activeIndex) {
      newIndex = activeIndex + 1;
    }

    flatlistRef.current?.scrollToIndex({
      index: newIndex - 2 < 0 ? 0 : newIndex - 2,
    });
    // console.log('update idx', idx);
    setActiveIndex(newIndex);
    // setSelectedIndex(newIndex);
    if (activeIndex === newIndex) {
      onChange(DATA[newIndex]);
    }
  };

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.list}
        ref={flatlistRef}
        onMomentumScrollEnd={onMomentEnd}
        // scrollEventThrottle={16}
        // removeClippedSubviews
        keyExtractor={(item, index) => item.label}
        data={DATA}
        renderItem={({item, index}) => {
          const isActive = index === selectedIndex;
          return (
            <Item
              active={isActive}
              item={item}
              index={index}
              onUpdate={updateCurrentIndex}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.overlay}>
        <View style={styles.centered} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 125,
    right: 0,
    width: 160,
    height: ITEM_HEIGHT * 5,
    justifyContent: 'center',
    borderColor: '#222',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 2,
  },
  list: {zIndex: 1},
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  overlay: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
  },
  centered: {
    height: ITEM_HEIGHT,
    backgroundColor: '#FFF',
    opacity: 1,
    borderTopColor: '#222',
    borderBottomColor: '#222',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 21,
    color: '#222',
  },
});
export default AndroidPicker;
