import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Button, Text, SafeAreaView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useKey} from "./Keys"; 

const Settings = () => {
    const [getAIkey, setAIkey] = useState("");
    const [getWeatherKey, setWeatherKey] = useState("");
    const {currentKey, setCurrentKey} = useKey();
    
    useEffect(() => {getData()},[])

    const getData = async () => {
        try {
        // the '@profile_info' can be any string
        const jsonValue = await AsyncStorage.getItem("APIkey");
        let data = null;
        if (jsonValue != null) {
            data = JSON.parse(jsonValue);
            setAIkey(data.AIKey);
            setWeatherKey(data.WeatherKey);
            setCurrentKey({ AIContext: data.AIKey, WeatherContext: data.WeatherKey });
        } else {
            console.log("just read a null value from Storage");
            // this happens the first time the app is loaded
            // as there is nothing in storage...
            setCurrentKey({ AIContext: "", WeatherContext: "" })
            setAIkey("");
            setWeatherKey("");
        }
        } catch (e) {
        console.log("error in getData ");
        // this shouldn't happen, but its good practice
        // to check for errors!
        console.dir(e);
        // error reading value
        }
    };


    const storeData = async (AIKey, WeatherKey) => {
        try {
        const jsonValue = JSON.stringify(AIKey, WeatherKey);
        await AsyncStorage.setItem("APIkey", jsonValue);
        } catch (e) {
        console.log("error in storeData ");
        console.dir(e);
        // saving error
        }
    };
    
    const clearAll = async () => {
        try {
        await AsyncStorage.clear();
        } catch (e) {
        console.log("error in clearData ");
        console.dir(e);
        // clear error
        }
    };

    const [aiVisible, setAIVisible] = useState(false);
    const [weatherVisible, setWeatherVisible] = useState(false);
    
    const showDialogAI = () => {
        setAIVisible(true);
    };

    const showDialogWeather = () => {
        setWeatherVisible(true);
    };

    const handleCancel = () => {
        setAIVisible(false);
        setWeatherVisible(false);
    };

    const handleOK = () => {
        let key = {AIKey: getAIkey, WeatherKey: getWeatherKey};
        storeData(key);
        setAIVisible(false);
        setWeatherVisible(false);
    };

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.settingItem}>
                <Text style={styles.text}>AI key: {getAIkey}</Text>
                <Pressable onPress={showDialogAI}>
                <FontAwesome 
                    name="edit"
                    size={24}
                    color="white"
                />
                </Pressable>
                <Dialog.Container visible={aiVisible}>
                    <Dialog.Title>AI key</Dialog.Title>
                        <Dialog.Input 
                            onChangeText={(text) => setAIkey(text)}
                            placeholder="Enter API key"
                            >
                        </Dialog.Input>
                    <Dialog.Button label="Save" onPress={() => {
                        handleOK(); 
                        setCurrentKey({ AIContext: getAIkey, WeatherContext: getWeatherKey });
                        }} />
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                </Dialog.Container>
            </View>
            <View style={styles.settingItem}>
                <Text style={styles.text}>Weather key: {getWeatherKey}</Text>
                <Pressable onPress={showDialogWeather}>
                <FontAwesome 
                    name="edit"
                    size={24}
                    color="white"
                />
                </Pressable>
                <Dialog.Container visible={weatherVisible}>
                    <Dialog.Title>Weather key</Dialog.Title>
                        <Dialog.Input 
                            onChangeText={(text) => setWeatherKey(text)}
                            placeholder="Enter weather key"
                            >
                        </Dialog.Input>
                    <Dialog.Button label="Save" onPress={() => {
                        handleOK(); 
                        setCurrentKey({ AIContext: getAIkey, WeatherContext: getWeatherKey });
                        }} />
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                </Dialog.Container>
            </View>
        </View>


        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={styles.button}>
                <Button
                title="Clear All"
                color="red"
                onPress={() => {
                    clearAll();
                    setCurrentKey({ AIKey: "", WeatherKey: "" });
                }}
                />
            </View>
            <View style={styles.button}>
                <Button
                title="Log"
                color="white"
                onPress={() => {
                    console.log(currentKey);
                }}
                />
            </View>
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        padding: 20,
    },
    textinput: {
        flex: 0.5,
        height: 40,
        borderColor: "white",
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
    button: {
        margin: 5,
    },
    text: {
        flex: 2,
        color: "white",
        alignSelf: "center",
    },
    testpress: {
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
      settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'gray',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },

});

export default Settings;
