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
import { useSelector, useDispatch } from "react-redux"
import {
  createUpdateUserFavorite,
  getUserPost,
  getUserCollection,
  addUserCollection
} from "../../services/api.fuctions"
import Selection from "../../components/Selection"
import ProfileImages from "../../components/ProfileImages"
import CollectionItemImg from "../../components/CollectionItemImg"
import { BubblesLoader } from "react-native-indicator"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dropdown } from "react-native-element-dropdown"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../components/UI/Button"
import InputText from "../../components/UI/InputText"
import Modal from "../../components/UI/Modal"

const UserPostsScreen = (props) => {
 React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title:props.route.params.collectionItem.label,
    });
  }, []);
  const token = useSelector((state) => state.auth.userToken)

  const [selectedItem, setSelectedItem] = useState({})
  const [isAddingFav, setIsAddingFav] = useState(false)
  const [allPosts, setAllPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userCollections, setUserCollections] = useState([])
  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [addItemValue, setAddItemValue] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(null)
  const [Setbool, setSetbool] = useState(false)
  const [setId, setsetId] = useState(0)
 

  useEffect(() => {
    setSelectedItem(props.route.params.collectionItem)
getAllUserPost(props.route.params.collectionIte)
  }, [selectedItem])

useFocusEffect(
    React.useCallback(() => {
    getUserCollectionItems()
      return () => console.log("close");
    }, [])
  );
    const validation = () => {
      let cancel = false
        if (addItemValue.length === 0) {
          cancel = true
        }
        if (cancel) {
          setShowErrorMsg("Fields can not be empty")
          return false
        } else {
          return true
        }
      }
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      )
    }
    return null
  }
const getUserCollectionItems = useCallback(async () => {
    setIsLoading(true)
    const data = {
      Type: 5
    }
    console.log(data, token)
    await getUserCollection(data, token)
      .then((res) => {
        var collectionItems

        setIsLoading(false)
        console.log("getUserCollection with type 555", res)
        const fetchedUserCollection = res
        console.log(res, token, "ProfileScreen getUserCollection")
        collectionItems = fetchedUserCollection?.map((item) => {
          return { label: item.UC_Name, value: item.UC_PKeyID }
        })
        collectionItems?.push({ label: "Add +", value: -1 })

        setUserCollections(collectionItems)
        // dispatch(setUserCollectionItems(collectionItems))
        console.log("getUsercollectionItems", collectionItems)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error, "getUserCollection")
      })
  })
 const _Openselection = (id) => {
    setsetId(id)
    setSetbool(!Setbool)
  }
  const getAllUserPost = useCallback(async () => {
    setIsLoading(true)
    let data
    if (!!selectedItem.value === true) {
    console.log("getAllUserPostid",selectedItem.value)

      data = {
        UP_COLL_PKeyID: selectedItem.value,
        Type: 5
      }
    console.log("getAllUserPostdata",data)
    await getUserPost(data, token)
      .then((res) => {
        if (res) {
          const posts = res.data[0]
          console.log("user post",posts)
          const postImages = posts.map((item) => {
            return {
              uri: item.UP_ImagePath,
              id: item.UP_PKeyID,
              productUrl: item.UP_Product_URL,
              collectionid: item.UP_UC_PKeyID,
              description:item.UP_Coll_Desc,
              name:item.UC_Name
            }
          })
          setAllPosts(postImages)
          setIsLoading(false)
        }

        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error, "getPost")
      })
    }else{
      console.log("id not founddddd")
}
   
  })

  const onPressImgHandler = (image, productUrl,description,name) => {
    props.navigation.navigate("UserPostDetailsScreen", {
      imageUri: image,
      productUrl,description,name
    })
  }
  const addToUserCollection = (itemName) => {
    if (validation()) {
      const data = {
        UC_Name: itemName,
        Type: 1
      }
      console.log(data, "AddUserData")
      if (addItemValue.trim() != "") {
        addUserCollection(data, token)
          .then((res) => {
            console.log(res.data, "response is here")
            setShowModal(false)
            getUserCollectionItems()
            setAddItemValue("")
            setSetbool(false)

          })
          .catch((err) => {
            setShowModal(false)
            console.log(err)
            setAddItemValue("")
          })
      }
    }
  }

  const dropDownSelectHandler = async (item) => {
    setValue(item)
    setIsFocus(false)
    if (item.value === -1) {
      setShowModal(true)
      return 0
    }
    setIsAddingFav(true)
    console.log("Aded to favorite", item)
    const favData = {
      UF_UC_PKeyID: item.value,
      UF_UP_PKeyID: setId,
      Type: 1,
      UC_Name: props.route.params.collectionItem.label,
      UF_IsDelete: 0,
      UF_Closet_Spotlight:1
    }
    console.log(favData, "Data")
    // return 0
    await createUpdateUserFavorite(favData, token)
      .then((res) => {
        setIsAddingFav(false)
        console.log(res, " fav res is hereeee")
        setSetbool(false)
        getUserCollectionItems()

      })
      .catch((error) => {
        setIsAddingFav(false)
        console.log(error, "createFav")
      })
  }
 
 useFocusEffect(
    React.useCallback(() => {
     getAllUserPost()
    getUserCollectionItems()
      return () => console.log("close");
    }, [])
  );
  // const onPressFavoriteHandler = async (postid, collectionid) => {
  //   setIsAddingFav(true)
  //   console.log("Aded to favorite", postid)
  //   const favData = {
  //     UF_UC_PKeyID: collectionid,
  //     UF_UP_PKeyID: postid,
  //     Type: 1,
  //     UC_Name: props.route.params.collectionItem.label,
  //     UF_IsDelete: 0
  //   }
  //   console.log(favData, "Data is here")
  //   await createUpdateUserFavorite(favData, token)
  //     .then((res) => {
  //       setIsAddingFav(false)
  //       console.log(res, " fav res is hereeee")
  //     })
  //     .catch((error) => {
  //       setIsAddingFav(false)
  //       console.log(error, "createFav")
  //     })
  // }
 const itemValueInputChangeHandler = (text) => {
    setShowErrorMsg(null)
    setAddItemValue(text)
  }
const RenderModal =() => {
return( <Modal isVisible={showModal}>
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
              value={addItemValue}
              onChangeText={(text) => itemValueInputChangeHandler(text)}
              errorMsg={showErrorMsg}
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
              onPress={() => setShowModal(false)}
            />
            <Button
              style={{ width: 75, height: 50 }}
              text="Add"
              backgroundColor="#5B4025"
              onPress={() => addToUserCollection(addItemValue)}
            />
          </View>
        </View>
      </Modal>)}
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        marginTop:-30
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          width: "100%",
          backgroundColor: "white",
          alignItems: "center",
          flexGap: 20,
          paddingBottom: 110,
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
                <View>
                 <View
                  style={{
                    width: "80%",
                    position: "absolute",
                    zIndex: 111,
                    right: 0,
                    bottom: 60
                  }}
                >
                  {Setbool && setId === img.id && (
                    <> 
                     {renderLabel()}  
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: "#593714" }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      containerStyle={{ backgroundColor: "#EBD4BD" }}
                      activeColor="#AB8560"
                      showsVerticalScrollIndicator={false}
                      iconColor="#593714"
                      data={userCollections}
                      autoScroll
                      dropdownPosition="bottom"
                      // search
                      maxHeight={150}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? "Collection" : "Collection"}
                      searchPlaceholder="Search..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => dropDownSelectHandler(item)}
                    /></>
                    // <Selection
                    //   changeHandler={dropDownSelectHandler}
                    //   value={selectedItem?.value}
                    //   sid={post.id}
                    //   spotlight={true}
                    //   data={userCollections}
                    // />
                  )}
                </View>
                <CollectionItemImg
                  key={img.id}
                  onPressImage={() =>
                    onPressImgHandler(img.uri, img.productUrl,img.description,img.name)
                  }
                  onAddCick={() =>
                    _Openselection(img.id)
                  }
                  source={{ uri: img.uri }}
                />
              </View>
              )
            })
          )}
        </View>
{RenderModal()}

      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
 

 
 
  dropdown: {
    height: 50,
    borderColor: "#D7C7B6",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#EBD4BD"
  },
  icon: {
    marginRight: 5,
    color: "#593714"
  },
  label: {
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
  }
})
export default UserPostsScreen
