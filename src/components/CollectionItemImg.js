import React from "react"
import { View, TouchableOpacity, Image, Dimensions, Text ,ActivityIndicator} from "react-native"
import FeatherIcon from "react-native-vector-icons/Feather"
import SpinnerBackdrop from '../components/UI/SpinnerBackdrop';
import {BubblesLoader} from 'react-native-indicator';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux"

const height = Dimensions.get("window").width / 2
const width = Dimensions.get("window").width / 2.6
const CollectionItemImg = (props) => {
  const token = useSelector((state) => state.auth.userToken)

 const [showModal, setshowModal] = React.useState(false)
 const [url, seturl] = React.useState('')

React.useEffect(() => {
  seturl(props.source)
console.log(props.source,url , typeof props.source , typeof url)
  
}, [url])

const _onLoadEnd = () => {
   setshowModal(false)
  }
const _onLoadStart = () => {
setshowModal(true)
   
  }
  return (
    <View>
      {showModal &&  <View style={{ position:"absolute",  width: width +10,
            height: height +10,zIndex:111}}>
        <View style={{  width: width +10,
            height:  height +10,justifyContent:"center",alignItems:"center"}}><BubblesLoader size={20} color="rgb(89, 55, 20)" dotRadius={5} /></View>
         </View> }
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPressImage}>
        <FastImage
          onLoadStart={() =>_onLoadStart()}
          onLoadEnd={() => _onLoadEnd()}
          style={{

            width: width,
            height: height,
            margin: 10,
            borderRadius: 10
          }}
          source={{
          uri: url.uri,
          headers: {Authorization: token},
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}          
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onAddCick}
        activeOpacity={0.8}
        style={{
          backgroundColor: "white",
          elevation: 1,
          width: 40,
          height: 40,
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 160,
          left: 110,
          borderRadius: 20
        }}
      >
        <FeatherIcon name="plus" size={20} color="#264653" />
      </TouchableOpacity>
    </View>
  )
}

export default CollectionItemImg
