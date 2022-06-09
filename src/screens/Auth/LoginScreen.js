import React, {useState, useRef, useEffect} from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
AppState
} from 'react-native';
import qs from 'qs';
import InputText from '../../components/UI/InputText';
import Button from '../../components/UI/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setToken} from '../../store/actions/authActions';
import { login, requestUserPermission, getFcmToken }  from '../../services/api.fuctions';
import SpinnerBackdrop from '../../components/UI/SpinnerBackdrop';
import {checkValidity} from '../../shared/utility';
import SocialMedia from '../../components/SocialMedia';
import { SafeAreaView } from 'react-native-safe-area-context';
import {basecolor,secondrycolor,creamcolor,creamcolor1,black,white} from "../../services/constant"
import { LoginManager, AccessToken, LoginButton } from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { AppleButton ,appleAuth} from '@invertase/react-native-apple-authentication';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const [appState, setappState] = useState("active")
  const [linkdata, setlinkdata] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [inputValues, setInputValues] = useState({
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
  });
const [fcmtoken, setfcmtoken] = useState("")
  const [showMessage, setShowMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  



  useEffect(() => {
    FcmMessage()
    GoogleSignin.configure({
            scopes: ["https://www.googleapis.com/auth/drive.readonly"],
            webClientId:
              "467243516590-tegq5pssuasme450fg0opiv2iq75q9b6.apps.googleusercontent.com",
            
          });    return () => {
        }
  }, [])

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


const _getInitialUrl = async () => {
    const url = dynamicLinks().onLink(handleDynamicLink);
  setlinkdata(url)
  };
 

  const _getInitialLink =  async () =>{
 await dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          console.log('Loginlink', link);
          this.props.navigation.navigate('ResetPasswordScreen', {
            link: link.url,
          });
        }
        console.log('Loginlinklink', link);
      });
}
useEffect(() => {
  _getInitialUrl();
    AppState.addEventListener('change', _handleAppStateChange);
   _getInitialLink()

  return () => {
       AppState.removeEventListener('change', _handleAppStateChange);

  }
}, [])



  const _handleAppStateChange = async nextAppState => {
    if (
      appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      _getInitialUrl();
    }
  };
  const handleDynamicLink = link => {
    props.navigation.navigate('ResetPasswordScreen', {link: link.url});
  };

 



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
        FirstName: userInfo.user.givenName + userInfo.user.familyName,
        Role: 2,
        User_Login_Type: 2,
        User_Token_val: userInfo.idToken,
        IMEI: fcmtoken,
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
  const inputChangeHandler = (inputName, text) => {
    const newInputValues = inputValues;
    newInputValues[inputName].value = text;
    setInputValues({
      ...newInputValues,
    });
    if (inputName === 'password') {
      checkValidityHandler(text, newInputValues[inputName].rules, inputName);
    }
  };

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  const checkValidityHandler = (value, rules, inputName) => {
    let {isValid, errorMsg} = checkValidity(value, rules);
    if (!isValid) {
      const inputValueObj = inputValues[inputName];
      inputValueObj.validationErrorMsg = `${capitalize(inputName)} ${errorMsg}`;
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
    const inputKeys = Object.keys(inputValues);
    let overAllFormValidity = true;
    inputKeys.forEach(key => {
      overAllFormValidity = overAllFormValidity && inputValues[key].isItValid;
    });
    setIsFormValid(overAllFormValidity);
  };
const initUser = async (token) => {
    console.log("initUser", token);
               setShowModal(true); //For Spinner Backdrop

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
          User_Token_val: token,
          IMEI: fcmtoken,
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
        Promise.reject("ERROR GETTING DATA FROM FACEBOOK", e);
      });
  };
  const _onhadleFacebook = () => {
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
          User_Token_val: appleAuthRequestResponse.identityToken,
          IMEI: fcmtoken,
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

  const loginUser = async () => {
    setShowModal(true); //For Spinner Backdrop
    let data = qs.stringify({
      username: inputValues.email.value,
      password: inputValues.password.value,
      clientid: 1,
      grant_type: 'password',
    });
    console.log(data);
    await login(data)
      .then(res => {
        setShowMessage('Login successfully');
        // console.log('res: ', res.access_token);
        setShowModal(false); //For Spinner Backdrop
        console.log(res, 'LoginData is here');
        dispatch(setToken(res.access_token));
      })
      .catch(error => {
        console.log(error, 'login');
        setShowModal(false); //For Spinner Backdrop

        if (
          error.response.data.error_description ===
          'The UserCode or password is incorrect.'
        ) {
          setShowMessage('username or password is incorrect');
          console.log('username or password is incorrect');
        } else {
          setShowMessage(error.response.data.error_description);
          console.log(error.response.data.error_description);
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SpinnerBackdrop showModal={showModal} />
      <View style={styles.form_container}>
        <View>
          <Text style={styles.login_header}>Login</Text>
        </View>
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
        {showMessage ? <Text style={{color: 'red'}}>{showMessage}</Text> : null}
        <TouchableOpacity
          style={{marginTop: 25, alignSelf: 'flex-end'}}
          onPress={() => {
            props.navigation.navigate('ForgotPasswordScreen');
          }}>
          <Text style={{color: basecolor}}>Forgot Password?</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 15,
          }}>
          <Button
            onPress={loginUser}
            text="Login"
            disabled={!isFormValid}
            backgroundColor={isFormValid ? basecolor : secondrycolor}
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
    backgroundColor: white,
    alignItems: 'center',
    height:"100%"
  },
  form_container: {
    width: '80%',
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
    backgroundColor: white,
    borderRadius: 500,
    // borderColor: 'red',
    elevation: 1,
  },
});

export default LoginScreen;
