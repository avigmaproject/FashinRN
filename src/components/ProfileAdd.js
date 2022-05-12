import React from 'react';
import {View, Text, Image} from 'react-native';
import Icon from './UI/Icon';
import User from '../assets/svgs/user.svg';
const ProfileAdd = props => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '86%',
        borderColor: '#D7C7B6',
        borderWidth: 1,
        height: 70,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#593714',
      }}>
      <View
        style={{
          width: '85%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: '#593714',
        }}>
        <Image
          style={{
            width: '20%',
            height: '92%',
            alignSelf: 'center',
            marginLeft: 3,
            marginVertical: 5,
            borderRadius: 3,
          }}
          resizeMode="contain"
          source={require('../assets/profile/dp.jpg')}
          alt="logo"
        />
        <Text style={{alignSelf: 'center', color: 'white', margin: 10}}>
          {' '}
          Loreal Mekondata{' '}
        </Text>
      </View>
      <View
        style={{
          width: '12%',
          backgroundColor: '#EBD4BD',
          height: '60%',
          borderRadius: 5,
          marginRight: 5,
        }}>
        <View
          style={{
            marginTop: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon style={{margin: 0}}>
            <User />
          </Icon>
        </View>
      </View>
    </View>
  );
};

export default ProfileAdd;
