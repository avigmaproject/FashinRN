import React from 'react';
import {View} from 'react-native';
import {signOut} from '../store/actions/authActions';
import Button from './UI/Button';
import {basecolor,secondrycolor,creamcolor,creamcolor1,black,white} from "../services/constant"
import { useDispatch, useSelector } from "react-redux"

const Logout = props => {
  const token = useSelector((state) => state.auth.userToken)

  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  };
 const Back = () => {
    dispatch(signOut());
  };
  return (
<View style={{ width: "90%", alignSelf: "center" }}>
    {token ? (<Button
      onPress={signOutHandler}
      text="Sign out"
      backgroundColor="#5B4025"
    />):(<Button
      onPress={Back}
      text="Go to Login"
      backgroundColor="#5B4025"
    />)}
    </View>
  );
};

export default Logout;
