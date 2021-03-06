import React from 'react'
import { View, Image ,Linking,TouchableOpacity,Text,Dimensions} from 'react-native'
import Button from '../../components/UI/Button'
import {BubblesLoader} from 'react-native-indicator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import {creamcolor} from "../../services/constant"
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"
import FastImage from 'react-native-fast-image';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserPostDetailsScreen = (props) => {
  const collection = useSelector((state) => state.auth.collection)

const token = useSelector((state) => state.auth.userToken)
const [isLoading, setisLoading] = React.useState(false)
const [screenname, setscreenname] = React.useState("Home")
const [stackname, setstackname] = React.useState("HomeStack")
const [title, settitle] = React.useState(props.route.params.name.toUpperCase())

useFocusEffect(
    React.useCallback(() => {
     setscreenname(props.route.params.screenname)
     setstackname(props.route.params.stackname)

    })
  );
const OpenURLButton = async( url ) => {
console.log(props.route.params.productUrl.startsWith("http"))
Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    alert("Check url")
    console.log('Can\'t handle url: ' + url);
  } else {
    return Linking.openURL(url);
  }
}).catch(err => console.error('An error occurred', err));
  }
const _onLoadEnd = () => {
   setisLoading(false)
  }
const _onLoadStart = () => {
setisLoading(true)
   
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#593714' }}>
        <View style= {{ flexDirection:"row",height:30,justifyContent:"center",alignItems:"center",marginBottom:20,}}>
    <View style={{position:"absolute",left :20}}>
      <TouchableOpacity onPress={()=>
        props.navigation.navigate(stackname,
        { screen :screenname },
        {label:title})}
          style={{
            width: 30,
            height: 30,
            backgroundColor:creamcolor,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent:"center"
          }}>
          <View>
            <FontAwesome
              name="angle-left"
              size={22}
              color={'#ffffff'}
            />
          </View>
        </TouchableOpacity>  
  </View>
    <View><Text style={{color:"#fff",fontSize:20,fontWeight:"bold"}}>{title}</Text></View>

        </View>
        <View style={{ width:"100%",   height: windowHeight -300,marginTop:10,justifyContent:"center",alignItems:"center"}}>
          {isLoading &&  <View style={{ position:"absolute",height: windowHeight -300,width:"100%"}}>
          <View style={{ height: windowHeight -300,width:"100%",justifyContent:"center",alignItems:"center"}}><BubblesLoader size={50} color={"rgb(89, 55, 20)"} dotRadius={10} /></View>
         </View> }
          {props.route.params.imageUri && ( 
              <FastImage
          onLoadStart={() =>_onLoadStart()}
          onLoadEnd={() => _onLoadEnd()}
          style={{
             width: "90%",
              height: "100%",
            margin: 10,
            borderRadius: 10
          }}
          source={{
          uri: props.route.params.imageUri,
          headers: {Authorization: token},
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.stretch}          
        />
)}
         
        </View>
        {props.route.params.productUrl &&   props.route.params.productUrl.startsWith("http")&& (<View>
          <Button
          onPress={()=>OpenURLButton(props.route.params.productUrl )}
            text='Go to Product'
            textColor='black'
            backgroundColor='white'
            style={{  width: "90%",marginTop: 20, marginBottom: 150, height: 60 }}
          />
        </View>)}
      </SafeAreaView>
  )
}

export default UserPostDetailsScreen
