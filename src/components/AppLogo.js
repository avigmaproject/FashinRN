import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
const TopLogo = props => {
  return (
    <View>
      <Image
        style={{width: 350, height: 100,marginBottom:Platform.OS === "ios" ?  20 :0
}}
        resizeMode="cover"
        source={require('../assets/fashIN.png')}
        alt="logo"
      />
    </View>
  );
};

const style = StyleSheet.create({});

export default TopLogo;
