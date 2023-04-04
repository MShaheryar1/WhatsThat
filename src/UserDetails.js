import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function UserDetails ({ id,Token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');

        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}`, {
            method:'GET',
          headers: {
            "X-Authorization":  token,
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("error");
      }
    };
    fetchUser();
  }, [id, Token]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <Text style={styles.label}>ID:</Text>
      <TextInput style={styles.input} value={user.id.toString()} />
      <Text style={styles.label}>First Name:</Text>
      <TextInput style={styles.input} value={user.first_name} />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput style={styles.input} value={user.last_name} />
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={user.email} />
    </View>
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
  },
});

export default UserDetails;
