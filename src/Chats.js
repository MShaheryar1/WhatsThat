import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { useNavigation, HeaderBackButton } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Chats(props) {
  const navigation = useNavigation()
  console.log(props, 'this is props')
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [chat_id, setChatId] = useState(null)

  useEffect(() => {
    console.log(props.route.params, 'WWWWW')
    setChatId(props.route.params)
  }, [])

  const sendMessage = async () => {
    console.log(message, 'this is message')
    try {
      const token = await AsyncStorage.getItem('@token')
      const response = await fetch(
        'http://localhost:3333/api/1.0.0/chat/' + chat_id + '/message',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
          body: JSON.stringify({ message }),
        }
      )
      const data = response.status

      console.log(data, 'this is data')

      if (response.ok) {
        // handle success
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
        style={styles.input}
      />
      <TouchableOpacity onPress={sendMessage}>
        <Ionicons name="send" size={24} color="yellow" />
      </TouchableOpacity>
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
    backgroundColor: '#808000',
    padding: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
  },
  message: {
    backgroundColor: '#fff',
    borderRadius: 5,

    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
})

export default Chats
