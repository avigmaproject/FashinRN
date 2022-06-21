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
  // Clipboard
} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import SpinnerBackdrop from '../../components/UI/SpinnerBackdrop';
// import Header from './components/Header';
import {Toast} from 'native-base';
import InputText from '../../components/UI/InputText';
import Button from '../../components/UI/Button';
import {forgotpassword} from '../../services/api.fuctions';
import {basecolor,secondrycolor,creamcolor,creamcolor1,black,white} from "../../services/constant"

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      device: 1,
      isLoading: false,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.setState({
        device: 1,
      });
    } else {
      this.setState({
        device: 2,
      });
    }
  }
  generateLink = async () => {
    const link = await dynamicLinks().buildShortLink({
      link: `https://fashin.page.link/forgetpassword/${this.state.email}`,
      domainUriPrefix: 'https://fashin.page.link',
      ios: {
        bundleId: "com.FashinRN",
        appStoreId: "1621843840",
        fallbackUrl: "https://apps.apple.com/us/app/com.houseplant/id1621843840",
      },
      android: {
        packageName: 'com.fashin',
        fallbackUrl: 'https://play.google.com/store/apps/details?id=com.fashin',
      },
      navigation: {
        forcedRedirectEnabled: true,
      },
    });
    // Clipboard.setString(link)
    console.log(link);
    this.setState({link});
  };
  onHandleForgotPassword = async () => {
    await this.generateLink();
    const error = this.Validation();
    if (error) {
      const {email, link, device} = this.state;
      this.setState({isLoading: true});
      console.log(email, 'email');
      console.log(link, 'link');
      if (email && link) {
        let data = {
          EmailID: email,
          Type: 1,
          Email_Url: link,
          Device: device,
        };
        console.log(data);
        await forgotpassword(data)
          .then(res => {
            console.log('res: ', JSON.stringify(res));
            console.log('res:123', res[0].UserCode);
            this.setState({isLoading: false});
            if (res[0].UserCode === 'Sucesss') {
              console.log('successs');
              this.showMessage(
                'Link sent successfully. Please check your registered email.',
              );
            }
            if (res[0].UserCode === 'Error') {
              this.showerrorMessage('Please check your email.');
            }
          })
          .catch(error => {
            if (error.response) {
              console.log('responce_error', error.response);
              this.setState({isLoading: false});
            } else if (error.request) {
              this.setState({isLoading: false});
              console.log('request error', error.request);
            }
          });
      } else {
        this.showerrorMessage('Something went wrong!!!');
      }
    }
  };

  Validation = () => {
    let cancel = false;
    if (this.state.email.length === 0) {
      cancel = true;
    }
    if (cancel) {
      this.showerrorMessage('Fields can not be empty');
      return false;
    } else {
      return true;
    }
  };

  showerrorMessage = message => {
    if (message !== '' && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: 'bottom',
        status: 'error',
        duration: 5000,
        backgroundColor: secondrycolor,
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
        backgroundColor: secondrycolor,
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
        backgroundColor: secondrycolor,
      });
    }
  };

  render() {
    const {email} = this.state;
    return (
      <SafeAreaView style={{backgroundColor: white, flex: 1}}>
        <SpinnerBackdrop showModal={this.state.isLoading} />
        <View style={{marginTop: 30, width: '80%', alignSelf: 'center'}}>
          <Text style={{color: 'black', fontSize: 26}}>Reset Password</Text>
          <InputText
            label="Email Address"
            placeholder="Enter your Emal ID"
            onChangeText={email => this.setState({email})}
            value={email}
            onSubmitEditing={() => this.generateLink()}
            onBlur={() => this.generateLink()}
          />
        </View>

        <View style={{marginTop: 30, width: '80%', alignSelf: 'center'}}>
          <Button
            text="Send Link"
            backgroundColor={secondrycolor}
            onPress={() => this.onHandleForgotPassword()}
          />
        </View>
      </SafeAreaView>
    );
  }
}
