// In App.js in a new project

import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from '../screens/Profile/SettingScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Icon from '../components/UI/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home/HomeScreen';
import AppLogo from '../components/AppLogo';
import AddCollectionsSpotlightScreen from '../screens/Collections/AddCollectionsSpotlight';

const NewCollection = createNativeStackNavigator();

function NewCollectionStack() {
  return (
    <NewCollection.Navigator  screenOptions={{
        headerShown:false,
      }}>
      <NewCollection.Screen
        name="AddCollectionsSpotlight"
        component={AddCollectionsSpotlightScreen}
      />
    </NewCollection.Navigator>
  );
}

export default NewCollectionStack;
