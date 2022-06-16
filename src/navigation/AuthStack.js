import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SuccessScreen from '../screens/Auth/SuccessScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';

const Auth = createNativeStackNavigator();

function AuthStack() {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={({navigation}) => ({
          headerShown: false,
          headerShadowVisible: false,
        })}
      />
      <Auth.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={({navigation}) => ({
          headerShown: false,
          headerShadowVisible: false,
        })}
      />
      <Auth.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={({navigation}) => ({
          headerShown: false,
          headerShadowVisible: false,
        })}
      />

      <Auth.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={({navigation}) => ({
          headerShown: false,
          headerShadowVisible: false,
        })}
      />
    </Auth.Navigator>
  );
}

export default AuthStack;
