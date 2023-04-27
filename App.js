import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/home'
import Login from './src/Login'
import Signup from './src/Signup'
import Main from './src/main'
import UserDetails from './src/UserDetails'
import EditUser from './src/EditUser'
import Addchat from './src/Addchat'
import Singlechat from './src/Singlechat'
import EditChat from './src/EditChat'
import Chats from './src/Chats'
import AddMember from './src/AddMember'
import DeleteUser from './src/DeleteUser'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="EditUser"
          component={EditUser}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Edit User',
            headerLeft: null,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginRight: 10,
                    color: 'white',
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Addchat" component={Addchat} />
        {/* <Stack.Screen name="Singlechat" component={Singlechat} /> */}
        <Stack.Screen name="EditChat" component={EditChat} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="AddMember" component={AddMember} />
        <Stack.Screen name="DeleteUser" component={DeleteUser} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
