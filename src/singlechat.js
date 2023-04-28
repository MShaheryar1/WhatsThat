import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

function Singlechat() {
  const [chat_id, setChatId] = useState('')
  const [chat, setChat] = useState({
    name: '',
    creator: { user_id: '', first_name: '', last_name: '', email: '' },
    members: [{ user_id: '', first_name: '', last_name: '', email: '' }],
    messages: [{}],
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
        console.log(data.members, 'data members')
        console.log(data.messages, 'data messages')
      })
      .catch((error) => console.log(error))
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>View Single Chat</Text>
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
            <TextInput
              style={styles.input}
              value={chat.name}
              editable={false}
            />

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
              value={chat.members[0].user_id}
              editable={false}
            />
            <TextInput
              style={styles.input}
              value={`${chat.members[0].first_name}\n${chat.members[0].last_name}`}
              editable={false}
            />
            <TextInput
              style={styles.input}
              value={chat.members[0].email}
              editable={false}
            />
            <Text style={styles.label}> Last Message</Text>
            <TextInput
              style={styles.input}
              value={chat.messages.message[0]}
              editable={false}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-backspace-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808000',
    overflow: 'scroll',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
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
    marginBottom: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Singlechat
