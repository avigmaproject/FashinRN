import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Facebook from './../assets/social_media/facebook.svg';
import Google from './../assets/social_media/google.svg';
import Apple from './../assets/social_media/apple.svg';
const SocialMedia = props => {
  return (
    <View style={{...styles.socialmedia_container, ...props.containerStyle}}>
      <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
        <Facebook width={50} height={50} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
        <Google width={38} height={38} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} style={styles.socialButton}>
        <Apple width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  socialmedia_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 500,
    // borderColor: 'red',
    elevation: 1,
  },
});

export default SocialMedia;
