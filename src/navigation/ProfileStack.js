import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from '../screens/Profile/SettingScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import AddColllectionSpotlight from '../screens/Collections/AddCollectionsSpotlight';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../components/UI/BackButton';
import AppLogo from '../components/AppLogo';
const Profile = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Profile.Navigator>
      <Profile.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          title: 'Profile',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log(navigation.navigate('Setting'))}>
              <Ionicons name="settings-outline" size={25} color="#593714" />
            </TouchableOpacity>
          ),
        })}
      />
      <Profile.Screen
        name="Setting"
        component={SettingScreen}
        options={props => ({
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => (
            <BackButton {...props} onPress={() => props.navigation.goBack()} />
          ),
        })}
      />
    </Profile.Navigator>
  );
}

export default ProfileStack;
