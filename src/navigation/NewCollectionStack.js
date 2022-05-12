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
    <NewCollection.Navigator>
      <NewCollection.Screen
        name="AddCollectionsSpotlight"
        component={AddCollectionsSpotlightScreen}
        options={props => ({
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#593714', color: 'white'},
          headerTintColor: 'white',
          headerShadowVisible: false,
          headerTitle: props => <AppLogo {...props} />,
        })}
      />
    </NewCollection.Navigator>
  );
}

export default NewCollectionStack;
