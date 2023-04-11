import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import singlechat from './singlechat'

function ChatsScreen(props) {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)

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
        setTimeout(() => {
          console.log(chatList, 'chatlist')
        }, 5000)
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    viewchat()
  }, [])

  const addchat = () => {
    navigation.navigate('addchat')
  }
  const singlechat = () => {
    navigation.navigate('singlechat')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>

      <TouchableOpacity style={styles.button} onPress={addchat}>
        <Text style={styles.buttonText}>Create Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={singlechat}>
        <Text style={styles.buttonText}>Single Chat</Text>
      </TouchableOpacity>

      <View style={styles.field}>
        {chatList.map((chat) => (
          <Text style={styles.chat} key={chat.id}>
            {chat.name}
          </Text>
        ))}
      </View>
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
  field: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 30,
    marginTop: 20,
    width: '90%',
  },
  chat: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ChatsScreen
