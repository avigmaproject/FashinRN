import React from "react"
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions
} from "react-native"
import CheckBox from "@react-native-community/checkbox"

const CollectionItem = (props) => {
  const windowWidth = Dimensions.get("window").width / 3.5
  // console.log(windowWidth);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.collectionItem,
        backgroundColor: props.backgroundColor
      }}
      onPress={props.onPress}
    >
      <Text style={styles.collectionItemText}>{props.label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  collectionItem: {
    width: Dimensions.get("window").width / 3.52,
    height: 50,
    backgroundColor: "#99795B",
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    alignSelf: "flex-start"
  },
  collectionItemText: {
    color: "#ffffff",
    padding: 5
  }
})

export default CollectionItem
