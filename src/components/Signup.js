import React, {useState} from 'react';

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
import {register} from '../services/api.fuctions';
import SocialMedia from './SocialMedia';

const Signup = props => {
  // const isLoading = useSelector(state => {
  //   console.log(state);
  // });
  // console.log(isLoading);
  const dispatch = useDispatch();
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
        <SocialMedia containerStyle={{...props.containerStyle}} />
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
