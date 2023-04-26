import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Chats(props) {
  const navigation = useNavigation()
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [chat_id, setChatId] = useState(null)

  useEffect(() => {
    console.log(props.route.params, 'chatId')
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
        setChatMessages([...chatMessages, { message: message }])
        // reset message input field
        setMessage('')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const renderChatMessage = ({ item }) => (
    <View style={styles.message}>
      <Text>{item.message}</Text>
    </View>
  )
  const AddMember = (chat_id) => {
    navigation.navigate('AddMember', { chat_id: chat_id })
  }
  const DeleteUser = (chat_id) => {
    navigation.navigate('DeleteUser', { chat_id: chat_id })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        renderItem={renderChatMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
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
          onPress={() => AddMember(chat_id.chat_id)}
        >
          <Text>Add a User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => DeleteUser(chat_id.chat_id)}
        >
          <Text>Delete a User</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    padding: 20,
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#F9BF3B',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messagesList: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  message: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButtonText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
})

export default Chats
