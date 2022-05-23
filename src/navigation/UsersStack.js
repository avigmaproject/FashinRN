import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppLogo from '../components/AppLogo';
import UsersScreen from '../screens/Users/UsersScreen';
const Users = createNativeStackNavigator();

function UsersStack() {
  return (
    <Users.Navigator
      screenOptions={{
        headerShown:false,
      }}>
      <Users.Screen
        name="Users"
        component={UsersScreen}
      />
    </Users.Navigator>
  );
}

export default UsersStack;
