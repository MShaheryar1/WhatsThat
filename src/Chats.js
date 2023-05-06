import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Chats(props) {
  const navigation = useNavigation()
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [messageId, setMessageId] = useState([])

  const [chatId, setChatId] = useState(props.route.params.chat_id)
  const [chat, setChat] = useState({ messages: [{}] })
  const [editFormVisible, setEditFormVisible] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const token = await AsyncStorage.getItem('@token')
    console.log(chatId, 'chatid')
    fetch('http://localhost:3333/api/1.0.0/chat/' + chatId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data')
        setChat(data)
        setChatMessages(data.messages)

        console.log(data.messages, 'data messages')
      })

      .catch((error) => console.log(error))
  }

  const sendMessage = async () => {
    console.log(message, 'this is message')
    try {
      const token = await AsyncStorage.getItem('@token')
      const response = await fetch(
        'http://localhost:3333/api/1.0.0/chat/' + chatId + '/message',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
          body: JSON.stringify({ message: message }),
        }
      )
      const data = response.status

      console.log(data, 'this is data')
      console.log(message, 'this is messages')

      if (response.ok) {
        setChatMessages([...chatMessages, { message: message }])

        console.log(chatMessages, 'message')
        // reset message input field
        setMessage('')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const handleLongPress = (item, token) => {
    console.log('Item long pressed:', item, token)
    setModalVisible(true)
    setMessageId(item.message_id) // set the message_id in state
    setMessage(item.message)
  }

  const Deletemessage = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      const response = await fetch(
        'http://localhost:3333/api/1.0.0/chat/' +
          chatId +
          '/message/' +
          messageId,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        }
      )
      const data = response.status

      console.log(data, 'this is data')

      if (response.ok) {
        // remove the deleted message from the state
        setChatMessages(
          chatMessages.filter((msg) => msg.message_id !== messageId)
        )
      } else {
        throw new Error('Failed to delete message')
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }
  async function editChatMessage() {
    try {
      const token = await AsyncStorage.getItem('@token')

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message/${messageId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      )

      const result = await response.json()

      if (result.success) {
        console.log('Chat message updated successfully!')

        // Update the UI with the edited message
        const editedMessage = result.message
        // This is an example of how you can update the UI, assuming you have a chat message component
        // that displays the message and can be updated with new props
        Chats(messageId, editedMessage)
      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const renderChatMessage = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      style={styles.message}
    >
      <Text>{item.message}</Text>
    </TouchableOpacity>
  )

  const AddMember = (chat_id) => {
    console.log(chat_id, 'chat_id')
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
        keyExtractor={(data, index) => index}
        style={styles.messagesList}
      />
      <Modal visible={modalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Ionicons name="close-circle-outline" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={Deletemessage}
            >
              <Text style={styles.buttonText}>Delete Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setEditFormVisible(true)}
            >
              <Text style={styles.buttonText}>Edit Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={editFormVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setEditFormVisible(false)}>
            <Ionicons name="close-circle-outline" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            {
              <>
                <TextInput
                  style={styles.Edit}
                  value={message}
                  onChangeText={(text) => {
                    setMessage(text)
                  }}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={editChatMessage}
                >
                  <Ionicons name="save" size={30} color="black" />
                </TouchableOpacity>
              </>
            }
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.send}>
          <Ionicons name="send" size={24} color="yellow" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonA}
          onPress={() => AddMember(chatId)}
        >
          <Text>Add User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonB}
          onPress={() => DeleteUser(chatId)}
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
    backgroundColor: '#808000',
    padding: 20,
    justifyContent: 'flex-end',
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
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#808000',
    fontWeight: 'bold',
  },
  buttonA: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginTop: 80,
    marginBottom: 20,
    position: 'absolute',
  },
  buttonB: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginTop: 80,
    marginBottom: 20,

    position: 'absolute',
    marginLeft: 110,
  },
  messagesList: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
    marginTop: 80,
  },
  message: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Change top value
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
  send: {
    marginBottom: 29,
  },
  backButtonText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '25%',
    marginTop: '70%',
  },
  modalContent: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: '#808000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  Edit: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default Chats
