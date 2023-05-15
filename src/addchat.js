import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'

function Addchat() {
  const [name, setName] = useState('')
  const navigation = useNavigation()

  const addtochat = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      const id = await AsyncStorage.getItem('@id')

      const response = await fetch(`http://localhost:3333/api/1.0.0/chat`, {
        method: 'POST',
        headers: {
          'X-Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      const data = await response.json()
      console.log(data, ' new Chat')
      await AsyncStorage.setItem('user', data)
    } catch (error) {
      console.error(error)
      console.log('Chat created')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create a Chat</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Chat Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={addtochat}>
          <Text style={styles.buttonText}>Create Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
          <Text style={styles.backButtonText}></Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808000',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    marginLeft: 5,
  },
})

export default Addchat
