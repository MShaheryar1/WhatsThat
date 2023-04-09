import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";


function ProfileScreen(Props) {
  const navigation = useNavigation();
  const handleUserDetails = () => {
    navigation.navigate('UserDetails');
  }
  const EditUser = () => {
    navigation.navigate('EditUser');
  }
    const handleLogout = () =>{
      Props.route.params.handleLogout();
      console.log("Logout is pressed")
    
  };

  
  return (
    <View style={styles.container}>
<Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.button} onPress={handleUserDetails}>
        <Text style={styles.buttonText}>User Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={EditUser}>
        <Text style={styles.buttonText}>Edit Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
  <Text style={styles.buttonText}>Logout</Text>
</TouchableOpacity>


    </View> 
  );
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
    padding: 10,
    borderRadius: 5,
    paddingTop:10,
    marginVertical:50,
  },
  buttonText: {
    color: '#black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'serif',
  },
  
});

export default ProfileScreen;
