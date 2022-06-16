import React from 'react'
import { View, Image ,Linking,TouchableOpacity,Text} from 'react-native'
import Button from '../../components/UI/Button'
import {BubblesLoader} from 'react-native-indicator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import {creamcolor} from "../../services/constant"
import { useFocusEffect } from "@react-navigation/native";

const UserPostDetailsScreen = (props) => {
const [isLoading, setisLoading] = React.useState(false)
const [screenname, setscreenname] = React.useState("Home")
const [stackname, setstackname] = React.useState("HomeStack")
const [title, settitle] = React.useState(props.route.params.name.toUpperCase())

useFocusEffect(
    React.useCallback(() => {
      console.log("before====>",props.route.params.screenname)
     setscreenname(props.route.params.screenname)
    setstackname(props.route.params.stackname)
      console.log("after===>",props.route.params.screenname)

    })
  );
const OpenURLButton = async( url ) => {
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
        <View style= {{ flexDirection:"row",height:30,justifyContent:"center",alignItems:"center",marginBottom:20}}>
    <View style={{width:"20%"}}>
  <TouchableOpacity onPress={()=>props.navigation.navigate(stackname,
    { screen :screenname })}
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
    <View style={{width:"70%",paddingLeft:"10%"}}><Text style={{color:"#fff",fontSize:20,fontWeight:"bold"}}>{title}</Text></View>

        </View>
        <View style={{ width:"100%",   height: 300,marginTop:10,justifyContent:"center",alignItems:"center"}}>
          {isLoading &&  <View style={{ position:"absolute",height: 300,width:"100%"}}>
          <View style={{ height: 300,width:"100%",justifyContent:"center",alignItems:"center"}}><BubblesLoader size={50} color={"rgb(89, 55, 20)"} dotRadius={10} /></View>
         </View> }
          {props.route.params.imageUri && ( 
            <Image
            resizeMode="stretch"
            onLoadStart={() =>_onLoadStart()}
            onLoadEnd={() => _onLoadEnd()}
            style={{
              width: "90%",
              height: "100%",
              borderRadius: 10 
            
            }}
            source={{ uri: props.route.params.imageUri }}
          />)}
         
        </View>
        {props.route.params.productUrl &&(<View>
          <Button
          onPress={()=>OpenURLButton(props.route.params.productUrl )}
            text='Go to product'
            textColor='black'
            backgroundColor='white'
            style={{  width: "90%",marginTop: 20, marginBottom: 150, height: 60 }}
          />
        </View>)}
      </SafeAreaView>
  )
}

export default UserPostDetailsScreen
