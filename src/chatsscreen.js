import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
        setTimeout(() => {
          console.log(chatList, 'chatlist')
        }, 5000)
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
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={Addchat}>
        <Text style={styles.buttonText}>Create Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={Singlechat}>
        <Text style={styles.buttonText}>Single Chat</Text>
      </TouchableOpacity>

      <View style={styles.field}>
        <Text style={styles.title}>List of Chats</Text>
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
    borderRadius: 100,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  chat: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

export default ChatsScreen
