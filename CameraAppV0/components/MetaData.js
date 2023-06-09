import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const metaData = () => {
  return (
    <View
      style={{flex:2,flexDirection: 'column'}}>
      <View style={{ flex: 0.2, backgroundColor: 'black' }} />
      <View style={{ flex: 2, backgroundColor: 'black'}}>
        <View
          style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Camera Type:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Weather:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Scene Type:</Text>
          </View>
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>ISO:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Temperature:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>White Balance:</Text>
          </View>
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Exposure:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Date:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Resolution:</Text>
          </View>
        </View>
        <View
          style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Shutter Speed:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Location:</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: 'white' }}>Time:</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 10,
    color: 'white',
  },
});

export default metaData;