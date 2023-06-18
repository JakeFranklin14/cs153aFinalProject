import React from 'react';
import {Pressable, Text, Alert, StyleSheet, View } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Gallery = () => {
    return (
    <View> 
        <Pressable style={styles.button} onPress={() => Alert.alert('Gallery Pressed!')}>
        <FontAwesome
            name="picture-o"
            size={18}
            color="white"
        />
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
      borderColor: 'white',
      borderWidth: 2,
      marginBottom: 0,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 14,
      color: 'white',
    },
  });