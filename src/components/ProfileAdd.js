import React from 'react';
import {View, Text, Image} from 'react-native';
import Icon from './UI/Icon';
import User from '../assets/svgs/user.svg';
const ProfileAdd = props => {
  return (
<>
    <View
      style={{
        // display: 'flex',
        flexDirection: 'row',
        width: '90%',
        // borderColor: '#D7C7B6',
        // borderWidth: 1,
        height: 70,
        // borderRadius: 8,
        alignItems: 'center',
        justifyContent: "flex-start",
        // backgroundColor: '#593714',
      }}>
      <View
        style={{
          width: '20%',
          height: '100%',
          backgroundColor: '#593714',justifyContent:"center",alignItems:"center"
        }}>
        <Image
          style={{
            width: '80%',
            height: '80%',            
            borderRadius: 3,
          }}
          source={{uri :props.photo}}
          alt="logo"
        />
       
      </View>
 <View style={{backgroundColor:"#AB8560", width: '60%',justifyContent:"center",alignItems:"center",
          height: '60%',}}><Text style={{alignSelf: 'center', color: '#D7C7B6',textTransform:"capitalize",fontSize:25}}>
          {"Profile"}
        </Text></View>

      {/* <View
        style={{
          width: '12%',
          backgroundColor: '#EBD4BD',
          height: '60%',
          borderRadius: 5,
          marginRight: 5,
        }}> */}
        {/* <View
          style={{
            marginTop: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon style={{margin: 0}}>
            <User />
          </Icon>
        </View> */}
      {/* </View> */}
    </View>
<View style={{justifyContent:"center",alignItems:"center",
         }}><Text style={{alignSelf: 'center', color: '#AB8560',textTransform:"capitalize",fontSize:25}}>
          {props.name}
        </Text></View>
</>
  );
};

export default ProfileAdd;
