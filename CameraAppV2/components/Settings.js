import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text, SafeAreaView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Settings = () => {
    const [AIkey, setAIkey] = useState("");
    const [weatherKey, setWeatherKey] = useState("");
    
    useEffect(() => {getData()},[])

    const getData = async () => {
        try {
        // the '@profile_info' can be any string
        const jsonValue = await AsyncStorage.getItem("APIkey");
        let data = null;
        if (jsonValue != null) {
            data = JSON.parse(jsonValue);
            setAIkey(data.AIkey);
            setWeatherKey(data.weatherKey);
            console.log("just set APIkey");
        } else {
            console.log("just read a null value from Storage");
            // this happens the first time the app is loaded
            // as there is nothing in storage...
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


    const storeData = async (AIkey, weatherKey) => {
        try {
        const jsonValue = JSON.stringify(AIkey, weatherKey);
        await AsyncStorage.setItem("APIkey", jsonValue);
        console.log("just stored " + jsonValue);
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
        storeData({ APIkey: weatherKey });
        storeData({ APIkey: AIkey });
        setAIVisible(false);
        setWeatherVisible(false);
    };

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.settingItem}>
                <Text style={styles.text}>AI key: {AIkey}</Text>
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

                    <Dialog.Button label="OK" onPress={handleOK} />
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                </Dialog.Container>
            </View>
            <View style={styles.settingItem}>
                <Text style={styles.text}>Weather key: {weatherKey}</Text>
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

                    <Dialog.Button label="OK" onPress={handleOK} />
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                </Dialog.Container>
            </View>
        </View>


        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={styles.button}>
                <Button
                title="Save"
                color="blue"
                onPress={() => {
                    let key = {AIkey: AIkey, weatherKey: weatherKey};
                    console.log("the API key is ", key);
                    storeData(key);
                    }}
                />
            </View>
            <View style={styles.button}>
                <Button
                title="Clear Data"
                color="red"
                onPress={() => {
                    clearAll();
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
