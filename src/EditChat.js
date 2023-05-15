import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'

function EditChat({ navigation }) {
  const [name, setName] = useState('')
  const [newName, setNewName] = useState('')
  const [chat_id, setChatId] = useState('')
  const [chatDetails, setChatDetails] = useState(null)

  const handleChatIdChange = (text) => {
    setChatId(text)
  }

  const fetchChatDetails = async () => {
    // Get user id and token from AsyncStorage
    const token = await AsyncStorage.getItem('@token')
    const id = await AsyncStorage.getItem('@id')

    // Make API call to fetch chat details
    const url = `http://localhost:3333/api/1.0.0/chat/${chat_id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data, 'this is data')
      setName(data.name)
      //setChatDetails(data) // Update the chatDetails state with the fetched data
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Failed to fetch chat details')
    }
  }

  useEffect(() => {
    if (chat_id) {
      fetchChatDetails()
    }
  }, [chat_id])

  const handleSubmit = async () => {
    // Validate form fields
    if (!chat_id) {
      Alert.alert('Error', 'Please Enter Chat ID')
      return
    }
    if (!name) {
      Alert.alert('Error', 'Please Enter Chat name')
      return
    }

    // Get user id and token from AsyncStorage
    const token = await AsyncStorage.getItem('@token')
    console.log(JSON.stringify({ name: newName }), 'Comment waghaira')
    // Make API call to update chat details
    const url = `http://localhost:3333/api/1.0.0/chat/${chat_id}`
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify({ name: newName }),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data) // Do something with the API response
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Failed to update chat details')
      return
    }

    // Save chat details to AsyncStorage
    const chatDetails = { chat_id, name }
    await AsyncStorage.setItem('chatDetail', JSON.stringify(chatDetails))

    // Show success message

    Alert.alert('Success', 'Chat details updated successfully')
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Chat</Text>

        <Text style={styles.label}>Chat ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Chat ID"
          value={chat_id}
          onChangeText={handleChatIdChange}
        />

        <Text style={styles.label}>Current Chat Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Chat Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        {name && (
          <>
            <Text style={styles.label}>New Chat Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter New Chat Name"
              value={newName}
              onChangeText={(text) => setNewName(text)}
            />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Ionicons name="save" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-backspace-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808000',
    overflow: 'scroll',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '50',
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
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    color: 'green',
    marginBottom: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
})

export default EditChat
