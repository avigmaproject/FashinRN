import React, { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Toast } from "native-base"
import { RadioButton } from "react-native-paper"
import InputText from "../../components/UI/InputText"
import Ionicons from "react-native-vector-icons/Ionicons"
import Logout from "../../components/Logout"
import {
  getUserCollection,
  addUserCollection
} from "../../services/api.fuctions"
import CollectionItem from "../../components/UI/CollectionItem"
import Modal from "../../components/UI/Modal"
import Button from "../../components/UI/Button"
import { listToMatrix } from "../../shared/collectionColors"
import { setUserCollectionItems } from "../../store/actions/profileActions"
import { BubblesLoader } from "react-native-indicator"

const HomeScreen = (props) => {
  const [userCollections, setUserCollections] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [addItemValue, setAddItemValue] = useState("")
  const [audienceValue, setAudienceValue] = useState("public")
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorMsg, setShowErrorMsg] = useState(null)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.userToken)
  const authData = useSelector((state) => state.auth)
  // console.log(authData, 'AuthData is here');
  // console.log(token, 'token is here');

  const getUserCollectionItems = useCallback(async () => {
    setIsLoading(true)
    const data = JSON.stringify({
      Type: 3
    })
    await getUserCollection(data, token)
      .then((res) => {
        setIsLoading(false)
        const fetchedUserCollection = res
        console.log(res, token, "ProfileScreen getUserCollection")
        const collectionItems = fetchedUserCollection?.map((item) => {
          return { label: item.UC_Name, value: item.UC_PKeyID }
        })
        // collectionItems?.push({ label: "Add +", value: -1 })
        console.log("getUsercollectionItems")
        setUserCollections(collectionItems)
        dispatch(setUserCollectionItems(collectionItems))
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error, "getUserCollection")
      })
  })

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
    if (validation()) {
      const data = JSON.stringify({
        UC_PKeyID: 0,
        UC_Name: itemName,
        UP_Show: audienceValue === "public" ? true : false,
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
            let oldUserCollections = userCollections
            oldUserCollections.pop()
            const newUserCollections = oldUserCollections.concat(
              newCollection,
              {
                label: "Add +",
                value: -1
              }
            )
            setUserCollections([...newUserCollections])
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

  const itemValueInputChangeHandler = (text) => {
    setShowErrorMsg(null)
    setAddItemValue(text)
  }

  useEffect(() => {
    getUserCollectionItems()
  }, [])
  const onCollectionItemPressHandler = (item) => {
    console.log("presses234234")
    console.log(item)
    if (item.value === -1) {
      setShowModal(true)
    } else {
      props.navigation.navigate("UserPostsScreen", {
        collectionItem: item
      })
    }
  }

  const goToUserPosts = (collectionName) => {
    props.navigation.navigate("UserPostsScreen", {
      collectionItem: collectionName
    })
  }

  const mapCollectionsToColors = (userCollections) => {
    if (userCollections.length > 0) {
      let colors = ["#99795B", "#AB8560", "#593714"]
      var matrix = listToMatrix(userCollections, 3)
      let i = 0
      let allData
      const mappedData = matrix.map((array) => {
        if (i > 2) {
          i = 0
        }
        i++
        return array.map((item) => {
          return (
            <CollectionItem
              backgroundColor={colors[i - 1]}
              key={item.value}
              label={item.label}
              onPress={() => onCollectionItemPressHandler(item)}
            />
          )
        })
      })
      let flatArray = [].concat(...mappedData)
      return flatArray
    } else {
      return []
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: Platform.OS === "ios" ? 20 : 0
      }}
    >
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
            <Text style={{ color: "black", fontWeight: "bold" }}>
              Add Collection
            </Text>
          </View>
          <View style={{ alignSelf: "center", width: "90%" }}>
            <InputText
              style={{ marginBottom: 10, width: "100%" }}
              label="Add Collection"
              value={addItemValue}
              onChangeText={(text) => itemValueInputChangeHandler(text)}
              errorMsg={showErrorMsg}
            />
          </View>

          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                margin: 10
              }}
            >
              <Text style={{ color: "black" }}>Select Audience</Text>
            </View>
            <View
              style={{
                width: "90%",
                alignSelf: "center"
              }}
            >
              <RadioButton.Group
                onValueChange={(newValue) => setAudienceValue(newValue)}
                value={audienceValue}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <RadioButton color="#5B4025" value="followers" />
                  <Text style={{ color: "#5B4025", marginTop: 5 }}>
                    Followers
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    color: "red"
                  }}
                >
                  <RadioButton color="#5B4025" value="public" />
                  <Text style={{ color: "#5B4025", marginTop: 5 }}>Public</Text>
                </View>
              </RadioButton.Group>
            </View>
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
      <Text style={{ color: "#264653", fontSize: 22, marginVertical: 10 }}>
        Collections
      </Text>

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
          {!isLoading ? (
            mapCollectionsToColors(userCollections)
          ) : (
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
          )}
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Logout />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  }
})

export default HomeScreen
