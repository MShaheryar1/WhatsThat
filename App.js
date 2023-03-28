import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/home';
import Login from'./src/Login';
import Signup from './src/Signup';
import main from './src/main';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="main" component={main} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
export default App;