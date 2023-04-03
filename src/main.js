import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Press } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import ChatsScreen from './chatsscreen';
import ContactScreen from './contactscreen';
import ProfileScreen from './profilescreen';
const Tab = createBottomTabNavigator();
function main({ navigation }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user has a token stored in async storage to stay logged in
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null) {
          setToken(value);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
  
      const response = await fetch('http://localhost:3333/api/1.0.0/logout', {
        method: 'POST',
        headers: {
          'X-Authorization': token,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Logout was successful, remove token from async storage
        await AsyncStorage.removeItem('@token');
        await AsyncStorage.removeItem('@id');
        setToken(null);
        navigation.navigate('Home');
      } else {
        // Logout failed, log error message
        console.log('Logout failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!token) {
    // Render Login component if user has not logged in yet
    return <Login setToken={setToken} />;
  }

  // Render Chats component if user has logged in
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown:false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="account-circle" color="green" size={size} />
          ),
        }}
        initialParams={{ handleLogout: handleLogout }}
      />
      <Tab.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{ headerShown:false,
          tabBarLabel: 'Chats',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="chat" color="green" size={size} />
          ),
        }}
      />
      <Tab.Screen name="ContactsScreen" component={ContactScreen}
        options={{ headerShown:false,
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="contacts" color="green" size={size}/>
          ),
        }}
      />
    </Tab.Navigator>

  );
}
export default main;