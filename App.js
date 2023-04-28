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
import AddContact from './src/addcontact'
import ViewContact from './src/ViewContact'
import BlockContact from './src/BlockContact'
import ViewBlocked from './src/ViewBlocked'
import Unblock from './src/Unblock'
import DeleteContact from './src/DeleteContact'
import SearchUser from './src/SearchUser'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Main component */}

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />

        {/* Profile component */}

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

        {/* chats component */}

        <Stack.Screen name="Addchat" component={Addchat} />
        <Stack.Screen name="Singlechat" component={Singlechat} />
        <Stack.Screen name="EditChat" component={EditChat} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="AddMember" component={AddMember} />
        <Stack.Screen name="DeleteUser" component={DeleteUser} />

        {/* ContactsComponent */}

        <Stack.Screen name="SearchUser" component={SearchUser} />
        <Stack.Screen name="AddContact" component={AddContact} />
        <Stack.Screen name="ViewContact" component={ViewContact} />
        <Stack.Screen name="BlockContact" component={BlockContact} />
        <Stack.Screen name="ViewBlocked" component={ViewBlocked} />
        <Stack.Screen name="Unblock" component={Unblock} />
        <Stack.Screen name="DeleteContact" component={DeleteContact} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
