import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'

function EditUser({ navigation }) {
  const [first_name, setFirstName] = useState(first_name)
  const [last_name, setLastName] = useState(last_name)
  const [email, setEmail] = useState(email)
  const [password, setPassword] = useState(password)
  const [imageSource, setImageSource] = useState(imageSource)
  const [id, setId] = useState(id)
  const [selectedFile, setSelectedFile] = useState(null)

  const options = {
    mediaType: 'photo',
    includeBase64: false,
    quality: 0.5,
  }

  useEffect(() => {
    // Fetch user details from AsyncStorage and update the state
    AsyncStorage.getItem('first_name').then((first_name) => {
      if (first_name !== null) {
        setFirstName(first_name)
      }
    })

    AsyncStorage.getItem('last_name').then((last_name) => {
      if (last_name !== null) {
        setLastName(last_name)
      }
    })
    AsyncStorage.getItem('email').then((email) => {
      if (email !== null) {
        setEmail(email)
      }
    })
    AsyncStorage.getItem('@id').then((id) => {
      if (id !== null) {
        setId(id)
      }
    })
  }, [])

  const handleSubmit = async () => {
    // Validate form fields
    if (!first_name || !last_name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }

    // Get user id and token from AsyncStorage
    const token = await AsyncStorage.getItem('@token')

    // Make API call to update user details
    const url = `http://localhost:3333/api/1.0.0/user/${id}`
    const body = { first_name, last_name, email, password }
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(body),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data) // Do something with the API response
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Failed to update user details')
      return
    }

    // Save user details to AsyncStorage
    const userDetails = { first_name, last_name, email, password }
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails))

    // Show success message
    Alert.alert('Success', 'User details updated successfully')
  }

  //console.log('State:', { first_name, last_name, email, password });
  const postImage = async () => {
    // Assuming that selectedImage is the base64-encoded image string
    console.log(imageSource, 'this runs ')
    let res = await fetch(imageSource)
    let blob = await res.blob()

    const token = await AsyncStorage.getItem('@token')
    console.log(id, 'this is id')

    fetch('http://localhost:3333/api/1.0.0/user/' + id + '/photo', {
      method: 'POST',
      headers: {
        'X-Authorization': token,

        'Content-Type': 'image/png',
      },
      body: blob,
    })
      .then((response) => response.status)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleInputImage = (event) => {
    event.preventDefault()
    const selectedFile = event.target.files[0]
    setSelectedFile(selectedFile)
    const reader = new FileReader()

    reader.onloadend = () => {
      const selectedImage = reader.result
      setImageSource(selectedImage)
      // do something with the selected image
    }
    reader.readAsDataURL(selectedFile)
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Upload Profile Picture here</Text>
          <TouchableOpacity style={styles.chooseFileButton}>
            <Text style={styles.chooseFileButtonText}>Choose file</Text>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleInputImage}
              style={{
                opacity: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </TouchableOpacity>

          {imageSource && <Image source={imageSource} style={styles.image} />}
          <TouchableOpacity style={styles.button} onPress={() => postImage()}>
            <Text style={styles.buttonText}>Post Image</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Edit Details</Text>

        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          defaultValue={first_name}
          placeholder={first_name}
          value={first_name}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          defaultValue={last_name}
          placeholder={last_name}
          value={last_name}
          onChangeText={(text) => setLastName(text)}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          defaultValue={email}
          placeholder={email}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder={'Enter your Password'}
          defaultValue={password}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Ionicons name="save" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-backspace-sharp" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    overflow: 'scroll',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '50',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 250,
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    color: 'green',
    marginBottom: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
})

export default EditUser
