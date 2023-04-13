import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

function ProfileScreen(props) {
  const navigation = useNavigation()

  const handleUserDetails = () => {
    navigation.navigate('UserDetails')
  }

  const handleEditUser = () => {
    navigation.navigate('EditUser')
  }

  const handleLogout = () => {
    props.route.params.handleLogout()
    console.log('Logout is pressed')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity style={styles.button} onPress={handleUserDetails}>
        <Text style={styles.buttonText}>User Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleEditUser}>
        <Text style={styles.buttonText}>Edit Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Ionicons name="log-out" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  buttonText: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
})

export default ProfileScreen
