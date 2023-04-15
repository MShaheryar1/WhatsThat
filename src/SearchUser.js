import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Search User</Text>
        <View style={styles.field}>
          <Ionicons name="ios-search" size={24} color="#444" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter search query"
            value={query}
            onChangeText={handleQueryChange}
          />
        </View>
        <TouchableOpacity style={styles.srchButton} onPress={handleSearch}>
          <Text style={styles.srchButtonText}>Search</Text>
        </TouchableOpacity>
        {results.length > 0 && (
          <View style={styles.resultsContainer}>
            {results.map((user) => (
              <View style={styles.container} key={user.user_id}>
                <Text style={styles.contactName}>User ID: {user.user_id}</Text>
                <Text style={styles.contactInfo}>
                  Name: {user.given_name} {user.family_name}
                </Text>
                <Text style={styles.contactInfo}>Email: {user.email}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808000',
    padding: 20,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },

  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },

  srchButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  srchButtonText: {
    color: '#444',
    fontSize: 18,
    fontWeight: 'bold',
  },

  backButton: {
    position: 'absolute',
    bottom: 20, // Updated position
    left: 30,
    padding: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white', // Added color property
  },
  contactInfo: {
    fontSize: 14,
    color: 'white', // Added color property
  },

  field: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 20,
    marginTop: 40,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultsContainer: {
    marginTop: 20,
    width: '120',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    marginBottom: 30,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})

export default SearchUser
