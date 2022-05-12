import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';

const InputText = props => {
  // console.log(props.errorMsg, 'Inside');
  return (
    <View style={{marginTop: 20}}>
      <TextInput
        {...props}
        label={props.label}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        onSubmitEditing={props.onSubmitEditing}
        onBlur={props.onBlur}
        mode="outlined"
        outlineColor="#EBEBEB"
        ref={props.ref}
        activeOutlineColor="#5B4025"
        autoCapitalize="none"
        // dense
        style={{
          width: '100%',
          fontSize: 14,
          margin: 0,
          color: '#000000',
          ...props.style,
        }}
        theme={{
          colors: {
            placeholder: '#ACACAC',
            text: '#000',
            primary: '#0F0B56',
            underlineColor: 'transparent',
            background: '#FFFFFF',
          },
        }}
      />

      {props.errorMsg ? (
        <Text style={{color: 'red'}}>{props.errorMsg}</Text>
      ) : null}
    </View>
  );
};

export default InputText;
