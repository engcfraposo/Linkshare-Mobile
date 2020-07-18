import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Details from '../pages/Create';
import Tabs from './tabs.routes';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Admin from '../pages/Admin';
import Create from '../pages/Create';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Routes"
      component={Tabs}
      options={{
        headerShown: false,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{
        headerShown: false,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerShown: false,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="Admin"
      component={Admin}
      options={{
        headerShown: false,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="Create"
      component={Create}
      options={{
        headerShown: false,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{
        headerStyle: { backgroundColor: '#333' },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

export default Routes;
