import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/UI/Button';

export const SuccessPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
      <View style={{alignSelf: 'center', marginTop: 100}}>
        <Text
          style={{
            color: '#000000',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: '800',
          }}>
          Your password has been changed successfully!!
        </Text>
      </View>
      <View style={{marginTop: 30, width: '80%', alignSelf: 'center'}}>
        <Button
          text="Click here to login"
          backgroundColor="#5B4025"
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </View>
    </SafeAreaView>
  );
};
export default SuccessPage;
