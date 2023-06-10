import React from 'react';
import {Pressable, Text, Alert, StyleSheet, View } from 'react-native';

const Shutter = () => {
    return (
    <View> 
        <Pressable style={styles.button} onPress={() => Alert.alert('Shutter Pressed!')}>
            <Text style={styles.text}>Shutter</Text>
        </Pressable>
    </View>
    );
};

export default Shutter;

const styles = StyleSheet.create({
    button: {
      width: 75,
      height: 75,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginBottom: 0,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      color: 'white',
    },
  });