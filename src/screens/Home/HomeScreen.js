import React, { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"
import Logout from "../../components/Logout"
import {
  getUserCollection,
} from "../../services/api.fuctions"
import CollectionItem from "../../components/UI/CollectionItem"
import { listToMatrix } from "../../shared/collectionColors"
import { BubblesLoader } from "react-native-indicator"
import { useFocusEffect } from "@react-navigation/native";
import {basecolor,secondrycolor,creamcolor,creamcolor1,black,creamcolor2} from "../../services/constant"
import {CollectionSelect} from '../../store/actions/authActions';

const HomeScreen = (props) => {
  const [userCollections, setUserCollections] = useState([])
  const [searchtext, setsearchtext] = useState(null)
  const [initaldata, setinitaldata] = useState([])
  const [filterdata, setfilterdata] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.userToken)
  const getUserCollectionItems = useCallback(async () => {
    setIsLoading(true)
    const data = {
      Type: 3
    }
    await getUserCollection(data, token)
      .then((res) => {
        setIsLoading(false)
        const fetchedUserCollection = res
        const collectionItems = fetchedUserCollection?.map((item) => {
          return { label: item.UC_Name, value: item.UC_PKeyID }
        })
        setUserCollections(collectionItems)
        setinitaldata(collectionItems)
        setfilterdata(collectionItems)
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
    console.log(userCollections)
    let filteredName = trucks.filter((item) => {
      return item.label.toLowerCase().match(text)
    })
    console.log("filteredName",filteredName)
    if (!text || text === '') {
    setUserCollections(inital)
    } else if (Array.isArray(filteredName)) {
          setUserCollections(filteredName)
    }
  }
  useEffect(() => {
    getUserCollectionItems()
  }, [])
useFocusEffect(
    React.useCallback(() => {
    getUserCollectionItems()
    }, [])
  );
  const onCollectionItemPressHandler = (item) => {
  dispatch(CollectionSelect(item));

      props.navigation.navigate("UserPostsScreen", {
        collectionItem: item,
        home:true
      })
    
  }
  const mapCollectionsToColors = (userCollections) => {
    if (userCollections.length > 0) {
      let colors = [creamcolor1, creamcolor2, basecolor]
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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{width: 350, height: 100,marginTop:10}}
        resizeMode="cover"
        source={require('../../assets/users/fashINLogoLIght.png')}
      />
      <View style={styles.sectionStyle}>
        <TextInput
          style={{
            flex: 1,
            color:secondrycolor,
            backgroundColor: creamcolor,
            height: 50,
            borderRadius: 10,
            margin: 10,
          }}
          selectionColor={secondrycolor}
          placeholder="Search Here"
          placeholderTextColor={secondrycolor}
          underlineColorAndroid="transparent"
          onChangeText={(search)=>searchText(search)}
          value={searchtext}
        />
        <View style={{ backgroundColor: creamcolor, marginRight: 10 }}>
          <Ionicons name="search" size={25} color={basecolor} />
        </View>
      </View>
      <Text style={{ color: {basecolor}, fontSize: 22, marginVertical: 10 }}>
        Collections
      </Text>

      <ScrollView
        keyboardShouldPersistTaps={"always"}
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
          {!isLoading && userCollections ? (
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
              <BubblesLoader size={50} color={basecolor} dotRadius={10} />
            </View>
          )}
          {!isLoading && ( <Logout />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: creamcolor,
    borderColor: black,
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
