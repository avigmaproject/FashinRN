import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppLogo from '../components/AppLogo';
import ClosetScreen from '../screens/Closet/ClosetScreen';
const Closet = createNativeStackNavigator();

function ClosetStack() {
  return (
    <Closet.Navigator
      screenOptions={{
        headerShown:false,
      }}>
      <Closet.Screen
        name="ClosetScreen"
        component={ClosetScreen}
      />
    </Closet.Navigator>
  );
}

export default ClosetStack;
