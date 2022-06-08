import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {signOut} from '../store/actions/authActions';
import Button from './UI/Button';
import {basecolor,secondrycolor,creamcolor,creamcolor1,black,white} from "../services/constant"

const Logout = props => {
  const dispatch = useDispatch();
  const signOutHandler = () => {
    console.log('hell0');
    dispatch(signOut());
  };
  return (
    <Button
      onPress={signOutHandler}
      text="Sign out"
      backgroundColor="#5B4025"
    />
  );
};

export default Logout;
