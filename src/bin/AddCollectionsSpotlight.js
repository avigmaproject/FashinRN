import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FAB} from 'react-native-paper';
import InputText from '../../components/UI/InputText';
import Button from '../../components/UI/Button';
import CheckBox from '@react-native-community/checkbox';
import Selection from '../../components/Selection';
import {checkValidity} from '../../shared/utility';
import {uploadimage, createUpdateUserPost} from '../../services/api.fuctions';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerBackdrop from '../../components/UI/SpinnerBackdrop';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import {Select, Toast} from 'native-base';

const AddCollectionSpotlight = props => {
  const [isSpotlight, setSpotlight] = useState(false);
  const [isCloset, setCloset] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const userToken = useSelector(state => state.auth.userToken);

  const [inputValues, setInputValues] = useState({
    collectionName: {
      value: '',
      isItValid: false,
      rules: {
        required: true,
      },
      validationErrorMsg: '',
    },
    link: {
      value: '',
      isItValid: false,
      rules: {
        required: true,
      },
      validationErrorMsg: '',
    },
  });

  // const [state, setState] = useState({
  //   data: [],
  //   photo: '',
  //   loading: false,
  //   base64: '',
  //   filename: 'image',
  //   imagepath: '',
  //   value: null,
  //   items: [],
  // });
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [base64, setBase64] = useState('');
  const [filename, setFilename] = useState('image');
  const [imagepath, setImagepath] = useState('');
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const {navigation} = props;
  //   // console.log(navigation);
  //   let _unsubscribe = navigation.addListener('focus', async () => {
  //     GetImage();
  //   });
  //   return () => {
  //     _unsubscribe();
  //   };
  // });

  const options = [
    'Cancel',
    <View>
      <Text style={{color: 'black'}}>Gallery</Text>
    </View>,
    <View>
      <Text style={{color: 'black'}}>Camera</Text>
    </View>,
  ];

  const makeUserPost = async () => {
    if (ImageValidation()) {
      setLoading(true);
      let data = JSON.stringify({
        UP_PKeyID: 1,
        UP_ImageName: filename,
        UP_ImagePath: imagepath,
        UP_AddSpotlight: isSpotlight,
        UP_Closet: isCloset,
        UP_Product_URL: inputValues.link.value,
        UP_Coll_Desc: 'xyzabc',
        UP_IsFirst: true,
        UP_Number: 1,
        UP_UC_PKeyID: 1,
        UP_COLL_PKeyID: 1,
        UP_IsActive: 1,
        UP_IsDelete: 0,
        UP_Show: 1,
        Type: 1,
      });
      try {
        console.log(data, 'make post');

        const res = await createUpdateUserPost(data, userToken);
        console.log('post response :', res[0][0]);
        // if (res[0][0] === -99) {
        //   showerrorMessage('Email has already taken');
        // } else {
        //   showMessage('Profile Added');
        //   // props.navigation.navigate('Profiles');
        // }
        setLoading(false);
      } catch (error) {
        showerrorMessage(error.response.data.error_description);
      }
    }
  };

  // const GetImage = async () => {
  //   AsyncStorage.getItem('imagepath').then(res => {
  //     console.log(res);
  //     setPhoto(res);
  //   });
  // };

  const ImageValidation = () => {
    let cancel = false;
    if (!imagepath) {
      cancel = true;
    }
    if (cancel) {
      showerrorMessage('Upload Image');
      return false;
    } else {
      return true;
    }
  };

  const showerrorMessage = message => {
    if (message !== '' && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: 'bottom',
        status: 'error',
        duration: 5000,
        // backgroundColor: 'red.500',
      });
    }
  };

  const refActionSheet = useRef(null);

  const onOpenImage = () => {
    if (refActionSheet.current) {
      refActionSheet.current.show();
    }
  };

  // const onOpenImage = () => ActionSheet.show();

  const ImageGallery = async () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5,
      }).then(image => {
        console.log(image);
        if (image.data) {
          setBase64(image.data);
          const file =
            Platform.OS === 'ios' ? image.filename : 'image' + new Date();
          setFilename(file);
          console.log(filename);
          uploadImage();
        }
      });
    }, 700);
  };

  const ImageCamera = async () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        multiple: false,
        compressImageQuality: 0.5,
      }).then(image => {
        console.log(image);
        if (image.data) {
          setBase64(image.data);
          const file =
            Platform.OS === 'ios' ? image.filename : 'image' + new Date();
          setFilename(file);
          console.log(filename);
          uploadImage();
        }
      });
    }, 700);
  };

  const uploadImage = async () => {
    setLoading(true);
    let data = JSON.stringify({
      Type: 2,
      Image_Base: 'data:image/png;base64, ' + base64,
    });
    try {
      console.log(userToken, 'in upload image');
      const res = await uploadimage(data, userToken);
      console.log(res, 'res is here');
      console.log(res[0].Image_Path, 'resssss');

      setImagepath(res[0].Image_Path);
      setLoading(false);
    } catch (error) {
      if (error.request) {
        console.log(error.request);
      } else if (error.responce) {
        console.log(error.responce);
      } else {
        console.log(error);
      }
    }
  };

  // Functions related to validation

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

  return (
    <View style={{backgroundColor: '#593714', flex: 1}}>
      <SpinnerBackdrop showModal={loading} />
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <ScrollView
          style={{
            marginTop: 25,
            flexGrow: 1,
            width: '86%',
            alignSelf: 'center',
            paddingßBottom: 100,
          }}>
          <View>
            <View>
              <Image
                style={{
                  width: Dimensions.get('window').width / 1.16,
                  height: Dimensions.get('window').width / 1.16,
                  borderRadius: 10,
                }}
                resizeMode="cover"
                source={{
                  //   uri: imagepath ? imagepath : null,
                  uri: imagepath
                    ? imagepath
                    : 'https://www.unigreet.com/wp-content/uploads/2020/04/Dp-pic-download-833x1024.jpg',
                }}
              />
              <FAB
                icon="camera"
                style={{
                  position: 'absolute',
                  top: '80%',
                  left: '80%',
                  backgroundColor: 'white',
                }}
                onPress={() => onOpenImage()}
              />
            </View>
            <Text
              style={{
                color: '#264653',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 15,
              }}>
              Do you want to add?
            </Text>

            <Selection style={{width: '100%', alignSelf: 'center'}} />

            <View>
              <ActionSheet
                // ref={o => (this.ActionSheet = o)}
                ref={refActionSheet}
                title={
                  <Text
                    style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                    Profile Photo
                  </Text>
                }
                options={options}
                cancelButtonIndex={0}
                destructiveButtonIndex={4}
                useNativeDriver={true}
                onPress={index => {
                  if (index === 0) {
                    // cancel action
                  } else if (index === 1) {
                    ImageGallery();
                  } else if (index === 2) {
                    ImageCamera();
                  }
                }}
              />
            </View>
            <InputText
              label="Collection Name"
              onChangeText={text => inputChangeHandler('collectionName', text)}
              value={inputValues.collectionName.value}
              errorMsg={inputValues.collectionName.validationErrorMsg}
              placeholder="Enter your collection name"
              onBlur={() => {
                checkValidityHandler(
                  inputValues.collectionName.value,
                  inputValues.collectionName.rules,
                  'collectionName',
                );
              }}
            />
            <InputText
              label="From where to purchase"
              onChangeText={text => inputChangeHandler('link', text)}
              value={inputValues.link.value}
              errorMsg={inputValues.link.validationErrorMsg}
              placeholder="Enter your collection name"
              onBlur={() => {
                checkValidityHandler(
                  inputValues.link.value,
                  inputValues.link.rules,
                  'link',
                );
              }}
            />
            <Button
              style={{marginTop: 30, marginBottom: 120}}
              text="Save Collection"
              disabled={!isFormValid}
              backgroundColor={isFormValid ? '#5B4025' : '#826549'}
              onPress={() => makeUserPost()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  checkbox: {
    alignSelf: 'center',
    marginLeft: -5,
  },
  label: {
    margin: 5,
    color: '#264653',
    fontSize: 15,
  },
});

export default AddCollectionSpotlight;
