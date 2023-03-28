import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  
  TouchableOpacity,
} from "react-native";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/1.0.0/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data);
      // Save the token in local storage
      await AsyncStorage.setItem('@token', data.token);
      setToken(data.token);
      // Navigate to the Chats screen
      navigation.navigate('main');
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <View style={styles.container}>
     
      <StatusBar style="auto" />
      <Image
        source={require('./assets/whatsthat.png')}
        style={{ width: 200, height: 200, display: 'flex', marginLeft: 30, marginBottom: 30, }}
      />
      <View style={styles.inputView}>
        
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
        
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity style={styles.signupbtn} onPress={handleLogin}>
        <Text style={styles.signuptxt}>Login</Text> 
      </TouchableOpacity> 
      <Text style={styles.loginP} >Do not have an account?</Text> 
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
       <Text style={styles.loginP}>Sign Up here</Text> 
      </TouchableOpacity> 
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808000",
    alignItems: "center",
    justifyContent: "center",
  },
 
  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 25,
    alignItems: "center",
  },
  
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 0,
    marginBottom:40,
    fontSize:20
  },
 
  signupbtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    backgroundColor: "green",
    Color:"white"
  },
  signuptxt: {
    fontSize:20,
    fontWeight: "bold"
  },
 
  loginP:{
    paddingTop:10,
    fontWeight: "bold",

  }
});