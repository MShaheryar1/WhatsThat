import React, { useState, useEffect } from 'react'
import { useNavigation, HeaderBackButton } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'

function DeleteUser(props) {
  const [user_id, setUserId] = useState('')
  const [chat_id, setChatId] = useState('')
  useEffect(() => {
    console.log(props.route.params, 'chatId')
    setChatId(props.route.params.chat_id)
    console.log(chat_id, 'chat iddd')
  }, [])

  const navigation = useNavigation()
  const DeleteM = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')

      if (!user_id) {
        console.log('User ID is empty')
        return
      }

      fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/user/${user_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      }).then(async (response) => {
        const responseBody = await response.text()
        console.log(responseBody) // log response body
        // return response.json()
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.title}>Enter User ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter user ID"
          placeholderTextColor="#ccc"
          onChangeText={(user_id) => setUserId(user_id)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={DeleteM}>
        <Text style={styles.buttonText}>Delete </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputView: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#808000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#808000',
    padding: 5,
    borderRadius: 25,
  },
})
export default DeleteUser
