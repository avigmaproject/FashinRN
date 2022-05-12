import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppLogo from '../components/AppLogo';
import UsersScreen from '../screens/Users/UsersScreen';
const Users = createNativeStackNavigator();

function UsersStack() {
  return (
    <Users.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {backgroundColor: '#593714'},
      }}>
      <Users.Screen
        name="Users"
        component={UsersScreen}
        options={({navigation}) => ({
          headerTitle: props => <AppLogo />,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        })}
      />
    </Users.Navigator>
  );
}

export default UsersStack;
