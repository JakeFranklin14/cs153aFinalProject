import React from 'react';
import {Pressable, Text, Alert, StyleSheet, View } from 'react-native';

const Gallery = () => {
    return (
    <View> 
        <Pressable style={styles.button} onPress={() => Alert.alert('Gallery Pressed!')}>
            <Text style={styles.text}>Gallery</Text>
        </Pressable>
    </View>
    );
};

export default Gallery;

const styles = StyleSheet.create({
    button: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 2,
      marginBottom: 0,
      backgroundColor: 'lightgray',
    },
    text: {
      fontSize: 14,
      color: 'black',
    },
  });