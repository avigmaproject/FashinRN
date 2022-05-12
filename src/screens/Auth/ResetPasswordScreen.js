import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
// import Header from './components/Header';
import {Toast} from 'native-base';
import InputText from '../../components/UI/InputText';
import Button from '../../components/UI/Button';
import Icon from 'react-native-vector-icons/Entypo';
import SpinnerBackdrop from '../../components/UI/SpinnerBackdrop';
import {resetpassword} from '../../services/api.fuctions';
import {verifyPassword} from '../../shared/miscellaneous';

export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      cpassword: '',
      password: '',
      email: null,
      isLoading: false,
      hidePassword: true,
      hideConfirmPassword: true,
    };
  }

  managePasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  manageConfirmPasswordVisibility = () => {
    this.setState({hideConfirmPassword: !this.state.hideConfirmPassword});
  };

  componentDidMount() {
    console.log('restpassword', this.props.route.params.link);
    const {link} = this.props.route.params;
    const spliturl = link.split('/');
    console.log('spliturl', spliturl[4]);
    this.setState({email: spliturl[4]});
  }

  onHandleResetPassword = async () => {
    if (
      this.Validation() &&
      this.passwordCheck() &&
      this.checkPass(this.state.cpassword)
    ) {
      const {password, email} = this.state;
      this.setState({isLoading: true});
      if (email && password) {
        let data = {
          User_Email: email,
          Type: 5,
          User_Password: password,
          User_Type: 1,
        };
        console.log(data);
        await resetpassword(data)
          .then(res => {
            console.log('res: ', JSON.stringify(res));
            this.setState({isLoading: false});
            this.showMessage('Password Changed Successfully');
            setTimeout(() => {
              this.props.navigation.navigate('SuccessScreen');
            }, 2000);
          })
          .catch(error => {
            if (error.response) {
              this.showerrorMessage('Something went wrong!!!');
              console.log('responce_error', error.response);
              this.setState({isLoading: false});
            } else if (error.request) {
              this.showerrorMessage('Something went wrong!!!');
              this.setState({isLoading: false});
              console.log('request error', error.request);
            }
          });
      } else {
        this.showerrorMessage('Something went wrong!!!');
      }
    }
  };

  showerrorMessage = message => {
    if (message !== '' && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: 'bottom',
        status: 'error',
        duration: 5000,
        backgroundColor: '#CDAF90',
      });
    }
  };

  showMessage = message => {
    if (message !== '' && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: 'bottom',
        status: 'success',
        duration: 5000,
        backgroundColor: '#CDAF90',
      });
    }
  };

  warningMessage = message => {
    if (message !== '' && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: 'bottom',
        status: 'warning',
        duration: 5000,
        backgroundColor: '#CDAF90',
      });
    }
  };

  passwordCheck = () => {
    const {cpassword, password} = this.state;
    if (password !== cpassword) {
      this.warningMessage('Password does not match');
      return false;
    } else {
      return true;
    }
  };

  checkPass = password => {
    let cancel = false;
    if (verifyPassword(password)) {
      cancel = true;
      this.warningMessage(
        `Your password must be minimum 8 characters to 16 characters and must contain one uppercase, one digit and special character '?!@#$%^&*'`,
      );
    }
    if (cancel) {
      return false;
    } else {
      return true;
    }
  };

  Validation = () => {
    let cancel = false;
    if (this.state.password.length === 0) {
      cancel = true;
    }
    if (this.state.cpassword.length === 0) {
      cancel = true;
    }
    if (cancel) {
      this.showerrorMessage('Fields can not be empty');
      return false;
    } else {
      return true;
    }
  };

  render() {
    const {cpassword, password} = this.state;
    return (
      <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
        <SpinnerBackdrop showModal={this.state.isLoading} />
        <View
          style={{
            backgroundColor: '#ffffff',
            height: 75,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#0F0B56',
              fontSize: 24,
              lineHeight: 36,
              fontWeight: '600',
            }}>
            Reset Your Password!
          </Text>
        </View>
        <View style={{width: '80%', alignSelf: 'center'}}>
          <InputText
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChangeText={password => this.setState({password})}
            secureTextEntry={this.state.hidePassword}
          />
          <TouchableOpacity
            onPress={this.managePasswordVisibility}
            style={{
              position: 'absolute',
              right: 30,
              top: 20,
              zIndex: 1,
            }}>
            <Icon
              style={{marginTop: 20}}
              name={this.state.hidePassword ? 'eye-with-line' : 'eye'}
              size={30}
              color="#ACACAC"
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '80%', alignSelf: 'center'}}>
          <InputText
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            value={cpassword}
            onChangeText={cpassword => this.setState({cpassword})}
            secureTextEntry={this.state.hideConfirmPassword}
          />
          <TouchableOpacity
            onPress={this.manageConfirmPasswordVisibility}
            style={{
              position: 'absolute',
              right: 30,
              top: 20,
              zIndex: 1,
            }}>
            <Icon
              name={this.state.hideConfirmPassword ? 'eye-with-line' : 'eye'}
              size={30}
              style={{marginTop: 20}}
              color="#ACACAC"
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 35, width: '80%', alignSelf: 'center'}}>
          <Button
            text="Reset Password"
            backgroundColor="#5B4025"
            onPress={() => this.onHandleResetPassword()}
          />
        </View>
      </SafeAreaView>
    );
  }
}
