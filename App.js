import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PermitToWorkScreen from './Screens/PermitToWorkScreen'; // Import your screen
import PermitListScreen from './Screens/PermitListScreen'; // Import your checklist screen
import PermitListScreen2 from './Screens/PermitListScreen2';
import PermitAuthenticateScreen from './Screens/PermitAuthenticateScreen';
import ChecklistSection from './Screens/ChecklistSection';
import ChecklistScreen from './Screens/ChecklistScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PermitAuthenticateScreen">
        <Stack.Screen
        name="PermitAuthenticateScreen"
        component={PermitAuthenticateScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
          name="PermitToWork"
          component={PermitToWorkScreen}
          options={{ headerShown: false }} // Hide the default header
        />
        <Stack.Screen
          name="Permitlist"
          component={PermitListScreen}
          options={{ headerShown: false }} // Hide the default header
        />
        <Stack.Screen
          name="Permitlist2"
          component={PermitListScreen2}
          options={{ headerShown: false }} // Hide the default header
        />
        <Stack.Screen
        name='ChecklistSection'
        component={ChecklistSection}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name='ChecklistScreen'
        component={ChecklistScreen}
        options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}