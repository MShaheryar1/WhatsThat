import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

  const addChat = () => {
    navigation.navigate('Addchat')
  }
  const viewChat = () => {
    navigation.navigate('Singlechat')
  }
  const EditChat = () => {
    navigation.navigate('EditChat')
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={addChat}>
            <Text style={styles.buttonText}>Create Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={viewChat}>
            <Text style={styles.buttonText}>View Single Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={EditChat}>
            <Text style={styles.buttonText}>Edit Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chatList}>
          <Text style={styles.title}>List of Chats</Text>
          {chatList.map((chat) => (
            <View key={chat.id} style={styles.chat}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatTitle}>{chat.name}</Text>
                <Text style={styles.chatCreator}>
                  {'Created by: '}
                  {chat.creator.first_name} {chat.creator.last_name}
                </Text>
              </View>

              <Text style={styles.chatMessage}>{chat.messages}</Text>
            </View>
          ))}
        </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatList: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    marginTop: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chat: {
    marginBottom: 20,
  },
  chatHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatCreator: {
    fontSize: 16,
    color: '#666666',
  },
  chatMessage: {
    fontSize: 16,
    color: '#666666',
  },
})

export default ChatsScreen
