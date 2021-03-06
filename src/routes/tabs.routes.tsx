import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import Main from '../pages/Main';
import Cart from '../pages/Cart';

const Tab = createMaterialBottomTabNavigator();

const RouteTabs: React.FC = () => (
  <Tab.Navigator
    activeColor="#fff"
    inactiveColor="#ccc"
    barStyle={{ backgroundColor: '#333' }}
  >
    <Tab.Screen
      name="Main"
      component={Main}
      options={{
        tabBarIcon: (props: { color: '#fff' }) => (
          <Icon name="home" size={20} color={props.color} />
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        tabBarIcon: (props: { color: '#fff' }) => (
          <Feather name="shopping-cart" size={20} color={props.color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default RouteTabs;
