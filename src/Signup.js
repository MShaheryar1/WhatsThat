import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,

} from "react-native";

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    const navigation = useNavigation();
    this.state = {
      Singup:[],
      isLoading: true,
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  }

  async handleSignup() {
    let to_send = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };
    try {
      const response = await fetch('http://localhost:3333/api/1.0.0/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(to_send)
      });
      Alert.alert("Account Created");
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image
          source={require('./assets/whatsthat.png')}
          style={{ width: 200, height: 200, display: 'flex', marginLeft: 30, marginBottom: 30 }}
        />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            onChangeText={(first_name) => this.setState({ first_name })}
            value={this.state.first_name}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            onChangeText={(last_name) => this.setState({ last_name })}
            value={this.state.last_name}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
       

        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => this.state({ password })}
            value={this.State.password} />
        </View>
        <TouchableOpacity style={styles.signupbtn} onPress={handleSignup}>
          <Text style={styles.signuptxt}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{
          paddingTop: 10,
          fontWeight: "bold",
        }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{
            paddingTop: 10,
            fontWeight: "bold",
          }}> Login here</Text>
        </TouchableOpacity>


      </View>
    );

  }
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
    borderRadius: 10,
    width: "80%",
    height: 45,
    marginBottom: 25,
    alignItems: "center",
    color: "black",
    justifyContent: 'space-around'
  },

  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 20

  },

  signupbtn: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "green",


  },
  signuptxt: {
    fontSize: 20,
  },

  loginP: {
    paddingTop: 5,
    fontWeight: "bold",

  }

});
export default Signup;