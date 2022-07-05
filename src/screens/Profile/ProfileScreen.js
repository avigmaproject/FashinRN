import React, { useState, useEffect, useCallback } from "react"
import { View, Text, Platform,StyleSheet, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import {
  getUserCollection,
  getuserfavorite,
  addUserCollection,
  userprofile
} from "../../services/api.fuctions"
import ProfileImages from "../../components/ProfileImages"
import ProfileAdd from "../../components/ProfileAdd"
import { Dropdown } from "react-native-element-dropdown"
import AntDesign from "react-native-vector-icons/AntDesign"
import Modal from "../../components/UI/Modal"
import Button from "../../components/UI/Button"
import InputText from "../../components/UI/InputText"
import SpinnerBackdrop from "../../components/UI/SpinnerBackdrop"
import { useFocusEffect } from "@react-navigation/native";
const browan = "#593714"

const ProfileScreen = (props) => {
  const token = useSelector((state) => state.auth.userToken)
  const dispatch = useDispatch()
  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [addItemValue, setAddItemValue] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(null)
  const [selectedItem, setSelectedItem] = useState({})
  const [allPosts, setAllPosts] = useState([])
  const [userCollections, setUserCollections] = useState([])
  const [name, setname] = useState("")
  const [photo, setphoto] = useState("")
  const [lebal, setlebal] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const getUserData = async () => {
     setIsLoading(true);
    let data = {
      Type: 2
    }
    console.log(data,token)
    try {
      const res = await userprofile(data,token)
      console.log(res, "userdata is here.")
      const userData = res[0][0]
     setIsLoading(false);

      console.log( "Userdata ===>",userData)
      setname(userData.User_Name)
      setphoto(userData.User_Image_Path)
    } catch (error) {
      console.log(error)
      console.log("error", { e: error.response.data.error })
    }
  }
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
const addToUserCollection = (itemName) => {
     setIsLoading(true);

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
          setIsLoading(false);

          })
          .catch((err) => {
            setShowModal(false)
            console.log(err)
            setAddItemValue("")
          })
      }
    }
  }
const renderItem = (item) => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value !== -1 && (
            <TouchableOpacity onPress={()=>DeleteCollection(item.value )}>
            <AntDesign
              style={styles.icon}
              color="red"
              name="delete"
              size={20}     
            />
        </TouchableOpacity>
           )} 
        </View>
      );
    };
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
        setIsLoading(false)
        console.log("getUserCollection with type 444", res)
        const fetchedUserCollection = res
        console.log(res, token, "ProfileScreen getUserCollection")
        const collectionItems = fetchedUserCollection?.map((item) => {
          return { label: item.UC_Name, value: item.UC_PKeyID }
        })
        if(collectionItems.length > 0 ){
        console.log("profile post ...",collectionItems[0])
        getAllUserPost(collectionItems[collectionItems.length])
        }
        collectionItems?.push({ label: "Add +", value: -1 })
        setUserCollections(collectionItems.reverse())
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error, "getUserCollection")
      })
  })

  useEffect(() => {
    getUserCollectionItems()
    getUserData()
  }, [])
useFocusEffect(
    React.useCallback(() => {
    getUserCollectionItems()
    getUserData()
      return () => console.log("close");
    }, [])
  );

  const getAllUserPost = useCallback(async (item) => { 
setlebal(item.label)   
     setValue(item.value)
     setSelectedItem(item)
     setIsFocus(false)
    if (item.value === -1) {
      setShowModal(true)
      return 0
    }else{
 setIsLoading(true);
    const data = {
      UF_UC_PKeyID: item.value,
      Type: 4
    }
    console.log(data, "Data is here")
    await getuserfavorite(data, token)
      .then((res) => {
       
        const posts = res.data[0]
      console.log("minallllposts",posts)
        const postImages = posts.map((item) => {
          return { 
            url: item.UP_ImagePath, 
            id: item.UP_PKeyID,
            name:item.UP_Coll_Desc,
            product_url:item.UP_Product_URL
             }
        })
        setAllPosts(postImages)
        setIsLoading(false);

      })
      .catch((error) => {
        console.log(error, "getPost")
      })
      }
    
  })
 const itemValueInputChangeHandler = (text) => {
    setShowErrorMsg(null)
    setAddItemValue(text)
  }
const renderModal = () =>{
return (<View>
 <Modal isVisible={showModal}>
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
              textColor={browan}
              onPress={() => setShowModal(false)}
            />
            <Button
              style={{ width: 75, height: 50 }}
              text="Add"
              backgroundColor="#5B4025"
              // onPress={() => addToUserFav(addItemValue)}
              onPress={() => addToUserCollection(addItemValue)}

            />
          </View>
        </View>
      </Modal></View>)
}



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
        <SpinnerBackdrop showModal={isLoading} />

      <View
        style={{
          marginTop: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ProfileAdd name={name} photo={photo} />
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
        iconColor={browan}
        data={userCollections}
        autoScroll
        dropdownPosition="bottom"
        // search
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "My Collection" : "My Collection"}
        searchPlaceholder="Search..."
        value={value ? value : value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => getAllUserPost(item)}
        renderItem={renderItem}

      />
      </View>
      {/* {value !== -1 && (  <Text style={{ alignSelf: "center", color: "#264653", fontSize: 25 }}>
      {selectedItem.label}
        </Text>) } */}
      <ProfileImages   
        stackname="ProfileStack"      
        screenname="ProfileScreen"
        navigation={props.navigation} 
        name={lebal} 
        allImages={allPosts} />
      {renderModal()}
    </View>
  )
}

export default ProfileScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CDAF90",
    width: "86%",
    margin: 16,
    borderRadius: 8,
    color: browan
  },
  dropdown: {
    height: 50,
    borderColor: "#CDAF90",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#CDAF90",
    width:"90%"
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
