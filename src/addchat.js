import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

function addchat() {
  const [name, setName] = useState(name)

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
      <Text style={styles.title}>Add chat</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        defaultValue={name}
        placeholder={name}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addtochat}>
        <Text style={styles.buttonText}>Add chat</Text>
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
})

export default addchat
