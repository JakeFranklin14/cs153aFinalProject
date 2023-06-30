import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';

import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';

const Gallery = () => {

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        exif: true,
      });
      console.log(result);
    };
      return (
      <View> 
          <Pressable style={styles.gallery} onPress={pickImage}>
          <FontAwesome
              name="picture-o"
              size={18}
              color="white"
          />
              <Text style={styles.mediumText}>Gallery</Text>
          </Pressable>
      </View>
      );
  };

const styles = StyleSheet.create({
    gallery: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: 'transparent',
      },
      mediumText: {
        fontSize: 14,
        color: 'white',
      },
});

export default Gallery;