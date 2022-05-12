import React from 'react';
import {Touchable, TouchableOpacity, View} from 'react-native';

const Icon = props => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={{margin: 20, ...props.style}}>
      {props.children}
    </TouchableOpacity>
  );
};

export default Icon;
