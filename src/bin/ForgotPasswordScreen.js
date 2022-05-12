import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import InputText from '../../components/UI/InputText';
import Button from '../../components/UI/Button';
import SpinnerBackdrop from '../../components/UI/SpinnerBackdrop';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {checkValidity} from '../../shared/utility';

const ForgotPasswordScreen = props => {
  // const isLoading = useSelector(state => {
  //   console.log(state);
  // });
  // console.log(isLoading);
  const dispatch = useDispatch();
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
  });
  const [showMessage, setShowMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  //   generateLink = async () => {
  //     const link = await dynamicLinks().buildShortLink({
  //       link: `https://celsell.page.link/forgetpassword/${inputValues.email.value}`,
  //       domainUriPrefix: 'https://celsell.page.link',
  //       // ios: {
  //       //   bundleId: "com.avigma.communv",
  //       //   appStoreId: "1579823021",
  //       //   fallbackUrl: "https://apps.apple.com/us/app/com.houseplant/id1535962213",
  //       // },
  //       android: {
  //         packageName: 'com.fasin',
  //         fallbackUrl:
  //           'https://play.google.com/store/apps/details?id=com.fashin',
  //       },
  //       navigation: {
  //         forcedRedirectEnabled: true,
  //       },
  //     });
  //     // console.log(link);
  //     // this.setState({link});
  //   };

  const inputChangeHandler = (inputName, text) => {
    const newInputValues = inputValues;
    newInputValues[inputName].value = text;
    setInputValues({
      ...newInputValues,
    });
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

  const forgotPasswordHandler = async () => {
    setShowModal(true); //For Spinner Backdrop
    let data = qs.stringify({
      username: inputValues.email.value,
      clientid: 1,
      grant_type: 'password',
    });
    console.log(data);
    await login(data)
      .then(res => {
        setShowMessage('Login successfully');
        console.log('res: ', res.access_token);
        setShowModal(false); //For Spinner Backdrop

        AsyncStorage.setItem('token', res.access_token);
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
          <Text style={styles.reset_header}>Reset Password</Text>
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
        <Text style={{color: 'red'}}>{showMessage}</Text>
        <View
          style={{
            marginTop: 30,
          }}>
          <Button
            onPress={forgotPasswordHandler}
            text="Reset Password"
            disabled={!isFormValid}
            backgroundColor={isFormValid ? '#5B4025' : '#826549'}
          />
        </View>
        {/* <View style={styles.bar_container}>
          <View style={styles.bar} />
          <View>
            <Text style={styles.or}>OR</Text>
          </View>
          <View style={styles.bar} />
        </View>
        <SocialMedia containerStyle={{...props.containerStyle}} /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  reset_header: {
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
    backgroundColor: '#FFFFFF',
    borderRadius: 500,
    // borderColor: 'red',
    elevation: 1,
  },
});

export default ForgotPasswordScreen;
