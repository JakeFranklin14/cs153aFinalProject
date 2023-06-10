import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

export default class SimpleExample extends Component {
  render() {
    return (
      <ScrollPicker
        dataSource={['Photo', 'AI Photo']}
        selectedIndex={0}
        renderItem={(data) => {
          return (
            <View>
            <Text>{data}</Text>
          </View>
        );
        }}
        onValueChange={(data) => {
            Alert.alert(data);
          }}
        wrapperHeight={75}
        wrapperWidth={100}
        wrapperColor='lightgray'
        itemHeight={30}
        highlightColor='black'
        highlightBorderWidth={2}
      />
    );
  }
}