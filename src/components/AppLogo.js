import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import FashionLogoLight from '../assets/svgs/FashionLogoLight.svg';
import FashionLogoDark from '../assets/svgs/FashionLogoDark.svg';
const TopLogo = props => {
  return (
    <View>
      <Image
        style={{width: 200, height: 70}}
        resizeMode="cover"
        source={require('../assets/fashIN.png')}
        alt="logo"
      />
      {/* {props.variant === 'dark' ? (
          <FashionLogoDark height={65} width={150} />
        ) : (
          <FashionLogoLight height={65} />
        )} */}
    </View>
  );
};

const style = StyleSheet.create({});

export default TopLogo;
