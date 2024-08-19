import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PermitToWorkScreen from './PermitToWorkScreen'; // Import your screen
import PermitListScreen from './PermitListScreen'; // Import your checklist screen
import PermitListScreen2 from './PermitListScreen2';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PermitToWork">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}