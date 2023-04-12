import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'

function Addchat() {
  const [name, setName] = useState(name)
  const navigation = useNavigation()

  const addtochat = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      const id = await AsyncStorage.getItem('@id')

      const response = await fetch(`http://localhost:3333/api/1.0.0/chat`, {
        method: 'POST',
        headers: {
          'X-Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      const data = await response.json()
      console.log(data, ' this is data')
      //   setUser(data)
      await AsyncStorage.setItem('user', data)
    } catch (error) {
      console.error(error)
      console.log('Chat created')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create chat</Text>
        <TextInput
          style={styles.input}
          defaultValue={name}
          placeholder={'Enter Chat Name'}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TouchableOpacity style={styles.button} onPress={addtochat}>
          <Text style={styles.buttonText}>create chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-backspace-sharp" size={30} color="black" />
        </TouchableOpacity>
      </ScrollView>
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
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    placeholder: {
      fontSize: 20,
    },
  },
})

export default Addchat
