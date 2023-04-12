import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

function AddContact() {
  const [user_id, setUserId] = useState('')

  const Addto = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      console.log(token, 'print token')

      if (!user_id) {
        console.log('User ID is empty')
        return
      }

      fetch('http://localhost:3333/api/1.0.0/user/' + user_id + '/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      })
        .then(async (response) => response.json())
        .then((data) => console.log(data, 'this is data'))

      //     console.log('Add contacts sent to api')
      //     if (response.status === 200) {
      //       console.log('User ' + user_id + ' added to contacts')
      //       setUserId(user_id)
      //     } else if (response.status === 400) {
      //       console.log('You cannot add yourself')
      //     } else if (response.status === 404) {
      //       console.log('User not found')
      //     } else {
      //       throw 'something went wrong'
      //     }
      //   }
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
      <TouchableOpacity style={styles.button} onPress={Addto}>
        <Text style={styles.buttonText}>Add</Text>
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

export default AddContact
