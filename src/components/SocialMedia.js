import React from 'react';
import {View, TouchableOpacity, StyleSheet,Platform} from 'react-native';

import Facebook from './../assets/social_media/facebook.svg';
import Google from './../assets/social_media/google.svg';
import Apple from './../assets/social_media/apple.svg';

const SocialMedia = props => {
const [show, setshow] = React.useState(false)
React.useEffect(() => { 
  let Version =parseInt(Platform.Version,10)
      if(Version >13 ){
          setshow(true)
        }
  }, [])
  return (
    <View style={{...styles.socialmedia_container, ...props.containerStyle}}>
      <TouchableOpacity onPress={props._onhadleFacebook} activeOpacity={0.8} style={styles.socialButton}>
        <Facebook width={50} height={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={props._onhadleGoogle} activeOpacity={0.8} style={styles.socialButton}>
        <Google width={38} height={38} />
      </TouchableOpacity>
      {Platform.OS === 'android'  && show? (null) : (<TouchableOpacity onPress={props._onhadleApple} activeOpacity={0.8} style={styles.socialButton}>
        <Apple width={40} height={40} />
      </TouchableOpacity>)}
      
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default SocialMedia;
