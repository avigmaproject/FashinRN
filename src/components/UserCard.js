import React from "react"
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native"
import FeatherIcon from "react-native-vector-icons/Feather"

const UserCard = (props) => {
  // console.log(props.source);
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 340, height: 340, borderRadius: 5 }}
          source={props.source}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardFooter}>
        <Text style={{ color: "black", margin: 15, fontSize: 16 }}>
          {props.label ? props.label : "Hello"}
        </Text>
      </View>

      <TouchableOpacity
        onPress={props.onpress}
        activeOpacity={0.9}
        style={{
          backgroundColor: "#EBD4BD",
          borderRadius: 30,
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 270,
          left: 270
        }}
      >
        <View style={{}}>
          <FeatherIcon name="plus" size={35} color="#593714" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 340,
    height: 300,
    backgroundColor: "blue",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  cardFooter: {
    width: 340,
    height: 60,
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
})

export default UserCard
