import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './HomeScreen';
import Settings from './Settings';
import { Ionicons } from "@expo/vector-icons";
import Keys from './Keys';


function HomeScreen() {
  return (
    <MainScreen/>
  );
}

function SettingsScreen() {
  return (
    <Settings/>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const keyData = { AIContext: '', WeatherContext:  ''};

  return (
    <Keys value={keyData} >
        <NavigationContainer>
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarBackground: () => (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 80,
                    backgroundColor: 'black',
                  }}
                />
              ),
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Camera') {
                  iconName = focused ? 'camera' : 'camera-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Camera" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Keys>
  );
}