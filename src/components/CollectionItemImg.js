import React from "react"
import { View, TouchableOpacity, Image, Dimensions, Text } from "react-native"
import FeatherIcon from "react-native-vector-icons/Feather"
const CollectionItemImg = (props) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPressImage}>
        <Image
          style={{
            width: Dimensions.get("window").width / 2.6,
            height: Dimensions.get("window").width / 2,
            margin: 10,
            borderRadius: 10
          }}
          resizeMode="cover"
          source={props.source}
          alt="logo"
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
