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

export async function getUserDetails(token, user_id) {
  try {
    const response = await fetch('http://localhost:3333/api/1.0.0/user/{user_id}', {
      method: 'GET',
      headers: {
        'X-Authorization': token, user_id,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      // data will contain the user's details, so you can set the state variables to these values
    } else {
      console.log('Error retrieving user details');
    }
  } catch (error) {
    console.log(error);
  }
};

    async function logout(){
    console.log("Logout")

    return fetch('http://localhost:3333/api/1.0.0/logout', {
      method: 'POST',
      headers: {
        'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.removeItem("whatsthat_session_token")
          await AsyncStorage.removeItem("whatsthat_user_id")
          this.props.navigation.navigate("Login")
        } else if (response.status === 401) {
          console.log("Unauthorised")
          await AsyncStorage.removeItem("whatsthat_session_token")
          await AsyncStorage.removeItem("whatsthat_user_id")
          this.props.navigation.navigate("Login")
        } else {
          throw "Something went Wrong"
        }

      })
      .catch((error) => {
        this.setState({ "error": error })
        this.setState({ "submitted": false });

      })
  }
  function main({ }) {
    const [ setToken] = useState(null);
  
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
    },
      []);

  // Render Chats component if user has logged in
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="account-circle" color="green" size={size} />
          ),
        }}
        initialParams={{ logout: logout }}
      />
      <Tab.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Chats',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="chat" color="green" size={size} />
          ),
        }}
      />
      <Tab.Screen name="ContactsScreen" component={ContactScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="contacts" color="green" size={size} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}
export default main;