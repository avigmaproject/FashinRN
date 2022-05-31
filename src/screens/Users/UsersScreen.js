import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
SafeAreaView
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import {
  getUserPost,
  createUpdateUserFavorite,
  getUserCollection,
addUserCollection
} from "../../services/api.fuctions"
import { setUserCollectionItems } from "../../store/actions/profileActions"
import Button from "../../components/UI/Button"
import InputText from "../../components/UI/InputText"
import Modal from "../../components/UI/Modal"
import UserCard from "../../components/UserCard"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Dropdown } from "react-native-element-dropdown"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useFocusEffect } from "@react-navigation/native";
import SpinnerBackdrop from '../../components/UI/SpinnerBackdrop';


const UsersScreen = (props) => {
  const token = useSelector((state) => state.auth.userToken)
  const dispatch = useDispatch()
  const [allPosts, setAllPosts] = useState()
  const [Setbool, setSetbool] = useState(false)
  const [setId, setsetId] = useState(0)
  const [selectedItem, setSelectedItem] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userCollections, setUserCollections] = useState([])
  const [searchtext, setsearchtext] = useState(null)
  const [initaldata, setinitaldata] = useState([])
  const [filterdata, setfilterdata] = useState([])
  const [isAddingFav, setIsAddingFav] = useState(false)
  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [addItemValue, setAddItemValue] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(null)
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
const addToUserCollection = (itemName) => {
    if (validation()) {
      const data = {
        UC_Name: itemName,
        Type: 1,
        UC_Closet_Spotlight:2,
        UC_Show:true
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
    setValue(item.value)
    setIsFocus(false)
    if (item.value === -1) {
      setShowModal(true)
      return 0
    }
  else{
  setIsAddingFav(true)
    console.log("Aded to favorite", item)
    const favData = {
      UF_UC_PKeyID: item.value,
      UF_UP_PKeyID: setId,
      Type: 1,
      UC_Name: item.label,
      UF_IsDelete: 0,
      UF_Closet_Spotlight:  2
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
   
  }
  useEffect(() => {
    getAllUserPost()
    getUserCollectionItems()
  }, [])
 useFocusEffect(
    React.useCallback(() => {
     getAllUserPost()
    getUserCollectionItems()
      return () => console.log("close");
    }, [])
  );
  const getAllUserPost = useCallback(async () => {
    const data = {
      UP_AddSpotlight: true,
      Type: 7
    }
    console.log(data, "Data is here")
    await getUserPost(data, token)
      .then((res) => {
          console.log("spotliagt post",res)
        const posts = res.data[0]
        const mapedPosts = posts.map((item) => {
          return {
            uri: item.UP_ImagePath,
            // label: item.UP_Coll_Desc,
            label: item.Name,
            id: item.UP_PKeyID,
            description:item.UP_Coll_Desc,
            product_url:item.UP_Product_URL
          }
        })
        setAllPosts(mapedPosts)
        setinitaldata(mapedPosts)
        setfilterdata(mapedPosts)
      })
      .catch((error) => {
        console.log(error, "getPost")
      })
  })
  const _Openselection = (id) => {
    setsetId(id)
    setSetbool(!Setbool)
  }
const _OpenPost = (item) => {
//  uri: item.UP_ImagePath,
//             // label: item.UP_Coll_Desc,
//             label: item.Name,
//             id: item.UP_PKeyID,
//             description:item.UP_Coll_Desc,
//             product_url:item.UP_Product_URL
    props.navigation.navigate("UserPostDetailsScreen", {
            imageUri: item.uri,
            productUrl:item.product_url,description:item.description,
            name:item.label
             })

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
const searchText = (e) => {
  setsearchtext(e)
    let text = e.toLowerCase()
    let trucks = filterdata
    let inital = initaldata
    console.log(allPosts)

 let filteredName1 = trucks.filter((item) => {
      return  item.label !== null
    })
// return 0
    let filteredName = filteredName1.filter((item) => {
      return item.label.toLowerCase().match(text)
    })
    console.log("filteredName",filteredName)
    if (!text || text === '') {
    setAllPosts(inital)
    } else if (Array.isArray(filteredName)) {
          setAllPosts(filteredName)
    }
  }
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
        backgroundColor: "#593714",
        flex: 1,
      }}
    >
      <SpinnerBackdrop showModal={isLoading} />

      <View style={{justifyContent:"center",alignItems:"center"}}>
        <Image
        style={{width: 250, height: 100,marginTop:10}}
        resizeMode="stretch"
        source={require('../../assets/users/fashINLogoDark.png')}
        alt="logo"
      />
    </View>
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
          onChangeText={(search)=>searchText(search)}
          value={searchtext}
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

      <View style={{ width: "100%", height: "100%",paddingBottom:100 }}>
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
                    bottom: 120
                  }}
                >
                  {Setbool && setId === post.id && (
                    <> 
                     {renderLabel()}  
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: "#593714" }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      containerStyle={{ backgroundColor: "#CDAF90" }}
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
                      placeholder={!isFocus ? "My Collection" : "My Collection"}
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
                <UserCard
                  source={{ uri: post.uri }}
                  label={post.label}
                  key={post.id}
                  onpress={() => _Openselection(post.id)}
                  onpress1={() => _OpenPost(post)}

                />
              </View>
            )
          })}
          {RenderModal()}
        </ScrollView>
      </View>
    </SafeAreaView>
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
  }, 
  container: {
    backgroundColor: "#CDAF90",
    width: "86%",
    margin: 16,
    borderRadius: 8,
    color: "#593714"
  },
  dropdown: {
    height: 50,
    borderColor: "#CDAF90",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#CDAF90"
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

export default UsersScreen
