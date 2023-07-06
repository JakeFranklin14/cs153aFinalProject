import React from 'react';
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import MetaData from './MetaData';
import CameraView from './CameraView';
import Settings from './Settings';
import Info from './Info';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

function HomeScreen({navigation}) {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
          backgroundColor: 'black',
        },
      ]}>
        <View style={{backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable style={styles.InfoButton} onPress={() => navigation.navigate('Info')} >
            <Ionicons
                name="information-circle"
                size={25}
                color="white"
            />
          </Pressable>
          <Pressable style={styles.SettingsButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons
                name="ios-settings"
                size={25}
                color="white"
            />
          </Pressable>
        </View>
        <View style={{ flex: 0.1, backgroundColor: 'black'}}/>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
      <MetaData />
      </View>
      <CameraView />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
          backgroundColor: 'black',
        },
      ]}>
  <Settings/>
  </View>
  );
};

function InfoScreen() {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
          backgroundColor: 'black',
        },
      ]}>
    <Info/>
  </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <SafeAreaView style={styles.safe}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{
            headerShown: true, 
            headerStyle: {backgroundColor: 'black'},
            headerTintColor: 'white'
            }}>
          <Stack.Screen name="Settings" component={SettingsScreen}/>
          <Stack.Screen name="Info" component={InfoScreen}/>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: 'black',
  },
  SettingsButton: {
    position: 'relative',
    right: 10,
    backgroundColor: 'black',
  },
  InfoButton: {
    position: 'relative',
    left: 10,
    backgroundColor: 'black',
  },
});

export default App;