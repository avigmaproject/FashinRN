import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BackButton = props => {
  return (
    <TouchableOpacity
onPress={props.onPress}
      activeOpacity={0.9}
      {...props}
      style={{
        width: 25,
        height: 25,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : '#523D1C',
        borderRadius: 5,
        alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <View style={{marginBottom: 1}}>
        <FontAwesome
          name="angle-left"
          size={22}
          color={props.iconColor ? props.iconColor : '#ffffff'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
