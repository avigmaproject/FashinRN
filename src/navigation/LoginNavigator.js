import * as React from 'react';
import { Platform } from 'react-native'

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Login from '../screens/Auth/LoginScreen';
import Signup from '../components/Signup';
import AuthStack from './AuthStack';

const Tab = createMaterialTopTabNavigator();

const LoginNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 15,
          textTransform: 'none',
        },
        tabBarStyle: {
          backgroundColor: '#CDAF90',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#5B4025',
        tabBarContentContainerStyle: {

          // justifyContent: 'center',
          // alignItems: 'center',
// marginTop:40
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#5B4025',
          height: '100%',
        },
        tabBarIndicatorContainerStyle: {

          // justifyContent: 'center',
          // alignItems: 'center',
        },
      }}>
      <Tab.Screen name="Login" component={AuthStack} />
      <Tab.Screen name="Create Account" component={Signup} />
    </Tab.Navigator>
  );
};

export default LoginNavigation;
