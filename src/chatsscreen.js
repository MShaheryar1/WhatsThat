import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

function ChatsScreen(props) {
  const navigation = useNavigation()

  const viewchat = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')

      const response = await fetch(`http://localhost:3333/api/1.0.0/chat'`, {
        method: 'GET',
        headers: {
          'X-Authorization': token,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      console.log(data, ' this is data')
      setUser(data)
      await AsyncStorage.setItem('user', data)
    } catch (error) {
      console.error(error)
    }
  }

  const addchat = () => {
    navigation.navigate('addchat')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>

      <TouchableOpacity style={styles.button} onPress={addchat}>
        <Text style={styles.buttonText}>Add Chat</Text>
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

export default ChatsScreen
