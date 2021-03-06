import React, { Component } from "react"
import { connect } from "react-redux"
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native"
import { FAB } from "react-native-paper"
import { Select, Toast } from "native-base"
import SpinnerBackdrop from "../../components/UI/SpinnerBackdrop"
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet"
import ImagePicker from "react-native-image-crop-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { verifyEmail } from "../../shared/miscellaneous"
// import HeaderBack from '../../../../components/HeaderBack';
import HeaderBack from "../../components/UI/BackButton"
import InputText from "../../components/UI/InputText"
import Button from "../../components/UI/Button"
import {
  uploadimage,
  addprofile,
  userprofile
} from "../../services/api.fuctions"
import { checkValidity } from "../../shared/utility"
import { SafeAreaView } from "react-native-safe-area-context"
// import DropDown from '../../../../components/DropDown';
import {basecolor,secondrycolor,creamcolor,creamcolor1,black,white} from "../../services/constant"

const options = [
  "Cancel",
  <View>
    <Text style={{ color: {black} }}>Gallery</Text>
  </View>,
  <View>
    <Text style={{ color: {black} }}>Camera</Text>
  </View>
]

class AddProfilePage extends Component {
  state = {
    data: [],
    photo: "",
    loading: false,
    base64: "",
    filename: "image",
    imagepath: "",
    value: null,
    items: [],
    firstName: {
      value: "",
      isItValid: false,
      rules: {
        required: true
      },
      validationErrorMsg: ""
    },
    lastName: {
      value: "",
      isItValid: false,
      rules: {
        required: true
      },
      validationErrorMsg: ""
    },
    email: {
      value: "",
      isItValid: false,
      rules: {
        required: true,
        isEmail: true
      },
      validationErrorMsg: ""
    },
    password: {
      value: "",
      isItValid: false,
      rules: {
        required: true,
        minLength: 8
      },
      validationErrorMsg: ""
    },
    confirmPassword: {
      value: "",
      isItValid: false,
      rules: {
        required: true
      },
      validationErrorMsg: ""
    },
    isFormValid: true
  }

  capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1)
  }

  inputChangeHandler = (inputName, text) => {
    this.setState((previousState) => ({
      [inputName]: {
        ...previousState[inputName],
        value: text
      }
    }))
    if (inputName === "password") {
      this.checkValidityHandler(text, this.state[inputName].rules, inputName)
    }
    if (inputName === "confirmPassword") {
 if (this.state[inputName].value === "") {
          this.setState((previousState) => ({
            [inputName]: {
              ...previousState[inputName],
              validationErrorMsg: "Confirm password",
              isItValid: false
            }
          }))

          this.checkOverallFormValidity()

        }else{
      console.log("Here.....")
      if (this.state.confirmPassword.value != this.state.password.value) {
        // this.setState((previousState) => ({
        //   [inputName]: {
        //     ...previousState[inputName],
        //     validationErrorMsg: "Password do not match",
        //     isItValid: false
        //   }
        // }))
        // this.checkOverallFormValidity()
        // value.trim() !== ''
       
      } else {
        this.setState((previousState) => ({
          [inputName]: {
            ...previousState[inputName],
            validationErrorMsg: "",
            isItValid: true
          }
        }))
        this.checkOverallFormValidity()
      }
    }}
    console.log(this.state.firstName.value, "insideHandler")
  }

  checkOverallFormValidity = () => {
    const inputKeys = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword"
    ]
    let overAllFormValidity = true
    inputKeys.forEach((key) => {
      overAllFormValidity = overAllFormValidity && this.state[key].isItValid
    })
    this.setState((prevState) => ({
      ...prevState,
      isFormValid: overAllFormValidity
    }))
  }

  checkValidityHandler = (value, rules, inputName) => {
    let { isValid, errorMsg } = checkValidity(value, rules)
    if (!isValid) {
      this.setState((previousState) => ({
        [inputName]: {
          ...previousState[inputName],
          isItValid: false,
          validationErrorMsg: `${
            inputName === "firstName"
              ? "First name"
              : inputName === "lastName"
              ? "Last name"
              : this.capitalize(inputName)
          } is ${errorMsg}`
        }
      }))
    } else {
      this.setState((previousState) => ({
        [inputName]: {
          ...previousState[inputName],
          isItValid: true,
          validationErrorMsg: ""
        }
      }))
    }
    this.checkOverallFormValidity()
    console.log(this.state, "Inside Validaton")
  }

  componentDidMount() {
    const { navigation } = this.props
    this._unsubscribe = navigation.addListener('focus', async () => {
    this.getUserData()
    });
  }

  componentWillUnmount() {
    console.log("in WillUnmount")
  }

  getUserData = async () => {
    // setData({loading: true});
    let data = {
      Type: 2
    }
    console.log(data, this.props.token)
    try {
      const res = await userprofile(data, this.props.token)
      const userData = res[0][0]
      console.log( "Userdata ===>",userData)
      if (userData) {
        this.setState((previousState) => ({
          ...previousState,
          imagepath: userData.User_Image_Path,
          email: {
            ...previousState.email,
            value: userData.User_Email
          },
          firstName: {
            ...previousState.firstName,
            value:userData.User_Name ?  userData.User_Name.split(" ")[0] : ""
          },
          lastName: {
            ...previousState.lastName,
            value: userData.User_Name ?  userData.User_Name.split(" ")[1] :""
          },
          password: {
            ...previousState.password,
            value: userData.User_Password
          },
          confirmPassword: {
            ...previousState.password,
            value: userData.User_Password
          }
        }))
      }
    } catch (error) {
      console.log(error)
      console.log("hihihihihihih", { e: error.response.data.error })
    }
  }

  Validation = () => {
    let cancel = false
    const { name, email } = this.state
    if (name.length === 0) {
      cancel = true
    }
    if (email.length === 0) {
      cancel = true
    }

    if (cancel) {
      this.showerrorMessage("Fields can not be empty.")
      return false
    } else {
      return true
    }
  }

  checkEmail = (email) => {
    let cancel = false
    if (verifyEmail(email)) {
      cancel = true
      this.warningMessage("Please enter valid email.")
    }
    if (cancel) {
      return false
    } else {
      return true
    }
  }

  ImageValidation = () => {
    let cancel = false
    if (!this.state.imagepath) {
      cancel = true
    }
    if (cancel) {
      this.showerrorMessage("Upload Image")
      return false
    } else {
      return true
    }
  }
  showerrorMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: "bottom",
        status: "error",
        duration: 5000,
        backgroundColor: "#EBD4BD"
      })
    }
  }
  AddProfile = async () => {
    if(this.state.confirmPassword.value != this.state.password.value){
      this.showerrorMessage("Password do not match")
      return 0
    }
    const { imagepath } = this.state
    if (this.checkEmail(this.state.email.value) && this.ImageValidation()) {
      this.setState({
        loading: true
      })
      let data = { 
        User_IsActive: 1,
        User_Email: this.state.email.value,
        User_Name: `${this.state.firstName.value} ${this.state.lastName.value}`,
        User_Image_Path: imagepath,
        User_Password:this.state.password.value,
        Type: 2,
        User_Type:1
      }
      try {
        const res = await addprofile(data, this.props.token)
        console.log("ProfileRes:", res[0][0])
        if (res[0][0] === -99) {
          this.showerrorMessage("Email has already taken")
        } else {
          this.showMessage("Profile updated successfully!")
        }
        this.setState({
          loading: false
        })
      } catch (error) {
        this.showerrorMessage(error.response.data.error_description)
      }
    }
  }

  showerrorMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: "bottom",
        status: "error",
        duration: 5000
        // backgroundColor: 'red.500',
      })
    }
  }

  showMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: "bottom",
        status: "success",
        duration: 5000
        // backgroundColor: 'red.500',
      })
    }
  }

  warningMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: "bottom",
        status: "warning",
        duration: 5000
      })
    }
  }

  onOpenImage = () => this.ActionSheet.show()

  ImageGallery = async () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5
      }).then((image) => {
        console.log(image)
        if (image.data) {
          this.setState(
            {
              base64: image.data,
              filename:
                Platform.OS === "ios" ? image.filename : "image" + new Date()
              // imagepath: image.path,
            },
            () => {
              this.uploadImage()
            }
          )
        }
      })
    }, 1000)
  }

  ImageCamera = async () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5
      }).then((image) => {
        console.log(image)
        if (image.data) {
          this.setState(
            {
              base64: image.data,
              filename:
                Platform.OS === "ios" ? image.filename : "image" + new Date()
              // imagepath: image.path,
            },
            () => {
              this.uploadImage()
            }
          )
        }
      })
    }, 1000)
  }

  uploadImage = async () => {
    this.setState({ loading: true })
    const { base64 } = this.state
    let data = JSON.stringify({
      Type: 2,
      Image_Base: "data:image/png;base64, " + base64
    })
    try {
      const res = await uploadimage(data, this.props.token)
      console.log(res[0].Image_Path, "resssss")
      this.setState({
        ...this.state,
        imagepath: res[0].Image_Path
      })
      this.setState({ loading: false })
    } catch (error) {
      if (error.request) {
        console.log(error.request)
      } else if (error.responce) {
        console.log(error.responce)
      } else {
        console.log(error)
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <SpinnerBackdrop showModal={this.state.loading} />
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View
            style={{ width: "90%", alignSelf: "center", paddingBottom: 140 }}
          >
            <View
              style={{
                width: 200,
                height: 200,
                backgroundColor: "black",
                borderRadius: 100,
                alignSelf: "center"
              }}
            >

              <Image
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 100
                }}
                resizeMode="cover"
                source={{
                  //   uri: this.state.imagepath ? this.state.imagepath : null,
                  uri: this.state.imagepath
                    ? this.state.imagepath
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"}}
              />

              <FAB
                small
                icon="camera"
                style={{
                  position: "absolute",
                  left: 150,
                  top: 140,
                  backgroundColor: "#BDBDBD"
                }}
                onPress={() => this.onOpenImage()}
              />
            </View>
            <ActionSheet
              ref={(o) => (this.ActionSheet = o)}
              title={
                <Text
                  style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}
                >
                  Profile Photo
                </Text>
              }
              options={options}
              cancelButtonIndex={0}
              destructiveButtonIndex={4}
              useNativeDriver={true}
              onPress={(index) => {
                if (index === 0) {
                  // cancel action
                } else if (index === 1) {
                  this.ImageGallery()
                } else if (index === 2) {
                  this.ImageCamera()
                }
              }}
            />

            <View style={styles.form_container}>
              <InputText
                label="First Name"
                onChangeText={(text) =>
                  this.inputChangeHandler("firstName", text)
                }
                value={this.state.firstName.value}
                errorMsg={this.state.firstName.validationErrorMsg}
                placeholder="Enter your first name"
                onBlur={() => {
                  this.checkValidityHandler(
                    this.state.firstName.value,
                    this.state.firstName.rules,
                    "firstName"
                  )
                }}
              />
              <InputText
                label="Last Name"
                onChangeText={(text) =>
                  this.inputChangeHandler("lastName", text)
                }
                value={this.state.lastName.value}
                errorMsg={this.state.lastName.validationErrorMsg}
                placeholder="Enter your last name"
                onBlur={() => {
                  this.checkValidityHandler(
                    this.state.lastName.value,
                    this.state.lastName.rules,
                    "lastName"
                  )
                }}
              />
              <InputText
                label="Email Address"
                onChangeText={(text) => this.inputChangeHandler("email", text)}
                value={this.state.email.value}
                errorMsg={this.state.email.validationErrorMsg}
                placeholder="Enter your email"
                editable={false}
                onBlur={() => {
                  this.checkValidityHandler(
                    this.state.email.value,
                    this.state.email.rules,
                    "email"
                  )
                }}
              />

              <InputText
                label="Password"
                onChangeText={(text) =>
                  this.inputChangeHandler("password", text)
                }
                value={this.state.password.value}
                placeholder="Enter Your Password"
                onBlur={() => {
                  this.checkValidityHandler(
                    this.state.password.value,
                    this.state.password.rules,
                    "password"
                  )
                }}
                secureTextEntry={true}
                errorMsg={this.state.password.validationErrorMsg}
              />
              <InputText
                label="Confirm Password"
                onChangeText={(text) =>
                  this.inputChangeHandler("confirmPassword", text)
                }
                value={this.state.confirmPassword.value}
                placeholder="Confirm Your Password"
                secureTextEntry={true}
                errorMsg={this.state.confirmPassword.validationErrorMsg}
                onBlur={() => {
                  this.inputChangeHandler(
                    "confirmPassword",
                    this.state.confirmPassword.value
                  )
                }}
              />
              <View
                style={{
                  marginTop: 30
                }}
              >
                <Button
                  // onPress={registerUser}
                  onPress={() => this.AddProfile()}
                  text="Save"
                  // disabled={!this.state.isFormValid}
                  backgroundColor={
                    this.state.isFormValid ? "#5B4025" : "#826549"
                  }
                  // disabled={!isFormValid}
                  // backgroundColor="#5B4025"
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center"
  },
  form_container: {
    flex: 1,
    marginHorizontal: "auto",
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 20,
    alignSelf: "center"
  },
  login_header: {
    color: "black",
    fontSize: 32
  },
  bar_container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30
  },
  bar: {
    flex: 1,
    height: 1,
    backgroundColor: "#989FAA"
  },
  or: {
    width: 50,
    textAlign: "center",
    color: "#B2AEAE"
  }
})

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.userToken,
});

const mapDispatchToProps = {
  
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProfilePage);