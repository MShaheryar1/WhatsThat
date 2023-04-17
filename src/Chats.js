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

function Chats({ props }) {
  const navigation = useNavigation()
  console.log(props, 'this is props')
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [chat_id, setChatId] = useState(null)
  const sendMessage = async () => {
    console.log(navigation.props)

    try {
      console.log(chat_id, 'this is chat_id')

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
      if (response.ok) {
        const data = await response.json()
        setChatMessages(data)
        setChatId(data[0].chat_id)

        // handle success
        setMessage('')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  useEffect(() => {
    setChatMessages([])
  }, [])

  return (
    <View style={styles.container}>
      {chatMessages.map((chatMessage) => (
        <Text key={chatMessage.id} style={styles.message}>
          {chatMessage.message}
        </Text>
      ))}
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
        style={styles.input}
      />
      <TouchableOpacity onPress={sendMessage}>
        <Ionicons name="send" size={24} color="white" />
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
