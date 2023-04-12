import React from 'react'
import { View, Text, StyleSheet, Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
function ContactScreen() {
  const navigation = useNavigation()

  const AddContact = () => {
    navigation.navigate('AddContact')
  }
  const ViewContact = () => {
    navigation.navigate('ViewContact')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <TouchableOpacity style={styles.button} onPress={AddContact}>
        <Text style={styles.buttonText}> Add Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={ViewContact}>
        <Text style={styles.buttonText}> View</Text>
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

export default ContactScreen
