import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

function EditUser() {
  const [first_name, setFirstName] = useState(first_name);
  const [last_name,setLastName] = useState(last_name);
  const [email, setEmail] = useState(email);
  const [password, setPassword] = useState(password);

  useEffect(() => {
    // Fetch user details from AsyncStorage and update the state
    AsyncStorage.getItem('userDetails').then((data) => {
      if (data !== null) {
        const { first_name,last_name, email, password } = JSON.parse(data);
        setFirstName(first_name);
        setLastName(last_name);
        setEmail(email);
        setPassword(password);
        
      }
    });
  }, []);

  const handleSubmit = async () => {
    // Validate form fields
    if (!first_name || !last_name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
  
    // Get user id and token from AsyncStorage
    const userData = await AsyncStorage.getItem('userData');
    const { id, token } = JSON.parse(userData); 
  
    // Make API call to update user details
    const url = `http://localhost:3333/api/1.0.0/user/${id}`;
    const body = { first_name, last_name, email, password };
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(body),
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data); // Do something with the API response
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update user details');
      return;
    }
  
    // Save user details to AsyncStorage
    const userDetails = { first_name, last_name, email, password };
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
  
    // Show success message
    Alert.alert('Success', 'User details updated successfully');
  };
  
  console.log('State:', { first_name, last_name, email, password });
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/whatsthat.png')}
        style={{ width: 100, height: 100, display: 'flex', marginLeft: 30, marginBottom: 30 }}
      />
      <Text style={styles.title}>Edit Details</Text>

      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder={first_name}
        value={first_name}
        onChangeText={(text) => setFirstName(text)}
      />
       <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder={last_name}
        value={last_name}
        onChangeText={(text) => setLastName(text)}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder={email}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder={password}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Changes</Text>
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
    margin: 10,
    width: 250,
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    color: 'green',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditUser;
