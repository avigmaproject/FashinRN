import React from 'react';
import {Text, View, TouchableOpacity, Alert,StyleSheet} from 'react-native';
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
import {basecolor,white,creamcolor,creamcolor1,black,creamcolor2,basecolortraspaernt} from "../services/constant"
import { useDispatch, useSelector } from "react-redux"
import {signOut} from '../store/actions/authActions';

export function ButtonAdd(props) {
  return (
    <View
      style={{
        width: 80,
        height: 80,
        backgroundColor: white,
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
          backgroundColor: creamcolor1,
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
const Tab = createBottomTabNavigator();
function MyTabs() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userToken)
 const Back = () => {
    dispatch(signOut());
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: creamcolor,
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
        listeners={({ navigation, route }) => ({
          tabPress: async (e) => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          },
        })}
        options={{
          tabBarItemStyle: {borderRadius: 40},
          tabBarIcon: ({focused}) =>
            focused ? (
             <View style={styles.sectionStyle}><Ionicons name="home" size={25} color={basecolor} /></View>
            ) : (
              <Ionicons name="home-outline" size={25} color={basecolor} style={{paddingTop:15}} />
            ),
        }}
      />
      <Tab.Screen
        name="UsersStack"
        component={UsersStack}
         listeners={({ navigation, route }) => ({
          tabPress: async (e) => {
            if (!token) {
              e.preventDefault();
              Alert.alert(
                "Please Login / Sign Up",
                "To use this functionality please Login / Sign Up first.",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () =>Back(),
                  },
                ]
              );
            }
          },
        })}
        options={{
          tabBarItemStyle: {borderRadius: 50, width: 40},
          tabBarIconStyle: {width: 35},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.sectionStyle}><Ionicons name="people" size={28} color={basecolor}/></View>
            ) : (
              <Ionicons name="people-outline" size={28} color={basecolor}  style={{  paddingTop:15}}/>
            ),
        }}
      />
      <Tab.Screen
        name="create"
        component={NewCollectionStack}
         listeners={({ navigation, route }) => ({
          tabPress: async (e) => {
            if (!token) {
              e.preventDefault();
              Alert.alert(
                "Please Login / Sign Up",
                "To use this functionality please Login / Sign Up first.",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () =>Back(),
                  },
                ]
              );
            }
          },
        })}
        options={{
          tabBarItemStyle: {
            backgroundColor: white,
            height: 50,
            position: "absolute",
            top: -25,
            width: 50,
            borderRadius: 20,
          },
          tabBarButton: props => <ButtonAdd {...props} />,
          tabBarIcon: ({focused}) => (
            <FeatherIcon name="plus" size={35} color={white} />
          ),
        }}
      />
      <Tab.Screen
        name="ClosetStack"
        component={ClosetStack}
         listeners={({ navigation, route }) => ({
          tabPress: async (e) => {
            if (!token) {
              e.preventDefault();
              Alert.alert(
                "Please Login / Sign Up",
                "To use this functionality please Login / Sign Up first.",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () =>Back(),
                  },
                ]
              );
            }
          },
        })}
        options={{
          tabBarItemStyle: {borderRadius: 40, width: 40,},
          tabBarIcon: ({focused}) =>
            focused ? <View style={styles.sectionStyle}><HangerDark width="27" /></View>:<View style={{paddingTop:20}}><Hanger width="30" /></View>,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
         listeners={({ navigation, route }) => ({
          tabPress: async (e) => {
            if (!token) {
              e.preventDefault();
              Alert.alert(
                "Please Login / Sign Up",
                "To use this functionality please Login / Sign Up first.",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () =>Back(),
                  },
                ]
              );
            }
          },
        })}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
               <View style={styles.sectionStyle}><FontAwesome name="user" size={30} color={basecolor} /></View>
            ) : (
            <FontAwesome name="user-o" size={25} color={basecolor}  style={{ paddingTop:15}}/>
            ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  sectionStyle: {backgroundColor:basecolortraspaernt,marginTop:20,height:40,width:40,justifyContent:"center",alignItems:"center",borderRadius:50},
  
})

export default MyTabs;
