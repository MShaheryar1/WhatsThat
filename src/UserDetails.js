import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'

function UserDetails({ token, navigation }) {
  const [user, setUser] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      const id = await AsyncStorage.getItem('@id')
      const token = await AsyncStorage.getItem('@token')

      const response = await fetch(
        'http://localhost:3333/api/1.0.0/user/' + id + '/photo',
        {
          method: 'GET',
          headers: {
            'X-Authorization': token,
            Accept: 'image/png',
          },
        }
      )
      const blob = await response.blob()

      console.log('Image blob:', blob, 'Type:', blob.type)

      const url = URL.createObjectURL(blob)
      console.log('Image URL:', url)

      setImageSrc(URL.createObjectURL(blob))
      console.log(imageSrc, ' kkkkkkkk')
    }
    fetchImage()
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@id')

        const response = await fetch(
          `http://localhost:3333/api/1.0.0/user/${id}`,
          {
            method: 'GET',
            headers: {
              'X-Authorization': token,
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        console.log(data, ' this is data')
        setUser(data)
        await AsyncStorage.setItem('user', data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
  }, [token])

  if (!user) {
    return <Text style={styles.error}>401 Unauthorised...</Text>
  }

  return (
    <View style={styles.container}>
      <img
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          marginLeft: 25,
          marginBottom: 30,
          borderRadius: 100,
        }}
        src={imageSrc}
      ></img>
      <Text style={styles.title}>Account Details</Text>
      <Text style={styles.label}>ID:</Text>
      {user.user_id && (
        <TextInput
          style={styles.input}
          value={user.user_id.toString()}
          editable={false}
        />
      )}
      <Text style={styles.label}>First Name:</Text>
      {user.first_name && (
        <TextInput
          style={styles.input}
          value={user.first_name}
          editable={false}
        />
      )}
      <Text style={styles.label}>Last Name:</Text>
      {user.last_name && (
        <TextInput
          style={styles.input}
          value={user.last_name}
          editable={false}
        />
      )}
      <Text style={styles.label}>Email:</Text>
      {user.email && (
        <TextInput style={styles.input} value={user.email} editable={false} />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-backspace-sharp" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
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
  error: {
    fontSize: 16,
    color: 'red',
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
})

export default UserDetails
