import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';

const Tab = createBottomTabNavigator();

function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
    </View>
  );
}

function ChatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
    </View>
  );
}

function ProfileScreen({ route }) {
  const handleLogout = route.params.handleLogout;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile </Text>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
// The functions below check if the user has logged in using token, if the token
//is found, it is set using settoken function otherwise null
//if the token state is null, login is rendered passing settoken function.
//if token state is not null, user has logged in, chat component is rendered
function Chats({ navigation }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user has a token stored in async storage
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
      await AsyncStorage.removeItem('@token');
      setToken(null);
      navigation.navigate('Home');
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
      })}
    >


<Tab.Screen name="ProfileScreen" component={ProfileScreen}
        options={{headerShown:false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}
        initialParams={{ handleLogout: handleLogout }}
        
      />
      <Tab.Screen name="ChatsScreen" component={ChatsScreen}
        options={{headerShown:false,
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="ContactsScreen" component={ContactScreen}
        options={{ headerShown:false,
          tabBarLabel: 'contacts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1c1c1e',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chats;
