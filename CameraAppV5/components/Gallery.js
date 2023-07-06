import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// import { Configuration, OpenAIApi } from "openai";
// import axios from 'axios';
// import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const Gallery = () => {

  // const [result, setResult] = useState("");
  // const [loading, setLoading] = useState(false);
  // const DALLEkey = '';

  // const configuration = new Configuration({
  //   organization: '',
  //   apiKey: '',
  // });

  // const openai = new OpenAIApi(configuration);

  
  // const generateImage = async (uri) => {
  //   console.log("​generateImage -> uri", uri);
  //   const manipResult = await manipulateAsync(
  //     uri,
  //     [ ],
  //     { compress: 1, format: SaveFormat.PNG }
  //   );
  //   console.log("​generateImage -> manipResult", manipResult.uri);
  //   let data = new FormData();
  //   data.append('image', createImageBitmap);
  //   data.append('n', 1);
  //   data.append('size', '512x512');
  //   console.log("​generateImage -> data", data);
  //   const url = 'https://api.openai.com/v1/images/variations';
  //   const config = {headers: {
  //     Accept: 'application/json, text/plain, */*',
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: 'Bearer ' + DALLEkey,
  //     },}
  //   const body = data
  //   const response =
  //       await axios.post(url,body,config)

  //   console.log("​generateImage -> response", response);

  //   };


    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
        exif: true,
      });``
      // setResult(result.assets[0].uri);
      // console.log(result.assets[0].uri);
      // generateImage(result.assets[0].uri);
    };
      return (
      <View> 
          <Pressable style={styles.iconButton} onPress={pickImage}>
          <FontAwesome
              name="picture-o"
              size={40}
              color="white"
          />
          </Pressable>
      </View>
      );
  };

const styles = StyleSheet.create({
  iconButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
      mediumText: {
        fontSize: 14,
        color: 'white',
      },
});

export default Gallery;