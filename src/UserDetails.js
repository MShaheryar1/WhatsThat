import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserDetails ({ token, navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        const id = await AsyncStorage.getItem('@id');

        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
            method:'GET',
          headers: {
            "X-Authorization":  token,
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        console.log(data, " this is data")
        setUser(data);
        await AsyncStorage.setItem('user', data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [token]);

  if (!user) {
    return <Text style={styles.error}>401 Unauthorised...</Text>;
  }

  return (
    <View style={styles.container}>
         <Image
        source={require('./assets/whatsthat.png')}
        style={{ width: 100, height: 100, display: 'flex', marginLeft: 30, marginBottom: 30, }}
      />
      <Text style={styles.title}>Account Details</Text>
      <Text style={styles.label}>ID:</Text>
      {user.user_id && <TextInput style={styles.input} value={user.user_id.toString()} editable={false} />}
      <Text style={styles.label}>First Name:</Text>
      {user.first_name && <TextInput style={styles.input} value={user.first_name} editable={false} />}
      <Text style={styles.label}>Last Name:</Text>
      {user.last_name && <TextInput style={styles.input} value={user.last_name} editable={false} />}
      <Text style={styles.label}>Email:</Text>
      {user.email && <TextInput style={styles.input} value={user.email} editable={false} />}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin:10,
    width: 250,
    fontSize: 16,
    color:"white"
  },
  error:{
    fontSize:16,
    color:'red',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    color: "green"
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDetails;
