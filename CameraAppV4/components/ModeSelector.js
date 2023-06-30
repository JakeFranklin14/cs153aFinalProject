import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';

import ScrollPicker from 'react-native-wheel-scrollview-picker';
import * as Haptics from 'expo-haptics';


const Selector = () => {
    return (
      <ScrollPicker
        dataSource={['Manual', 'Auto', 'AI']}
        selectedIndex={1}
        renderItem={(data) => {
          return (
            <View>
            <Text style={styles.mediumText}>{data}</Text>
          </View>
        );
        }}
        onValueChange={(data) => {
         Haptics.selectionAsync();
         // Mode(data);
          }}
        wrapperHeight={100}
        wrapperWidth={30}
        wrapperColor='transparent'
        itemHeight={20}
        highlightColor='white'
        highlightBorderWidth={2}
      />
    );
  };
  
export function Mode (cameraMode) {
    if (cameraMode == 'Auto') {
      return (
      Alert.alert('Auto Photo Mode Selected')
      );
    } else if (cameraMode == 'Manual') {
      return (
        Alert.alert('Manual Photo Mode Selected')
      );
    } else if (cameraMode == 'AI') {
      return (
        Alert.alert('AI Photo Mode Selected')
      );
    }
}

export default Selector;

const styles = StyleSheet.create({
    mediumText: {
        fontSize: 14,
        color: 'white',
        },
});