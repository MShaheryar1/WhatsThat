import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactScreen from './ContactScreen';
import ChatScreen from './Chats';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
