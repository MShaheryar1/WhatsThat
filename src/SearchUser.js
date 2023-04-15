import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

function SearchUser() {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [contactsData, setContactsData] = useState([])

  const handleQueryChange = (text) => {
    setQuery(text)
  }

  const handleSearch = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/search?q=${query}&search_in=all`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        }
      )
      const data = await response.json()
      console.log(data, 'this is data')
      const updatedUserData = data.map((user) => {
        const isContact = contactsData.some(
          (contact) => contact.user_id === user.user_id
        )
        return { ...user, isContact }
      })
      setContactsData(contactsData)
      setResults(updatedUserData)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Failed to search user')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Search User</Text>
        <View style={styles.inputView}>
          <Ionicons name="ios-search" size={24} color="#444" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter search query"
            value={query}
            onChangeText={handleQueryChange}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleSearch}>
          <Text style={styles.addButtonText}>Search</Text>
        </TouchableOpacity>
        {results.length > 0 && (
          <View>
            {results.map((user) => (
              <View key={user.user_id}>
                <Text>
                  {user.given_name} {user.family_name}
                </Text>
                <Text>{user.email}</Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#444',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#444',
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 60,
  },
  addButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 20, // Updated position
    left: 20,
    padding: 10,
  },
})

export default SearchUser
