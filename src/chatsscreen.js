import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>

      <TouchableOpacity style={styles.button} onPress={addchat}>
        <Text style={styles.buttonText}>Add Chat</Text>
      </TouchableOpacity>
      <ul>
        {chatList.map((chat) => (
          <>
            <li key={chat.id}>{chat.name}</li>
            {/* <li key={chat.last_message}>{chat.message}</li> */}
          </>
        ))}
      </ul>
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
})

export default ChatsScreen
