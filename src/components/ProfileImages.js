import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';

const ProfileImages = props => {
  console.log("props.screenname",props.screenname);
  return (
    <ScrollView
      keyboardShouldPersistTaps={"always"}
      contentContainerStyle={{
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        flexGap: 20,
        paddingBottom: 110,
        // marginBottom: 100,
      }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {/* {data.map(item => {
          <Image source={item.path} />;
        })} */}
        {props.allImages?.map(item => {
          return (
            <TouchableOpacity
           onPress={()=>{ props.navigation.navigate("UserPostDetailsScreen", {
            imageUri: item.url,
            productUrl:item.product_url,
            name:props.name ? props.name : item.name,
            screenname:props.screenname,
            stackname:props.stackname
             })}}
              style={styles.imageStyle} key={item.id}>
              <Image
                style={styles.imageStyles}
                resizeMode="cover"
                source={{
                  uri: item.url,
                }}
                alt="logo"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 5,
  },
});

export default ProfileImages;
