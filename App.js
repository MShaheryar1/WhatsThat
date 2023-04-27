import * as React from 'react';
import { Text,  TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/home';
import Login from'./src/Login';
import Signup from './src/Signup';
import Main from './src/main';
import UserDetails from './src/UserDetails';
import EditUser from './src/EditUser';
import addchat from './src/addchat';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="UserDetails" component={UserDetails}/>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen 
          name="EditUser" 
          component={EditUser} 
          options={({ navigation }) => ({ headerShown: false, title: 'Edit User', headerLeft: null, headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Text style={{ fontWeight: 'bold', marginRight: 10, color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="addchat" component={addchat}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}
export default App;