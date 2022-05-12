import React from 'react';
import {View, Text} from 'react-native';
import Signup from '../../components/Signup';
import AddProfile from './AddProfile';

function SettingScreen(props) {
  return (
    <View style={{flex: 1}}>
      <AddProfile {...props} />
    </View>
  );
}

export default SettingScreen;
