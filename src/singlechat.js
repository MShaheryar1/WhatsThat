import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

function Singlechat() {
  const [chat_id, setChatId] = useState('')
  const [chat, setChat] = useState({
    name: '',
    creator: { user_id: '', first_name: '', last_name: '' },
    members: { user_id: '', first_name: '', last_name: '' },
    messages: {},
  })

  const navigation = useNavigation()

  const fsinglechat = async () => {
    const token = await AsyncStorage.getItem('@token')

    fetch('http://localhost:3333/api/1.0.0/chat/' + chat_id, {
      method: 'GET',
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChat(data)
        console.log(data.creator, 'data creator')
        // console.log(data, 'this is data')

        // console.log(typeof data)
        // console.log(data[creator], 'hello sherry')
        // console.log(Object.keys(data))
        // console.log(data.creator, ' data creator')
        // console.log(chat.creator, 'chat creator')
      })
      .catch((error) => console.log(error))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Single Chat Details</Text>
      <TextInput
        style={styles.input}
        defaultValue={chat_id}
        placeholder="Enter ID Number"
        value={chat_id}
        onChangeText={(text) => setChatId(text)}
      />
      <TouchableOpacity style={styles.button} onPress={fsinglechat}>
        <Text style={styles.buttonText}>Get chat</Text>
      </TouchableOpacity>
      {chat && (
        // render the chat details once chat state is not null
        <View>
          <Text style={styles.label}>Chat Name:</Text>
          <TextInput style={styles.input} value={chat.name} editable={false} />

          <Text style={styles.label}> Creator</Text>
          <TextInput
            style={styles.input}
            value={chat.creator.user_id}
            editable={false}
          />
          <TextInput
            style={styles.input}
            value={`${chat.creator.first_name}\n${chat.creator.last_name}`}
            editable={false}
          />
          <TextInput
            style={styles.input}
            value={chat.creator.email}
            editable={false}
          />
          <Text style={styles.label}> Members</Text>
          <TextInput
            style={styles.input}
            value={chat.members.user_id}
            editable={false}
          />
          <TextInput
            style={styles.input}
            value={`${chat.members.first_name}\n${chat.members.last_name}`}
            editable={false}
          />
          <TextInput
            style={styles.input}
            value={chat.members.email}
            editable={false}
          />
          <Text style={styles.label}> Last Message</Text>
          <TextInput
            style={styles.input}
            value={chat.messages}
            editable={false}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 250,
    fontSize: 16,
    color: 'white',
    placeholder: {
      fontSize: 50,
    },
  },
  error: {
    fontSize: 16,
    color: 'red',
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
})

export default Singlechat
