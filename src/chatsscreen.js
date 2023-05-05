import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EditChat from './EditChat'

function ChatsScreen(props) {
  const navigation = useNavigation()

  const [chatList, setChatList] = useState([])

  const viewchat = async () => {
    const token = await AsyncStorage.getItem('@token')

    fetch('http://localhost:3333/api/1.0.0/chat', {
      method: 'GET',
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'data')
        setChatList((oldArray) => [...oldArray, ...data])
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    viewchat()
  }, [])

  const Addchat = () => {
    navigation.navigate('Addchat')
  }
  const Singlechat = () => {
    navigation.navigate('Singlechat')
  }
  const EditChat = () => {
    navigation.navigate('EditChat')
  }
  const Chats = (chat_id) => {
    // navigation.navigate('Chats', { chat_id: chat_id })
    navigation.navigate('Chats', { chat_id })
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.button} onPress={Addchat}>
          <Text style={styles.buttonText}>Create Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={EditChat}>
          <Text style={styles.buttonText}>Edit Chat</Text>
        </TouchableOpacity>

        <View style={styles.field}>
          <Text style={styles.title}>List of Chats</Text>
          {chatList.map((chat) => (
            <TouchableOpacity
              key={chat.chat_id}
              style={styles.chatContainer}
              onPress={() => {
                console.log(chat.chat_id)
                return Chats(chat.chat_id)
              }}
            >
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatCreator}>
                Created by {chat.creator.first_name} {chat.creator.last_name}
              </Text>
              <Text style={styles.chatInfo}>
                {chat.creator.email} ({chat.creator.user_id})
              </Text>
              <Text style={styles.chatMessages}>{chat.messages}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: '#808000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginTop: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  field: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    width: '90%',
  },
  chatContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  chatCreator: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  chatInfo: {
    fontSize: 12,
    color: '#999',
  },
  chatMessages: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
})

export default ChatsScreen
