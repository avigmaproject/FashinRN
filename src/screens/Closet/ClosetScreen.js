import React, { useState, useEffect, useCallback } from "react"
import { View, Text ,StyleSheet,Image,SafeAreaView} from "react-native"
import { useSelector } from "react-redux"
import { getUserPost ,addUserCollection,getUserCollection,getuserfavorite} from "../../services/api.fuctions"
import Selection from "../../components/Selection"
import ProfileImages from "../../components/ProfileImages"
import { Dropdown } from "react-native-element-dropdown"
import AntDesign from "react-native-vector-icons/AntDesign"
import InputText from "../../components/UI/InputText"
import Button from "../../components/UI/Button"
import Modal from "../../components/UI/Modal"
import SpinnerBackdrop from "../../components/UI/SpinnerBackdrop"

const ClosetScreen = (props) => {
  const token = useSelector((state) => state.auth.userToken)
  const [userCollections, setUserCollections] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [allPosts, setAllPosts] = useState([])
  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [addItemValue, setAddItemValue] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
      getUserCollectionItems()
  }, [selectedItem])

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

  // const addToUserFav = (itemName) => {
  //   console.log("addToUserFav", itemName, props.sid)
  //   if (validation()) {
  //     const data = {
  //       UF_UC_PKeyID: 0,
  //       UF_UP_PKeyID: props.sid,
  //       Type: 1,
  //       UC_Name: itemName,
  //       UF_IsDelete: 0,
  //       UF_Closet_Spotlight: props.spotlight ? 2 : 1
  //     }
  //     console.log("data", data)
  //     if (addItemValue.trim() != "") {
  //       addUserCollection(data, token)
  //         .then((res) => {
  //           // console.log(res.data)
  //           getUserCollectionItems()
  //           setShowModal(false)
  //         })
  //         .catch((err) => {
  //           setShowModal(false)
  //           console.log(err)
  //           setAddItemValue("")
  //         })
  //     }
  //   }
  // }

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

  const getAllUserPost = useCallback(async (item) => {
 setValue(item.value)
    setIsFocus(false)
    if (item.value === -1) {
      setShowModal(true)
      return
    }
    setSelectedItem(item)
console.log("item.value,",item.value,)
    const data = {
      UP_UC_PKeyID: parseInt(item.value),
      Type: 12//4
    }
    console.log( "Data is here",data,token)
    // await getuserfavorite(data, token)

    await getUserPost(data, token).then((res) => {
        const posts = res.data[0]
        console.log("setAllPostssetAllPosts",res)
        console.log("setAllPosts",posts)

        const postImages = posts.map((item) => {
          return { url: item.UP_ImagePath, id: item.UP_PKeyID }
        })
        setAllPosts(postImages)
      })

      .catch((error) => {
        console.log(error, "getPost")
      })
  })
 const itemValueInputChangeHandler = (text) => {
    setShowErrorMsg(null)
    setAddItemValue(text)
  }
const getUserCollectionItems = useCallback(async () => {
    setIsLoading(true)
    const data = JSON.stringify({
      Type: 3
    })
    await getUserCollection(data, token)
      .then((res) => {
        setIsLoading(false)
        const fetchedUserCollection = res
        // console.log(res, token, "ProfileScreen getUserCollection")
        const collectionItems = fetchedUserCollection?.map((item) => {
          return { label: item.UC_Name, value: item.UC_PKeyID }
        })
        collectionItems?.push({ label: "Add +", value: -1 })
        setUserCollections(collectionItems.reverse())
       
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error, "getUserCollection")
      })
  })

const addToUserCollection = (itemName) => {
    if (validation()) {
      const data = JSON.stringify({
        UC_Name: itemName,
        Type: 1
      })
      console.log(data, "AddUserData")
      if (addItemValue.trim() != "") {
        addUserCollection(data, token)
          .then((res) => {
            console.log(res.data, "response is here")
            setShowModal(false)
            const newCollection = { label: itemName, value: res.data[0] }
            console.log(newCollection)
            getUserCollectionItems()
            // let oldUserCollections = userCollections
            // oldUserCollections.pop()
            // const newUserCollections = oldUserCollections.concat(
            //   newCollection,
            //   {
            //     label: "Add +",
            //     value: -1
            //   }
            // )
            // setUserCollections([...newUserCollections])
            // dispatch(addUserCollectionItem({label: value, id: res.data[0]}));
            setAddItemValue("")
          })
          .catch((err) => {
            setShowModal(false)
            console.log(err)
            setAddItemValue("")
          })
      }
    }
  }
 const onChangeHandler = (item) => {
    setValue(item.value)
    setIsFocus(false)
    if (item.value === -1) {
      setShowModal(true)
    }
  }
const renderModal= () =>{
return(
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
      </Modal>
)}
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
        <SpinnerBackdrop showModal={isLoading} />

      <Image
        style={{width: 350, height: 100,marginTop:10}}
        resizeMode="cover"
        source={require('../../assets/users/fashINLogoLIght.png')}
        alt="logo"
      />
     
<View>
 <Text style={{ alignSelf: "center", color: "#264653", fontSize: 25,marginVertical:10 }}>
        My Closet
      </Text>
</View>
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
        search
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "My Collection" : "My Collection"}
        searchPlaceholder="Search..."
        value={value ? value : value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => getAllUserPost(item)}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
      {!!selectedItem.value ? (
        <ProfileImages allImages={allPosts} />
      ) : (
        <Text style={{ color: "black", fontSize: 15 }}>
          Please select a collection from dropdown!
        </Text>
      )}
    {renderModal()}
    </SafeAreaView>
  )
}

export default ClosetScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CDAF90",
    width: "86%",
    margin: 16,
    borderRadius: 8,
    color: "#593714"
  },
  dropdown: {
    height: 50,
    borderColor: "#D7C7B6",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#EBD4BD",
    width:"80%"
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
