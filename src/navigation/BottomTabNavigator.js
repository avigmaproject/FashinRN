import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Hanger from '../assets/svgs/hanger_outline.svg';
import HangerDark from '../assets/svgs/hangerDark.svg';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import UsersStack from './UsersStack';
import ClosetStack from './ClosetStack';
import NewCollectionStack from './NewCollectionStack';

export function ButtonAdd(props) {
  return (
    <View
      style={{
        width: 80,
        height: 80,
        backgroundColor: 'white',

        top: -42,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }}>
      <TouchableOpacity
        {...props}
        style={{
          position: 'relative',
          width: 70,
          height: 70,
          backgroundColor: '#99795B',
          top: 0,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}></TouchableOpacity>
    </View>
  );
}

const TabButton = props => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        width: 60,
        height: 60,
        borderRadius: 45,
        backgroundColor: 'red',
        // borderWidth: 1,
        elevation: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginHorizontal: 10,
        ...props.style,
      }}>
      <View>{props.children}</View>
    </TouchableOpacity>
  );
};

const TabButtonUser = props => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        width: 65,
        height: 60,
        borderRadius: 45,
        backgroundColor: '#CDAF90',
        // borderWidth: 1,
        elevation: 0,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5,
        marginHorizontal: 10,
        ...props.style,
      }}>
      <View>{props.children}</View>
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#CDAF90',
          height: 70,
          position: 'absolute',
          elevation: 0,
        },

        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarItemStyle: {borderRadius: 40},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="home" size={25} color="#593714" />
            ) : (
              <Ionicons name="home-outline" size={25} color="#593714" />
            ),
        }}
      />

      <Tab.Screen
        name="UsersStack"
        component={UsersStack}
        options={{
          tabBarItemStyle: {borderRadius: 50, width: 40},
          tabBarIconStyle: {width: 35},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="people" size={28} color="#593714" />
            ) : (
              <Ionicons name="people-outline" size={28} color="#593714" />
            ),
        }}
      />
      <Tab.Screen
        name="create"
        component={NewCollectionStack}
        options={{
          tabBarItemStyle: {
            backgroundColor: 'white',
            height: 50,
            position: 'relative',
            top: -25,
            width: 50,
            borderRadius: 20,
          },
          tabBarButton: props => <ButtonAdd {...props} />,
          tabBarIcon: ({focused}) => (
            <FeatherIcon name="plus" size={35} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="ClosetStack"
        component={ClosetStack}
        options={{
          tabBarItemStyle: {borderRadius: 40, width: 40},
          tabBarIcon: ({focused}) =>
            focused ? <HangerDark width="27" /> : <Hanger width="30" />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesome name="user" size={30} color="#593714" />
            ) : (
              <FontAwesome name="user-o" size={25} color="#593714" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
