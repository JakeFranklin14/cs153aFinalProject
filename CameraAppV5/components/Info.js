import React from "react";
import { View, Text } from "react-native";

const Info = () => {
    return (
        <View style={{alignSelf: 'center'}}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>
                Created By: Jake Franklin
            </Text>
            <Text></Text>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, margin: 10}}>
                This camera app was designed by Jake Franklin as a semester long 
                project for the course COSI 153A Mobile Application Development at 
                Brandeis University. Using React Native and Expo, Jake designed this
                to be a simple camera app with a few extra features. 
            </Text>
        </View>
    );
};

export default Info;
