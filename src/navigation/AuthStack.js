import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppLogo from '../components/AppLogo';
import LoginScreen from '../screens/Auth/LoginScreen';
import SuccessScreen from '../screens/Auth/SuccessScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import SplashScreen from '../screens/Auth/SplashScreen';

const Auth = createNativeStackNavigator();

function AuthStack() {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerShown: false,
          headerShadowVisible: false,
        })}
      />
      <Auth.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerShown: false,
          headerShadowVisible: false,
        })}
      />
      <Auth.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerShown: false,
          headerShadowVisible: false,
        })}
      />
      <Auth.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerShown: false,
          headerShadowVisible: false,
        })}
      />

      <Auth.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerShown: false,
          headerShadowVisible: false,
        })}
      />
    </Auth.Navigator>
  );
}

export default AuthStack;
