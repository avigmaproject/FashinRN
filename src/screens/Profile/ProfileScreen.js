import React, { useState, useEffect, useCallback } from "react"
import { View, Text, Platform } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { getUserPost, getUserCollection } from "../../services/api.fuctions"
import Selection from "../../components/Selection"
import ProfileImages from "../../components/ProfileImages"
import ProfileAdd from "../../components/ProfileAdd"
import { setUserCollectionItems } from "../../store/actions/profileActions"

const ProfileScreen = (props) => {
  const userToken = useSelector((state) => state.auth.userToken)
  const userDetails = useSelector((state) => state.auth)
  const token = useSelector((state) => state.auth.userToken)
  const dispatch = useDispatch()

  const [selectedItem, setSelectedItem] = useState({})
  const [allPosts, setAllPosts] = useState([])
  const [userCollections, setUserCollections] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // console.log(!!selectedItem.value, 'checking');
  const dropDownSelectHandler = (item) => {
    setSelectedItem(item)
    // console.log(item)
    // console.log(selectedItem, "Hii")
  }
  const getUserCollectionItems = useCallback(async () => {
    setIsLoading(true)
    // const data = JSON.stringify({
    //   Type: 4
    // })
    const data = {
      Type: 4
    }
    console.log(data, token)
    await getUserCollection(data, token)
      .then((res) => {
        setIsLoading(false)
        console.log("getUserCollection with type 444", res)
        const fetchedUserCollection = res
        console.log(res, token, "ProfileScreen getUserCollection")
        const collectionItems = fetchedUserCollection?.map((item) => {
          return { label: item.UC_Name, value: item.UC_PKeyID }
        })
        collectionItems?.push({ label: "Add +", value: -1 })
        setUserCollections(collectionItems)
        dispatch(setUserCollectionItems(collectionItems))
        console.log("getUsercollectionItems", collectionItems)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error, "getUserCollection")
      })
  })

  useEffect(() => {
    getAllUserPost()
  }, [selectedItem])
  useEffect(() => {
    getUserCollectionItems()
  }, [])
  const getAllUserPost = useCallback(async () => {
    let data = JSON.stringify({
      Type: 8
    })
    if (!!selectedItem.value === true) {
      console.log("true")
      data = JSON.stringify({
        UP_COLL_PKeyID: selectedItem.value,
        Type: 5
      })
    }
    console.log(data, userToken, "profile screen send data is here")
    await getUserPost(data, userToken)
      .then((res) => {
        const posts = res.data
        // console.log(posts[0], " post is hereeee")
        const postImages = posts[0]?.map((item) => {
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
      <View
        style={{
          marginTop: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ProfileAdd />
      </View>
      <View
        style={{
          marginTop: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Selection
          changeHandler={dropDownSelectHandler}
          value={selectedItem?.value}
        />
      </View>
      <Text style={{ alignSelf: "center", color: "#264653", fontSize: 25 }}>
        {selectedItem.label}
      </Text>
      <ProfileImages allImages={allPosts} />
    </View>
  )
}

export default ProfileScreen
