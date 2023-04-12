import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

function ViewContact() {
  const [user, setUser] = useState('')
  const [contactList, setContactList] = useState([])
  const navigation = useNavigation()
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
        setContactList((oldArray) => [...oldArray, ...data])
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Contacts</Text>
        <View style={styles.field}>
          {contactList.map((contact) => (
            <View key={contact.id} style={styles.contact}>
              <Text style={styles.contactName}>
                {contact.first_name} {contact.last_name}
              </Text>
              <Text style={styles.contactInfo}>
                {contact.email} | User ID: {contact.user_id}
              </Text>
            </View>
          ))}
        </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginTop: 50,
    color: 'green',
    marginBottom: 50,
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
    marginTop: 40,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  contact: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 14,
  },
})

export default ViewContact
