import React, {useState,useEffect} from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import qs from 'qs';

import InputText from './UI/InputText';
import Button from './UI/Button';
import {useSelector, useDispatch} from 'react-redux';
import {setToken} from '../store/actions/authActions';
import SpinnerBackdrop from './UI/SpinnerBackdrop';
import {checkValidity} from '../shared/utility';
import {login,register,requestUserPermission, getFcmToken} from '../services/api.fuctions';
import SocialMedia from './SocialMedia';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginManager, AccessToken, LoginButton } from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { AppleButton ,appleAuth} from '@invertase/react-native-apple-authentication';
const Signup = props => {
  const dispatch = useDispatch();
  const [fcmtoken, setfcmtoken] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [inputValues, setInputValues] = useState({
    firstName: {
      value: '',
      isItValid: false,
      rules: {
        required: true,
      },
      validationErrorMsg: '',
    },
    lastName: {
      value: '',
      isItValid: false,
      rules: {
        required: true,
      },
      validationErrorMsg: '',
    },
    email: {
      value: '',
      isItValid: false,
      rules: {
        required: true,
        isEmail: true,
      },
      validationErrorMsg: '',
    },
    password: {
      value: '',
      isItValid: false,
      rules: {
        required: true,
        minLength: 8,
      },
      validationErrorMsg: '',
    },
    confirmPassword: {
      value: '',
      isItValid: false,
      rules: {
        required: true,
      },
      validationErrorMsg: '',
    },
  });
  const [showMessage, setShowMessage] = useState('');
  // console.log(showMessage, 'Showmess');
  const inputChangeHandler = (inputName, text) => {
    const newInputValues = inputValues;
    newInputValues[inputName].value = text;
    setInputValues({
      ...newInputValues,
    });
    if (inputName === 'password') {
      checkValidityHandler(text, newInputValues[inputName].rules, inputName);
    }
    if (inputName === 'confirmPassword') {
      console.log('Here.....');
      if (newInputValues[inputName].value != inputValues.password.value) {
        newInputValues[inputName].validationErrorMsg = 'Password do not match';
        newInputValues[inputName].isItValid = false;
        setInputValues({
          ...newInputValues,
        });
        checkOverallFormValidity();
        // value.trim() !== ''
        if (newInputValues[inputName].value.trim() === '') {
          newInputValues[inputName].validationErrorMsg = 'Confirm password';
          newInputValues[inputName].isItValid = false;
          setInputValues({
            ...newInputValues,
          });
          checkOverallFormValidity();
        }
      } else {
        newInputValues[inputName].validationErrorMsg = '';
        newInputValues[inputName].isItValid = true;
        setInputValues({
          ...newInputValues,
        });
        checkOverallFormValidity();
      }
    }
  };

  const checkOverallFormValidity = () => {
    const inputKeys = Object.keys(inputValues);
    let overAllFormValidity = true;
    inputKeys.forEach(key => {
      overAllFormValidity = overAllFormValidity && inputValues[key].isItValid;
    });
    setIsFormValid(overAllFormValidity);
  };

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  const checkValidityHandler = (value, rules, inputName) => {
    let {isValid, errorMsg} = checkValidity(value, rules);
    if (!isValid) {
      const inputValueObj = inputValues[inputName];
      inputValueObj.validationErrorMsg = `${
        inputName === 'firstName'
          ? 'First name'
          : inputName === 'lastName'
          ? 'Last name'
          : capitalize(inputName)
      } ${errorMsg}`;
      inputValueObj.isItValid = false;
      const newInputValues = {...inputValues, [inputName]: inputValueObj};
      setInputValues(newInputValues);
    } else {
      const inputValueObj = inputValues[inputName];
      inputValueObj.validationErrorMsg = ``;
      inputValueObj.isItValid = true;
      const newInputValues = {...inputValues, [inputName]: inputValueObj};
      setInputValues(newInputValues);
    }
    checkOverallFormValidity();
  };

  const registerUser = async () => {
    setShowModal(true); //For Spinner Backdrop
    let data = qs.stringify({
      firstname: `${inputValues.firstName.value} ${inputValues.lastName.value}`,
      username: inputValues.email.value,
      password: inputValues.confirmPassword.value,
      clientid: 2,
      grant_type: 'password',
    });
    console.log(data);
    await register(data)
      .then(res => {
        setShowMessage('Login successfully');
        setShowModal(false); //For Spinner Backdrop
        console.log('res: ', res.access_token);
        dispatch(setToken(res.access_token));
      })
      .catch(error => {
        setShowModal(false);
        setShowMessage(error.response.data.error_description);
        console.log(error);
      });
  };

 const  FcmMessage = async () => {
    const authStatus = await requestUserPermission();
    if (authStatus) {
      const fcmtoken = await getFcmToken();
      if (fcmtoken) {
          setfcmtoken(fcmtoken)
      } else { alert("Something went wrong!!!!")  }
    } else {
    alert("Something went wrong!!!!")  
  };
}
const _onhadleGoogle = async () => {
    console.log("GoogleSignin", GoogleSignin);
    // await GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfoGoogleSignin", userInfo);
      console.log("idToken", userInfo.idToken);
      // alert(userInfo.idToken);
      let data = qs.stringify({
        grant_type: "password",
        username: userInfo.user.email,
        password: "",
        ClientId: 5,
        FirstName: `${userInfo.user.givenName} ${userInfo.user.familyName}`,
        Role: 2,
        User_Login_Type: 2,
     User_FB_GM_Token_val   : userInfo.idToken,
        User_Token_val: fcmtoken,
      });
      console.log("hiiiii", data);
      
      login(data).then((res) => {
        console.log("res: ", JSON.stringify(res));
        if (res) {
           setShowMessage('Login successfully');
               setShowModal(false); //For Spinner Backdrop
                console.log(res, 'LoginData is here');
               dispatch(setToken(res.access_token));
        }
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("SIGN_IN_CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("IN_PROGRESS");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        alert("GOOGLE_ERROR");
        alert(error);
        console.log(JSON.stringify(error));
      }
    }
  };
useEffect(() => {
    FcmMessage()
    GoogleSignin.configure({
            scopes: ["https://www.googleapis.com/auth/drive.readonly"],
            webClientId:
              "467243516590-tegq5pssuasme450fg0opiv2iq75q9b6.apps.googleusercontent.com",
            
          });    return () => {
        }
  }, [])
const initUser = async (token) => {
    console.log("initUser", token);

    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token=" +
        token
    )
      .then((response) => response.json())
      .then(async (json) => {
        console.log("****json****", json);
        let data = qs.stringify({
          grant_type: "password",
          username: json.email,
          password: "",
          ClientId: 5,
          FirstName: json.name,
          Role: 2,
          User_Login_Type: 3,
          User_FB_GM_Token_val: token,
          User_Token_val: fcmtoken,
        });
        console.log("hiiiii", data, json.picture.data.url);
        login(data).then((res) => {
          if (res) {
            console.log("inform user", res.access_token);
               setShowMessage('Login successfully');
               setShowModal(false); //For Spinner Backdrop
                console.log(res, 'LoginData is here');
               dispatch(setToken(res.access_token));
          }
        });
      })
      .catch((e) => {
        setShowModal(false)

        Promise.reject("ERROR GETTING DATA FROM FACEBOOK", e);
      });
  };
  const _onhadleFacebook = () => {
               setShowModal(true); //For Spinner Backdrop

    LoginManager.logInWithPermissions(["public_profile", "email"])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error("The user cancelled the request"));
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        initUser(data.accessToken);
      })
      .catch((error) => {
        setShowModal(false)
        const { code, message } = error;
        // console.log(JSON.stringify(error));
        // alert(message);
        console.log(`Facebook login fail with error: ${message} code: ${code}`);
        if (code === "auth/account-exists-with-different-credential") {
          Alert.alert(" Login Error! ", `${message}`, [{ text: "Ok" }], {
            cancelable: false,
          });
        }
      });
  };

async function _onhadleApple() {
               setShowModal(true); //For Spinner Backdrop

// Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;

  if(identityToken){
let data = qs.stringify({
          grant_type: "password",
          username: appleAuthRequestResponse.email,
          password: "",
          ClientId: 5,
          FirstName: "",
          Role: 2,
          User_Login_Type: 3,
          User_FB_GM_Token_val: appleAuthRequestResponse.identityToken,
          User_Token_val: fcmtoken,
        });
        console.log("hiiiii", data);
        login(data).then((res) => {
          if (res) {
            console.log("inform user", res.access_token);
               setShowMessage('Login successfully');
               setShowModal(false); //For Spinner Backdrop
                console.log(res, 'LoginData is here');
               dispatch(setToken(res.access_token));
          }}

        )}
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SpinnerBackdrop showModal={showModal} />
      <View style={styles.form_container}>
        <View>
          <Text style={styles.login_header}>Sign Up</Text>
        </View>
        <InputText
          label="First Name"
          onChangeText={text => inputChangeHandler('firstName', text)}
          value={inputValues.firstName.value}
          errorMsg={inputValues.firstName.validationErrorMsg}
          placeholder="Enter your first name"
          onBlur={() => {
            checkValidityHandler(
              inputValues.firstName.value,
              inputValues.firstName.rules,
              'firstName',
            );
          }}
        />
        <InputText
          label="Last Name"
          onChangeText={text => inputChangeHandler('lastName', text)}
          value={inputValues.lastName.value}
          errorMsg={inputValues.lastName.validationErrorMsg}
          placeholder="Enter your last name"
          onBlur={() => {
            checkValidityHandler(
              inputValues.lastName.value,
              inputValues.lastName.rules,
              'lastName',
            );
          }}
        />
        <InputText
          label="Email Address"
          onChangeText={text => inputChangeHandler('email', text)}
          value={inputValues.email.value}
          errorMsg={inputValues.email.validationErrorMsg}
          placeholder="Enter your email"
          onBlur={() => {
            checkValidityHandler(
              inputValues.email.value,
              inputValues.email.rules,
              'email',
            );
          }}
        />

        <InputText
          label="Password"
          onChangeText={text => inputChangeHandler('password', text)}
          value={inputValues.password.value}
          placeholder="Enter Your Password"
          onBlur={() => {
            checkValidityHandler(
              inputValues.password.value,
              inputValues.password.rules,
              'password',
            );
          }}
          secureTextEntry={true}
          errorMsg={inputValues.password.validationErrorMsg}
        />
        <InputText
          label="Confirm Password"
          onChangeText={text => inputChangeHandler('confirmPassword', text)}
          value={inputValues.confirmPassword.value}
          placeholder="Confirm Your Password"
          secureTextEntry={true}
          errorMsg={inputValues.confirmPassword.validationErrorMsg}
          onBlur={() => {
            inputChangeHandler(
              'confirmPassword',
              inputValues.confirmPassword.value,
            );
          }}
        />
        <Text style={{color: 'red'}}>{showMessage}</Text>
        <View
          style={{
            marginTop: 30,
          }}>
          <Button
            onPress={registerUser}
            text="Sign Up"
            disabled={!isFormValid}
            backgroundColor={isFormValid ? '#5B4025' : '#826549'}
          />
        </View>
        <View style={styles.bar_container}>
          <View style={styles.bar} />
          <View>
            <Text style={styles.or}>OR</Text>
          </View>
          <View style={styles.bar} />
        </View>
        <SocialMedia _onhadleApple = {_onhadleApple} _onhadleGoogle = {_onhadleGoogle} _onhadleFacebook={_onhadleFacebook}containerStyle={{...props.containerStyle}} />
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  form_container: {
    flex: 1,
    marginHorizontal: 'auto',
    width: '80%',
    marginHorizontal: 'auto',
    marginTop: 20,
  },
  login_header: {
    color: 'black',
    fontSize: 32,
  },
  bar_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  bar: {
    flex: 1,
    height: 1,
    backgroundColor: '#989FAA',
  },
  or: {
    width: 50,
    textAlign: 'center',
    color: '#B2AEAE',
  },
});

export default Signup;
