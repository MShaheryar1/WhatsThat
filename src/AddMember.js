import React, { useState, useEffect } from 'react'
import { useNavigation, HeaderBackButton } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
function AddMember(props) {
  const [user_id, setUserId] = useState('')
  const [chat_id, setChatId] = useState(props)
  useEffect(() => {
    console.log(props.route.params, 'chat_id')
    setChatId(props.route.params)
  }, [])
  const navigation = useNavigation()
  const Add = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')

      if (!user_id) {
        console.log('User ID is empty')
        return
      }

      fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/user/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      })
        .then(async (response) => response.json())
        .then((data) => console.log(data, 'this is data'))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.title}>Enter ID </Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter ID"
          placeholderTextColor="#003f5c"
          onChangeText={(user_id) => setUserId(user_id)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={Add}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-backspace-sharp" size={30} color="black" />
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
})
export default AddMember
