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
import FashionLogoLight from '../assets/svgs/FashionLogoLight.svg';
const Home = createNativeStackNavigator();
import BackButton from '../components/UI/BackButton';

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
        options={{
          headerShown: false,
        }}
      />
  <Home.Screen
        name="UserPostsScreen"
        component={UserPostsScreen}
        options={({navigation,props}) => ({
           headerTitle: null,
          headerTitleAlign: 'center',  
          headerTitleStyle:{color:"#593714",fontSize:20,fontWeight:"bold"},
          headerTitleAlign: 'center',  
          headerShadowVisible: false,
          headerLeft: () => (
            <BackButton {...props} onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Home.Screen
        name="UserPostDetailsScreen"
        component={UserPostDetailsScreen}
 options={{
          headerShown: false,
        }}
        // options={({navigation,props}) => ({
        //   headerStyle: {backgroundColor: '#593714'},
        //   headerTitle: null,
        //   headerTitleAlign: 'center',  
        //   headerShadowVisible: false,
        //   headerTitleStyle:{color:"#AB8560",fontSize:20,fontWeight:"bold"},
        //   headerLeft: () => (
        //     <BackButton {...props} backgroundColor={"#AB8560"} onPress={() => navigation.goBack()} />
        //   ),
        // })}
      />
    
    </Home.Navigator>
  );
}

export default HomeStack;