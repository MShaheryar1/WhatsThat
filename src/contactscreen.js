import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

function ContactScreen() {
  const navigation = useNavigation()
  const SearchUser = () => {
    navigation.navigate('SearchUser')
  }
  const AddContact = () => {
    navigation.navigate('AddContact')
  }
  const ViewContact = () => {
    navigation.navigate('ViewContact')
  }
  const DeleteContact = () => {
    navigation.navigate('DeleteContact')
  }
  const BlockContact = () => {
    navigation.navigate('BlockContact')
  }
  const ViewBlocked = () => {
    navigation.navigate('ViewBlocked')
  }
  const Unblock = () => {
    navigation.navigate('Unblock')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts Management </Text>
      <TouchableOpacity style={styles.button} onPress={SearchUser}>
        <Text style={styles.buttonText}>Search a User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={AddContact}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={ViewContact}>
        <Text style={styles.buttonText}>View Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={DeleteContact}>
        <Text style={styles.buttonText}>Delete Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={BlockContact}>
        <Text style={styles.buttonText}>Block Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={ViewBlocked}>
        <Text style={styles.buttonText}>View Blocked Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={Unblock}>
        <Text style={styles.buttonText}>Unblock</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 20,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ContactScreen
