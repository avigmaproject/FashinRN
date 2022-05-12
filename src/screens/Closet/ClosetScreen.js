import React, { useState, useEffect, useCallback } from "react"
import { View, Text, Platform } from "react-native"
import { useSelector } from "react-redux"
import { getUserPost } from "../../services/api.fuctions"
import Selection from "../../components/Selection"
import ProfileImages from "../../components/ProfileImages"

const ClosetScreen = (props) => {
  const [selectedItem, setSelectedItem] = useState({})
  const [allPosts, setAllPosts] = useState([])
  // console.log(!!selectedItem.value, "Selected item is here")
  const dropDownSelectHandler = (item) => {
    setSelectedItem(item)
    console.log(item)
    console.log(selectedItem, "Hii")
  }

  const userToken = useSelector((state) => state.auth.userToken)
  useEffect(() => {
    getAllUserPost()
  }, [selectedItem])

  const getAllUserPost = useCallback(async () => {
    // console.log(props.route.params.collectionItem.value, 'Id is here');
    const data = JSON.stringify({
      UP_COLL_PKeyID: selectedItem.value,
      Type: 6
    })
    console.log(data, "Data is here")
    await getUserPost(data, userToken)
      .then((res) => {
        const posts = res.data[1]
        // console.log(posts, " post is hereeee")
        const postImages = posts.map((item) => {
          return { url: item.UP_ImagePath, id: item.UP_PKeyID }
        })
        setAllPosts(postImages)
      })
      .catch((error) => {
        console.log(error, "getPost")
      })
  })

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: "white",
        marginBottom: -10
      }}
    >
      <Text style={{ alignSelf: "center", color: "#264653", fontSize: 25 }}>
        My Closet
      </Text>
      <Selection
        changeHandler={dropDownSelectHandler}
        value={selectedItem?.value}
      />
      {!!selectedItem.value ? (
        <ProfileImages allImages={allPosts} />
      ) : (
        <Text style={{ color: "black", fontSize: 15 }}>
          Please select a collection from dropdown!
        </Text>
      )}
    </View>
  )
}

export default ClosetScreen
