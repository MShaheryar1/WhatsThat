import React from "react";
import { View, StyleSheet, Image,TouchableOpacity } from 'react-native';
import Button from "./Button";
const Home = (props) => {
    return (
  

<View style= {{backgroundColor:'#808000', flex:1}}>
<Image
  source={require('./assets/whatsthat.png')}
  style={{ width: 200, height: 200, display:'block', margin:100, marginLeft: 100}}
/>

        <View style={{marginTop:20, paddingLeft: 15 }}>
            <Button
                bgColor={'white'}
                textColor={'black'}
                btnLabel='Login'
                Press={() => props.navigation.navigate('Login')} />
       
        <View style={{ marginTop: 50, }}>
                <Button
                    bgColor={'white'}
                    textColor={'black'}
                    btnLabel='Sign Up'
                    Press={() => props.navigation.navigate('Signup')} />
            </View>
            {/* <View><TouchableOpacity onPress={() => navigation.navigate('userDetails')}>User Details</TouchableOpacity></View> */}
            

            </View>
            </View>
    );
}
const styles = StyleSheet.create({})



export default Home;