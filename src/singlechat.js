import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

function singlechat() {
  const [chat_id, setChatId] = useState(chat_id)
  const [chat, setChat] = useState(chat)

  const fsinglechat = async () => {
    const token = await AsyncStorage.getItem('@token')

    fetch('http://localhost:3333/api/1.0.0/chat/' + chat_id, {
      method: 'GET',
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data')
        setChat(data)
        setTimeout(() => {}, 5000)
      })
      .catch((error) => console.log(error))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Single Chat Details</Text>
      <TextInput
        style={styles.input}
        defaultValue={chat_id}
        placeholder={chat_id}
        value={chat_id}
        onChangeText={(text) => setChatId(text)}
      />
      <TouchableOpacity style={styles.button} onPress={fsinglechat}>
        <Text style={styles.buttonText}>Get chat</Text>
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

export default singlechat
