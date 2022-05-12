import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native"
import { useSelector } from "react-redux"
import { getUserPost } from "../../services/api.fuctions"
import Selection from "../../components/Selection"

import UserCard from "../../components/UserCard"
import Ionicons from "react-native-vector-icons/Ionicons"

const UsersScreen = (props) => {
  const [allPosts, setAllPosts] = useState()
  const [Setbool, setSetbool] = useState(false)
  const [setId, setsetId] = useState(0)
  const [selectedItem, setSelectedItem] = useState({})

  const dropDownSelectHandler = (item) => {
    setSelectedItem(item)
    console.log(item)
    console.log(selectedItem, "Hii")
  }
  const userToken = useSelector((state) => state.auth.userToken)
  useEffect(() => {
    getAllUserPost()
  }, [])

  const getAllUserPost = useCallback(async () => {
    const data = JSON.stringify({
      UP_AddSpotlight: true,
      Type: 7
    })
    console.log(data, "Data is here")
    await getUserPost(data, userToken)
      .then((res) => {
        const posts = res.data[0]
        const mapedPosts = posts.map((item) => {
          return {
            uri: item.UP_ImagePath,
            label: item.UP_Coll_Desc,
            id: item.UP_PKeyID
          }
        })
        setAllPosts(mapedPosts)
        // console.log(posts, " post is hereeee")
      })
      .catch((error) => {
        console.log(error, "getPost")
      })
  })
  const _Openselection = (id) => {
    setsetId(id)
    setSetbool(true)
  }
  return (
    <View
      style={{
        backgroundColor: "#593714",
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 20 : 0
      }}
    >
      <View style={styles.sectionStyle}>
        <TextInput
          style={{
            flex: 1,
            color: "#5B4025",
            backgroundColor: "#CDAF90",
            height: 50,
            borderRadius: 10,
            margin: 10
          }}
          selectionColor="#5B4025"
          placeholder="Search Here"
          placeholderTextColor="#5B4025"
          underlineColorAndroid="transparent"
        />
        <View style={{ backgroundColor: "#CDAF90", marginRight: 10 }}>
          <Ionicons name="search" size={25} color="#593714" />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#704c2c",
          width: 200,
          alignSelf: "center",
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 5,
          margin: 10
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            marginVertical: 15,
            alignSelf: "center"
          }}
        >
          Spotlight
        </Text>
      </View>

      <View style={{ width: "100%", height: "100%" }}>
        <ScrollView
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}
        >
          {allPosts?.map((post) => {
            return (
              <View>
                <View
                  style={{
                    width: "50%",
                    position: "absolute",
                    zIndex: 111,
                    right: 0,
                    bottom: 100
                  }}
                >
                  {Setbool && setId === post.id && (
                    <Selection
                      changeHandler={dropDownSelectHandler}
                      value={selectedItem?.value}
                    />
                  )}
                </View>
                <UserCard
                  source={{ uri: post.uri }}
                  label={post.label}
                  key={post.id}
                  onpress={() => _Openselection(post.id)}
                />
              </View>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  spotlightTitleContainer: {
    width: 200,
    height: 60,
    backgroundColor: "#99795B",
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 5,
    marginTop: 10
  },
  spotlightTitle: {
    color: "#ffffff",
    fontSize: 20,
    margin: 15
  },
  cardContainer: {
    width: "100%",
    flexGrow: 1,
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 260
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CDAF90",
    borderColor: "#000",
    height: 55,
    borderRadius: 10,
    margin: 10,
    width: "90%",
    alignSelf: "center"
  }
})

export default UsersScreen
