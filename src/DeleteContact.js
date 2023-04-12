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

function DeleteContact() {
  const [user_id, setUserId] = useState('')
  const navigation = useNavigation()

  const DeleteContact = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      console.log(token, 'print token')

      if (!user_id) {
        Alert.alert('Error', 'Please enter user ID')
        return
      }

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/user/${user_id}/contact`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        }
      )

      if (response.status === 200) {
        Alert.alert('Success', `User ${user_id} added to contacts`)
        setUserId('')
      } else if (response.status === 400) {
        Alert.alert('Error', 'You cannot Delete yourself')
      } else if (response.status === 404) {
        Alert.alert('Error', 'User not found')
      } else {
        throw 'Something went wrong'
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Something went wrong')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter User ID </Text>
      <View style={styles.inputView}>
        <Ionicons name="person-outline" size={24} color="black" />
        <TextInput
          style={styles.textInput}
          placeholder="User ID"
          placeholderTextColor="#444"
          value={user_id}
          onChangeText={setUserId}
          keyboardType="number-pad"
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={DeleteContact}>
        <Text style={styles.addButtonText}>Delete</Text>
      </TouchableOpacity>
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

export default DeleteContact
