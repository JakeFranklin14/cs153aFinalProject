import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { Mode } from './HomeScreen';



const Selector = () => {
  const [selectedValue, setSelectedValue] = useState("Auto Photo"); 
  return (
    <ScrollPicker
      dataSource={['Manual Photo', 'Auto Photo', 'AI Photo']}
      selectedIndex={0}
      renderItem={(data) => {
        return (
          <View>
          <Text style={{fontSize: 12}}>{data}</Text>
        </View>
      );
      }}
      onValueChange={(data) => {
          setSelectedValue(data)
          Mode(data)
        }}
      wrapperHeight={75}
      wrapperWidth={100}
      wrapperColor='lightgray'
      itemHeight={30}
      highlightColor='black'
      highlightBorderWidth={2}
    />
  );
};

export const selectedValue = Selector.selectedValue;
export default Selector;