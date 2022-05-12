import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppLogo from '../components/AppLogo';
import ClosetScreen from '../screens/Closet/ClosetScreen';
const Closet = createNativeStackNavigator();

function ClosetStack() {
  return (
    <Closet.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {backgroundColor: 'white'},
      }}>
      <Closet.Screen
        name="ClosetScreen"
        component={ClosetScreen}
        options={({navigation}) => ({
          headerTitle: props => <AppLogo />,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        })}
      />
    </Closet.Navigator>
  );
}

export default ClosetStack;
