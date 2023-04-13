import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, onPress } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from './Login'
import ChatsScreen from './chatsscreen'
import ContactScreen from './contactscreen'
import ProfileScreen from './profilescreen'
const Tab = createBottomTabNavigator()
function Main({ navigation }) {
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check if user has a token stored in async storage to stay logged in
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@token')
        if (value !== null) {
          setToken(value)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getToken()
  }, [])
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')

      const response = await fetch('http://localhost:3333/api/1.0.0/logout', {
        method: 'POST',
        headers: {
          'X-Authorization': token,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Logout was successful, remove all user data from async storage
        await AsyncStorage.multiRemove(['@token', '@id'])
        console.log('ID and Token removed')
        // Navigate to login screen
        navigation.navigate('Login', { setToken }) // Pass the setToken function as a parameter
      } else {
        // Logout failed, display error message
        const errorJson = await response.json()
        console.log('Logout failed:', errorJson.message)
        // You can display the error message to the user using an alert or a Toast message
      }
    } catch (error) {
      console.log('Logout failed:', error)
      // You can display the error message to the user using an alert or a Toast message
    }
  }

  if (!token) {
    // Render Login component if user has not logged in yet
    return <Login setToken={setToken} />
  }

  return (
    <Tab.Navigator>
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
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({}) => ({
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color="green"
              size={size}
            />
          ),
        })}
        initialParams={{ handleLogout: handleLogout }}
      ></Tab.Screen>

      <Tab.Screen
        name="ContactsScreen"
        component={ContactScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="contacts" color="green" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Main
