import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Dimensions
} from "react-native"
import FeatherIcon from "react-native-vector-icons/Feather"
import { useSelector } from "react-redux"
import {
  createUpdateUserFavorite,
  getUserPost
} from "../../services/api.fuctions"
import Selection from "../../components/Selection"
import ProfileImages from "../../components/ProfileImages"
import CollectionItemImg from "../../components/CollectionItemImg"
import { BubblesLoader } from "react-native-indicator"

const UserPostsScreen = (props) => {
  const [selectedItem, setSelectedItem] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isAddingFav, setIsAddingFav] = useState(false)
  const [allPosts, setAllPosts] = useState([])

  const userToken = useSelector((state) => state.auth.userToken)
  useEffect(() => {
    getAllUserPost()
  }, [selectedItem])

  useEffect(() => {
    setSelectedItem(props.route.params.collectionItem)
  }, [props.route.params.collectionItem])

  const getAllUserPost = useCallback(async () => {
    setIsLoading(true)
    console.log(selectedItem.value, "Id is here")
    let data
    if (!!selectedItem.value === true) {
      console.log("I am right here")
      data = JSON.stringify({
        UP_COLL_PKeyID: selectedItem.value,
        Type: 5
      })
    }

    console.log(data, "userpost sent data is here")
    await getUserPost(data, userToken)
      .then((res) => {
        // const posts = res.data[1];

        const posts = res.data[0]
        // console.log(res.data, 'Hereeeee');
        // console.log(posts, ' userpost is hereeee')
        const postImages = posts.map((item) => {
          return {
            uri: item.UP_ImagePath,
            id: item.UP_PKeyID,
            productUrl: item.UP_Product_URL
          }
        })
        setIsLoading(false)
        setAllPosts(postImages)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error, "getPost")
      })
  })

  const onPressImgHandler = (image, productUrl) => {
    console.log(image)
    props.navigation.navigate("UserPostDetailsScreen", {
      imageUri: image,
      productUrl
    })
  }

  const onPressFavoriteHandler = async (postid) => {
    setIsAddingFav(true)
    console.log("Aded to favorite", postid)
    const favData = JSON.stringify({
      UF_PKey: 0,
      UF_UP_PKeyID: postid,
      Type: 1
    })
    console.log(favData, "Data is here")
    await createUpdateUserFavorite(favData, userToken)
      .then((res) => {
        setIsAddingFav(false)
        console.log(res, " fav res is hereeee")
      })
      .catch((error) => {
        setIsAddingFav(false)
        console.log(error, "createFav")
      })
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 0
      }}
    >
      <Text style={{ color: "#264653", fontSize: 22, marginVertical: 10 }}>
        {props.route.params.collectionItem.label}
      </Text>
      {/* <Text>{Dimensions.get('window').width / 2}</Text> */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          width: "100%",
          backgroundColor: "white",
          alignItems: "center",
          flexGap: 20,
          paddingBottom: 110
          // marginBottom: 100,
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {isLoading ? (
            <View
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <BubblesLoader size={50} color="black" dotRadius={10} />
            </View>
          ) : (
            allPosts?.map((img) => {
              return (
                <CollectionItemImg
                  key={img.id}
                  onPressImage={() =>
                    onPressImgHandler(img.uri, img.productUrl)
                  }
                  onAddCick={() => onPressFavoriteHandler(img.id)}
                  source={{ uri: img.uri }}
                />
              )
            })
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default UserPostsScreen
