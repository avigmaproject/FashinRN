import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native"
import { useSelector } from "react-redux"
import {
  createUpdateUserFavorite,
  getUserPost,
  getUserCollection,
  addUserCollection
} from "../../services/api.fuctions"
import CollectionItemImg from "../../components/CollectionItemImg"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dropdown } from "react-native-element-dropdown"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../components/UI/Button"
import InputText from "../../components/UI/InputText"
import Modal from "../../components/UI/Modal"
import {BubblesLoader} from 'react-native-indicator';
const browan = "#593714"
const UserPostsScreen = (props) => {

 React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title:props.route.params.collectionItem.label,
    });
  }, []);
  const token = useSelector((state) => state.auth.userToken)

  const [selectedItem, setSelectedItem] = useState({})
  const [allPosts, setAllPosts] = useState([])
  const [userCollections, setUserCollections] = useState([])
  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalRENDER, setShowModalRENDER] = useState(false)
  const [addItemValue, setAddItemValue] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(null)
  const [Setbool, setSetbool] = useState(false)
  const [setId, setsetId] = useState(0)
  const [home, sethome] = useState(false)


  useEffect(() => {
    setSelectedItem(props.route.params.collectionItem)
      getAllUserPost()

    if(token){
      getAllUserPost()
      getUserCollectionItems()  
    }
    sethome(props.route.params.home)
  }, [selectedItem])

useFocusEffect(
    React.useCallback(() => {
      if(home && token){
        getAllUserPost()
        getUserCollectionItems()
      }
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
    setShowModal(true)
    const data = {
      Type: 5
    }
    await getUserCollection(data, token)
      .then((res) => {
        var collectionItems

        setShowModal(false)
        const fetchedUserCollection = res
        collectionItems = fetchedUserCollection?.map((item) => {
          return { label: item.UC_Name, value: item.UC_PKeyID }
        })
        collectionItems?.push({ label: "Add +", value: -1 })
        setUserCollections(collectionItems)
      })
      .catch((error) => {
        setShowModal(false)
        console.log(error, "getUserCollection")
      })
  })
 const _Openselection = (id) => {
    setsetId(id)
    setSetbool(!Setbool)
  }
  const getAllUserPost = useCallback(async () => {
    setShowModal(true)
    let data
    if (!!selectedItem.value === true) {
      data = {
        UP_COLL_PKeyID: selectedItem.value,
        Type: 5
      }
    await getUserPost(data, token)
      .then((res) => {
        if (res) {
          const posts = res.data[0]
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
          setShowModal(false)
        }

        setShowModal(false)
      })
      .catch((error) => {
        setShowModal(false)
        console.log(error, "getPost")
      })
    }
   
  })

  const DeleteCollection = (id) => {
      const data = {
        UC_PKeyID: id,
        Type: 4,
       
      }
      console.log("data", data)
        addUserCollection(data, token)
          .then((res) => {
            console.log(res.data)
            getUserCollectionItems()
          })
          .catch((err) => {
            setShowModal(false)
            console.log(err)
            setAddItemValue("")
          })
      
    
  }
  const onPressImgHandler = (image, productUrl,description,name) => {
sethome(false)
    props.navigation.navigate("UserPostDetailsScreen", {
      imageUri: image,
      productUrl,description,name,
      screenname:"UserPostsScreen",
      stackname:"HomeStack"

    })
  }
  const addToUserCollection = (itemName) => {
    if (validation()) {
    setShowModal(true)

      const data = {
        UC_Name: itemName,
        Type: 1,
        UC_Closet_Spotlight:2,
        UC_Show:true
      }
      if (addItemValue.trim() != "") {
        addUserCollection(data, token)
          .then((res) => {
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
      setShowModalRENDER(true)
      return 0
    }
    setShowModal(true)
    const favData = {
      UF_UC_PKeyID: item.value,
      UF_UP_PKeyID: setId,
      Type: 1,
      UC_Name: props.route.params.collectionItem.label,
      UF_IsDelete: 0,
      UF_Closet_Spotlight:1
    }
    // return 0
    await createUpdateUserFavorite(favData, token)
      .then((res) => {
        setShowModal(false)
        setSetbool(false)
        getUserCollectionItems()

      })
      .catch((error) => {
        setShowModal(false)
        console.log(error, "createFav")
      })
  }
  const renderItem = (item) => {
      console.log(item)
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value !== -1 && (
            <TouchableOpacity onPress={()=>DeleteCollection(item.value)}>
            <AntDesign
              style={styles.icon}
              color="red"
              name="delete"
              size={20}     
            /></TouchableOpacity>
           )} 
        </View>
      );
    };
 
 const itemValueInputChangeHandler = (text) => {
    setShowErrorMsg(null)
    setAddItemValue(text)
  }
const RenderModal =() => {
return( <Modal isVisible={showModalRENDER}>
        <View
          style={{  backgroundColor: "#ffffff", width: "92%",borderRadius: 10, minHeight: 220 }} >

          <View style={{ height: 20, alignSelf: "center", marginTop: 18 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>Add Item</Text>
          </View>
          <View style={{ alignSelf: "center", width: "90%" }}>
           <InputText
              style={{ marginBottom: 10, width: "100%", }}
              label="Add Item"
              value={addItemValue}
              onChangeText={(text) => itemValueInputChangeHandler(text)}
              errorMsg={showErrorMsg}/>
          </View>
          <View
            style={{ display: "flex",flexDirection: "row",justifyContent: "flex-end",margin: 15  }}>
            <Button
              style={{ width: 75, height: 50 }}
              text="Cancel"
              textColor="#593714"
              onPress={() => setShowModalRENDER(false)}
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

      {allPosts.length === 0 && !showModal &&(<View><Text style={{ color: "rgb(89, 55, 20)", fontWeight: "bold" ,fontSize:20}}>Collection Coming Soon....</Text></View>)}


           
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >


          {showModal ? (
           <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",height:"100%"
              }}
            >
              <BubblesLoader size={50} color={"rgb(89, 55, 20)"} dotRadius={10} />
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
                  {Setbool && setId === img.id && token &&(
                    <> 
                     {renderLabel()}  
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: browan }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      containerStyle={{ backgroundColor: "#EBD4BD" }}
                      activeColor="#AB8560"
                      showsVerticalScrollIndicator={false}
                      iconColor={browan}
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
                      renderItem={renderItem}

                    />

                  </>
                  
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
      {RenderModal()}

        </View>
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
    color: browan
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
    color: browan
  },
  selectedTextStyle: {
    fontSize: 16,
    color: browan
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: browan,
    color: browan
  },
item: {
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
 textItem: {
      fontSize: 16,
    color: browan

    },
})
export default UserPostsScreen
