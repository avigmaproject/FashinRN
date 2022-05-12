// In App.js in a new project

import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from '../screens/Profile/SettingScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Icon from '../components/UI/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home/HomeScreen';
import UserPostsScreen from '../screens/Home/UserPostsScreen';
import UserPostDetailsScreen from '../screens/Home/UserPostDetailsScreen';
import AppLogo from '../components/AppLogo';
// import FashionLogoLight from '../assets/svgs/FashionLogoLight.svg';
const Home = createNativeStackNavigator();

function HomeStack() {
  return (
    <Home.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {backgroundColor: 'white'},
        // headerShown: false,
      }}>
      <Home.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: props => <AppLogo />,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        })}
      />
      <Home.Screen
        name="UserPostsScreen"
        component={UserPostsScreen}
        options={({navigation}) => ({
          headerTitle: props => <AppLogo />,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        })}
      />
      <Home.Screen
        name="UserPostDetailsScreen"
        component={UserPostDetailsScreen}
        options={({navigation}) => ({
          headerTitle: props => <AppLogo />,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#593714'},
        })}
      />
    </Home.Navigator>
  );
}

export default HomeStack;
