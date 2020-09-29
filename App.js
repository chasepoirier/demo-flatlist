import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Picker from './src/Picker';

const App = () => {
  const [item, setItem] = React.useState('');
  const currentValue = (value) => {
    setItem(value);
  };
  return (
    <SafeAreaView>
      <Text style={{marginLeft: 24}}>{item.value}</Text>
      <Picker onChange={currentValue} />
    </SafeAreaView>
  );
};
export default App;
