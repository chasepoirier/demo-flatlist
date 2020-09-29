import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import DATA from './data';
import Item from './Item';

const ITEM_HEIGHT = 45;

const Picker = ({onChange}) => {
  const flatlistRef = React.useRef();

  const [y, setY] = React.useState(0);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const onMomentEnd = (e) => {
    // setY(e.nativeEvent.contentOffset.y);
    // setLifecycle({
    //   completed: true,
    //   hasMoment: false,
    //   state: 'MOMENT_END',
    // });
  };

  const onDragEnd = (e) => {
    setY(e.nativeEvent.contentOffset.y);
  };

  React.useEffect(() => {
    const index = Math.floor(y / ITEM_HEIGHT);

    flatlistRef.current.scrollToIndex({
      index: index < 0 ? 0 : index,
    });

    setActiveIndex(index + 2);
  }, [y]);

  const updateCurrentIndex = (idx) => {
    let newIndex = idx;

    if (idx < activeIndex) {
      newIndex = activeIndex - 1;
    } else if (idx > activeIndex) {
      newIndex = activeIndex + 1;
    }

    flatlistRef.current.scrollToIndex({
      // animated: false,
      index: newIndex - 2 < 0 ? 0 : newIndex - 2,
      // viewOffset: -56
    });
    // console.log('update idx', idx);
    setActiveIndex(newIndex);
    onChange(DATA[newIndex]);
  };

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.list}
        ref={flatlistRef}
        onMomentumScrollEnd={(e) => {
          console.log('MOMENT_END');
          onMomentEnd(e);
        }}
        onMomentumScrollBegin={() => {
          console.log('MOMENT_START');
        }}
        scrollEventThrottle={16}
        onScroll={(e) => {
          // console.log('ON SCROLL');
          // const index = Math.floor(y / ITEM_HEIGHT);
          // setActiveIndex(index);
        }}
        onScrollBeginDrag={() => {
          console.log('START DRAG');
        }}
        onScrollEndDrag={onDragEnd}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.value}
        data={DATA}
        renderItem={({item, index}) => {
          const isActive = index === activeIndex;
          return (
            <Item
              active={isActive}
              item={item}
              index={index}
              onUpdate={updateCurrentIndex}
            />
          );
        }}
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
    top: 100,
    right: 25,
    width: 200,
    height: ITEM_HEIGHT * 5,
    justifyContent: 'center',
    borderColor: '#222',
    borderWidth: 1,
  },
  list: {zIndex: 20},
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
    backgroundColor: 'red',
    opacity: 0.3,
  },
  text: {
    textAlign: 'center',
    fontSize: 21,
    color: '#222',
  },
});

export default Picker;
