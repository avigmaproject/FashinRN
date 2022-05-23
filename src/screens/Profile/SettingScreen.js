import React from 'react';
import {View, Text,SafeAreaView} from 'react-native';
import Signup from '../../components/Signup';
import AddProfile from './AddProfile';

function SettingScreen(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AddProfile {...props} />
    </SafeAreaView>
  );
}

export default SettingScreen;
