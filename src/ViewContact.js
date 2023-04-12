import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

function ViewContact() {
  const [user, setUser] = useState('')
  const [ContactList, SetContactList] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@id')

        const response = await fetch(
          'http://localhost:3333/api/1.0.0/contacts',
          {
            method: 'GET',
            headers: {
              'X-Authorization': token,
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        SetContactList((oldArray) => [...oldArray, ...data])
        console.log(data, ' this is data')
        setUser(data)
        await AsyncStorage.setItem('user', data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
  }, [])

  if (!user) {
    return <Text style={styles.error}>401 Unauthorised...</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.title}>Contacts</Text>
        {ContactList.map((Contact) => (
          <View key={Contact.id}>
            <Text style={styles.Contact}></Text>
            <Text>
              User ID: {Contact.user_id}
              {'\n'}
              Name: {Contact.first_name} {Contact.last_name}
              {'\n'}
              E-mail: {Contact.email}
            </Text>
          </View>
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
    marginTop: 50,
    color: 'green',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  field: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 30,
    marginTop: 20,
    width: '150%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Contact: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

export default ViewContact
