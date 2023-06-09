import React from 'react';
import {Pressable, Text, View, StyleSheet } from 'react-native';
import MetaData from './MetaData';

const App = () => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <MetaData />
      <View style={styles.tmpCamera}>
        <Text style={{fontSize:50}}>
          Insert Camera View Here
        </Text>
      </View>
      <View style={{flex:0.5}}/>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}/>
        <Pressable style={styles.button}>
        <Text style={styles.text}>Shutter</Text>
        </Pressable>
        <View style={{flex:1}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 25,
    backgroundColor: 'black',
  },
  tmpCamera: {
    flex: 10, 
    backgroundColor: 'white', 
    borderWidth: 10, 
    borderColor: 'blue', 
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default App;
