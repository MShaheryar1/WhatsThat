import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './Login';

const Tab = createBottomTabNavigator();

function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts screen page</Text>
    </View>
  );
}

function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Screen</Text>
    </View>
  );
}

function ProfileScreen({ handleLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ContactScreen') {
            iconName = focused ? '' : '';
          } else if (route.name === 'Chats') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
    
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} handleLogout={handleLogout} />}
      </Tab.Screen>
      <Tab.Screen
  name="ContactScreen"
  component={ContactScreen}
  options={{
    tabBarLabel: 'Contacts',
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
