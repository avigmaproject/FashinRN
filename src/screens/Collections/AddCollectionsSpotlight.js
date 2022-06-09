import React, { Component } from "react"
import { connect } from "react-redux"
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
SafeAreaView
} from "react-native"
import { FAB } from "react-native-paper"
import { Select, Toast, Box } from "native-base"
import SpinnerBackdrop from "../../components/UI/SpinnerBackdrop"
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet"
import ImagePicker from "react-native-image-crop-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { verifyEmail } from "../../shared/miscellaneous"
import HeaderBack from "../../components/UI/BackButton"
import InputText from "../../components/UI/InputText"
import Button from "../../components/UI/Button"
import { uploadimage, createUpdateUserPost,getUserCollection,addUserCollection } from "../../services/api.fuctions"
import { checkValidity } from "../../shared/utility"
// import DropDown from '../../../../components/DropDown';
import Selection from "../../components/Selection"
import CheckBox from "@react-native-community/checkbox"
import { setUserCollectionItems } from "../../store/actions/profileActions"
import Modal from "../../components/UI/Modal"
import { Dropdown } from "react-native-element-dropdown"
import {basecolor,secondrycolor,creamcolor,creamcolor1,black,creamcolor2} from "../../services/constant"
import AntDesign from "react-native-vector-icons/AntDesign"

const options = [
  "Cancel",
  <View>
    <Text style={{ color: "black" }}>Gallery</Text>
  </View>,
  <View>
    <Text style={{ color: "black" }}>Camera</Text>
  </View>
]

class AddCollectionSpotlight extends Component {
  state = {
    data: [],
    photo: "",
    loading: false,
    targetCollectionItem: {},
    base64: "",
    filename: "image",
    imagepath: "",
    value: null,
    items: [],
    collectionName: {
      value: "",
      isItValid: false,
      rules: {
        required: true
      },
      validationErrorMsg: ""
    },
    link: {
      value: "",
      isItValid: false,
      rules: {
        required: true
      },
      validationErrorMsg: ""
    },
    isSpotlight: false,
    isClosetFalse: false,
    userCollections:[],
    selectedItem:{},
    value:null,
    isFocus:false,
    showModal:false,
    addItemValue:"",
    showErrorMsg:null,
    isLoading:false,
    allPosts:[]
  }

  inputChangeHandler = (inputName, text) => {
    this.setState((previousState) => ({
      [inputName]: {
        ...previousState[inputName],
        value: text
      }
    }))
  }
 validation = () => {
    let cancel = false
    if (this.state.addItemValue.length === 0) {
      cancel = true
    }
    if (cancel) {
      this.setState({showErrorMsg:"Fields can not be empty"})
      return false
    } else {
      return true
    }
  }
 renderLabel = () => {
    if (this.state.value || this.state.isFocus) {
      return (
        <Text style={[styles.label1, this.state.isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      )
    }
    return null
  }
  getUserCollectionItems = async () => {
    const {token} =this.props
    const data = {
      Type: 6
    }
    console.log(data, token)
    await getUserCollection(data, token)
      .then((res) => {
        console.log("getUserCollection with type 444", res)
        const fetchedUserCollection = res
        console.log(res, token, "ProfileScreen getUserCollection")
        const collectionItems = fetchedUserCollection?.map((item) => {
          return { label: item.UC_Name, value: item.UC_PKeyID }
        })
        collectionItems?.push({ label: "Add +", value: -1 })

        this.setState({userCollections:collectionItems.reverse()})
        console.log("getUsercollectionItems", collectionItems)
      })
      .catch((error) => {
        console.log(error, "getUserCollection")
      })
  }
  checkValidityHandler = (value, rules, inputName) => {
    let { isValid, errorMsg } = checkValidity(value, rules)
    if (!isValid) {
      if (inputName === "collectionName") {
        errorMsg = "Collection Name is required"
      } else {
        errorMsg = "Purchase link is required"
      }
      this.setState((previousState) => ({
        [inputName]: {
          ...previousState[inputName],
          isItValid: false,
          validationErrorMsg: `${errorMsg}`
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
  }

  componentDidMount() {
    const { navigation } = this.props
    this.getUserCollectionItems()
  }

  componentWillUnmount() {
    console.log("in WillUnmount")
  }

  // Validation = () => {
  //   let cancel = false
  //   const { name, email, imagepath } = this.state
  //   if (name.length === 0) {
  //     cancel = true
  //   }
  //   if (email.length === 0) {
  //     cancel = true
  //   }

  //   if (cancel) {
  //     this.showerrorMessage("Fields can not be empty")
  //     return false
  //   } else {
  //     return true
  //   }
  // }

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

  checkboxValidation = () => {
    let cancel = true
    if (this.state.isCloset || this.state.isSpotlight) {
      cancel = false
    }
    if (cancel) {
      this.showerrorMessage("You must select at least one checkbox")
      return false
    } else {
      return true
    }
  }

  checkOverallFormValidity = () => {
    let invalid = false
    if (this.state.link.value.trim() === "" ) {
      invalid = true

    }

    if (invalid) {
      this.showerrorMessage("Please provide purchase link.")
      return false
    } else {
      return true
    }
  }
  itemValueInputChangeHandler = (text) => {
      this.setState({showErrorMsg:null,addItemValue:text})
  }
 getAllUserPost = async (item) => {
        this.setState({showModal:false,value:item.value})
    if (item.value === -1) {
            this.setState({showModal:true})
      return
    }else{
 this.setState({
      targetCollectionItem: item
    })}
  
  }
 addToUserCollection = (itemName) => {
    if (this.validation()) {
      const data = {
        UC_Name: itemName,
        Type: 1,
        UC_Closet_Spotlight:1,
        UC_Show:true
      }
      console.log(data, "AddUserData")
      if (this.state.addItemValue.trim() != "") {
        addUserCollection(data, this.props.token)
          .then((res) => {
            console.log(res.data, "response is here")
            this.setState({showModal:false,addItemValue:""})
            this.getUserCollectionItems()
          })
          .catch((err) => {
            this.setState({showModal:false,addItemValue:""})
            console.log(err)
          })
      }
    }
  }

 renderModal= () =>{
return(
 <Modal isVisible={this.state.showModal}>
        <View
          style={{
            backgroundColor: "#ffffff",
            width: "92%",
            borderRadius: 10,
            minHeight: 220
          }}
        >
          <View style={{ height: 20, alignSelf: "center", marginTop: 18 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>Add Item</Text>
          </View>
          <View style={{ alignSelf: "center", width: "90%" }}>
            <InputText
              style={{ marginBottom: 10, width: "100%" }}
              label="Add Item"
              value={this.state.addItemValue}
              onChangeText={(text) => this.itemValueInputChangeHandler(text)}
              errorMsg={this.state.showErrorMsg}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              margin: 15
            }}
          >
            <Button
              style={{ width: 75, height: 50 }}
              text="Cancel"
              textColor="#593714"
              onPress={() => this.setState({showModal:false,addItemValue:""})}
            />
            <Button
              style={{ width: 75, height: 50 }}
              text="Add"
              backgroundColor="#5B4025"
              onPress={() => this.addToUserCollection(this.state.addItemValue)}
            />
          </View>
        </View>
      </Modal>
)}
checkUrlformate = () => {
 let invalid = false
let regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  invalid = regex.test(this.state.link.value)
    if (!invalid &&  !this.state.isCloset) {
      this.showerrorMessage("Please check url formate.")
      return false
    } else {
      return true
    }
  }
  createUserPost = async () => {
    const { imagepath } = this.state

    if (
      this.ImageValidation() &&
      this.checkboxValidation()  && this.checkUrlformate()
    ) {
      this.setState({
        // loading: true
      })
      console.log(this.state, "hereeeeee")
      let data = {
        UP_ImageName: this.state.filename,
        UP_ImagePath: this.state.imagepath,
        UP_AddSpotlight: this.state.isSpotlight,
        UP_Closet: this.state.isCloset,
        UP_Product_URL: this.state.link.value,
        UP_Coll_Desc: this.state.collectionName.value,
        UP_IsFirst: true,
        UP_Number: 1,
        UP_UC_PKeyID: this.state.targetCollectionItem.value,
        UP_IsActive: 1,
        UP_IsDelete: 0,
        UP_Show: 1,
        Type: 1,
        UP_IsAdmin:false,
      }
      try {
        console.log("=====>",data,this.props.token)
        const res = await createUpdateUserPost(data, this.props.token)
        console.log("ProfileRes:", res)
        if (!res) {
          this.showerrorMessage("Failed to add!")
        } else {
          this.showMessage("Collection saved successfully!")
          this.setState((prevState) => ({
            ...prevState,
            imagepath: "",
            isSpotlight: false,
            isClosetFalse: false,
            collectionName: {
              value: "",
              isItValid: false,
              rules: {
                required: true
              },
              validationErrorMsg: ""
            },
            link: {
              value: "",
              isItValid: false,
              rules: {
                required: true
              },
              validationErrorMsg: ""
            },
            isSpotlight: false,
            isClosetFalse: false
          }))
          // this.props.navigation.navigate('Profiles');
        }
        this.setState({
          loading: false
        })
      } catch (error) {
        this.showerrorMessage(error.response.data.error_description)
      }
    }
  }
 renderItem = (item) => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value !== -1 && (
            <TouchableOpacity onPress={()=>this.DeleteCollection(item.value )}>
            <AntDesign
              style={styles.icon}
              color="red"
              name="delete"
              size={20}     
            />
        </TouchableOpacity>
           )} 
        </View>
      );
    };
   DeleteCollection = (id) => {
    const {token} =this.props

      const data = {
        UC_PKeyID: id,
        Type: 4,
       
      }
      console.log("data", data)
        addUserCollection(data, token)
          .then((res) => {
            console.log(res.data)
            this.getUserCollectionItems()
          })
          .catch((err) => {
            console.log(err)
          })
      
    
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

  showMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: "bottom",
        status: "success",
        duration: 5000,
        backgroundColor: "#EBD4BD"
      })
    }
  }

  warningMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: "bottom",
        status: "warning",
        duration: 5000,
        backgroundColor: "#EBD4BD"
      })
    }
  }

  onOpenImage = () => this.ActionSheet.show()

  onPress = () => this.ActionSheet.show()
  ImageGallery = async () => {
    setTimeout(
      function () {
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: true,
          includeBase64: true,
          multiple: false,
          compressImageQuality: 0.7
        }).then((image) => {
          console.log(image);
          this.setState(
            {
              base64: image.data,
              fileName:
                Platform.OS === "ios" ? image.filename : "images" + new Date(),
              form: {
                ...this.state.form,
                imagePath: image.path
              },
              chnageimage: true
            },
            () => this.uploadImage(image.data)
          )
        })
      }.bind(this),
      1000
    )
  }
  ImageCamera = async () => {
    setTimeout(
      function () {
        ImagePicker.openCamera({
          width: 500,
          height: 500,
          cropping: true,
          includeBase64: true,
          multiple: false,
          compressImageQuality: 0.7
        }).then((image) => {
          this.setState(
            {
              base64: image.data,
              fileName:
                Platform.OS === "ios" ? image.filename : "images" + new Date(),
              form: {
                ...this.state.form,
                imagePath: image.path
              },
              chnageimage: true
            },
            () => this.uploadImage(image.data)
          )
        })
      }.bind(this),
      1000
    )
  }
  uploadImage = async (base64) => {
    this.setState({ loading: true })
    // const { base64 } = this.state
    let data = JSON.stringify({
      Type: 2,
      Image_Base: "data:image/png;base64, " + base64
    })
    console.log("base64" + base64)
    try {
      console.log(this.props.token, "in upload image")
      const res = await uploadimage(data, this.props.token)
      console.log(res[0].Image_Path, "resssss")

      this.setState({
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#593714",}}>
        <SpinnerBackdrop showModal={this.state.loading} />
       <View style={{justifyContent:"center",alignItems:"center"}}>
        <Image
        style={{width: 250, height: 100,marginVertical:10}}
        resizeMode="stretch"
        source={require('../../assets/users/fashINLogoDark.png')}
        alt="logo"
      />
      </View>
        <ScrollView
          style={{
            width: "100%",
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignSelf: "center",
            backgroundColor: "white"
          }}
        >
          <View style={{ alignSelf: "center", marginTop: 30 }}>
            {this.state.imagepath ? (<Image
              style={{
                width: Dimensions.get("window").width / 1.16,
                height: Dimensions.get("window").width / 1.16,
                borderRadius: 10
              }}
              resizeMode="cover"
              source={{
                uri: this.state.imagepath
              }}
            />) : ( <Image
              style={{
                width: Dimensions.get("window").width / 1.16,
                height: Dimensions.get("window").width / 1.16,
                borderRadius: 10,borderColor:"#D7C7B6",borderWidth:1
              }}
              resizeMode="contain"
              source={require('../../assets/users/fashINLogoLIght.png')}
              alt="logo"
      />)}
            
            <FAB
              icon="camera"
              style={{
                elevation: 1,
                position: "absolute",
                top: Dimensions.get("window").width / 1.5,
                left: Dimensions.get("window").width / 1.5,
                backgroundColor: "white"
              }}
              onPress={() => this.onPress()}
            />
          </View>

          <ActionSheet
            ref={(o) => (this.ActionSheet = o)}
            title={
              <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>
                Profile Photo
              </Text>
            }
            options={options}
            cancelButtonIndex={0}
            destructiveButtonIndex={4}
            // useNativeDriver={true}
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
            <View style={styles.checkboxContainer}>
              <CheckBox
                tintColors={{ true: {creamcolor}, false: "gray" }}
                value={this.state.isSpotlight}
                boxType="square"
                onCheckColor="#CDAF90"
                onTintColor="#CDAF90"
                onValueChange={() => {
                  this.setState((prev) => ({
                    isSpotlight: !prev.isSpotlight,
                    isCloset: false,

                  }))
                }}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Spotlight</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                tintColors={{ true: "#CDAF90", false: "#CDAF90" }}
                value={this.state.isCloset}
                onCheckColor="#CDAF90"
                onTintColor="#CDAF90"
                boxType="square"
                onValueChange={() =>
                  this.setState((prev) => ({
                    isCloset: !prev.isCloset,
                  isSpotlight:false,
                  }))
                }
                style={styles.checkbox}
              />
              <Text style={styles.label}>Closet</Text>
            </View>
            {this.state.isCloset ? (
            <>
                 {this.renderLabel()}
            <Dropdown
              style={[styles.dropdown, this.state.isFocus && { borderColor: "#593714" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={{ backgroundColor: "#EBD4BD" }}
              activeColor="#AB8560"
              showsVerticalScrollIndicator={false}
              iconColor="#593714"
              data={this.state.userCollections}
              autoScroll
              dropdownPosition="bottom"
              // search
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder={!this.state.isFocus ? "My Collection" : "My Collection"}
              searchPlaceholder="Search..."
              value={this.state.value}
              onFocus={() => this.setState({isFocus:true})}
              onBlur={() => this.setState({isFocus:false})}
              onChange={(item) => this.getAllUserPost(item)}
              renderItem={this.renderItem}

            /></>
            ) : null}
            {/* <InputText
              label="Post name"
              onChangeText={(text) =>
                this.inputChangeHandler("collectionName", text)
              }
              placeholder="Enter your post name"
              value={this.state.collectionName.value}
              errorMsg={this.state.collectionName.validationErrorMsg}
              onBlur={() => {
                this.checkValidityHandler(
                  this.state.collectionName.value,
                  this.state.collectionName.rules,
                  "collectionName"
                )
              }}
            /> */}
            {this.state.isSpotlight ? (
              <InputText
                label="From Where to Purchase"
                onChangeText={(text) => this.inputChangeHandler("link", text)}
                value={this.state.link.value}
                errorMsg={this.state.link.validationErrorMsg}
                placeholder="Enter purchase link"
                onBlur={() => {
                  this.checkValidityHandler(
                    this.state.link.value,
                    this.state.link.rules,
                    "link"
                  )
                }}
              />
            ):null}

            <View
              style={{
                marginTop: 30
              }}
            >
              <Button
                // onPress={registerUser}
                style={{ marginBottom: 140, height: 55 }}
                onPress={() => this.createUserPost()}
                text="Save Collection"
                // disabled={!isFormValid}
                backgroundColor="#5B4025"
              />
            </View>
          </View>
        {this.renderModal()}
        </ScrollView>
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
    width: "86%",
    marginHorizontal: "auto",
    marginTop: 20,
    alignSelf: "center"
  },
  login_header: {
    color: "black",
    fontSize: 32
  },
  checkboxContainer: {
    flexDirection: "row",
    marginRight: 10,
    marginVertical: 5
  },
  checkbox: {
    alignSelf: "center",
    marginLeft: -5,
    width: 20,
    height: 20
  },
  label: {
    marginHorizontal: 10,
    color: "#264653",
    fontSize: 15
  },
  dropdown: {
    height: 60,
    borderColor: "#D7C7B6",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#EBD4BD",
    width:"100%",marginTop: 23
  },
  icon: {
    marginRight: 5,
    color: "#593714"
  },
  label1: {
    position: "absolute",
    backgroundColor: "#D7C7B6",
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    display: "none"
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#593714"
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#593714"
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: "#593714",
    color: "#593714"
  },
item: {
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
textItem: {
      fontSize: 16,
    color: "#593714"

    },
    
})

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.userToken,
});

const mapDispatchToProps = {
  setUserCollectionItems
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCollectionSpotlight);
 