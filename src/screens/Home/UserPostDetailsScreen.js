import React from 'react'
import { View, Image ,Linking} from 'react-native'
import Button from '../../components/UI/Button'
import {BubblesLoader} from 'react-native-indicator';


const UserPostDetailsScreen = (props) => {
const [isLoading, setisLoading] = React.useState(false)
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title:props.route.params.name.toUpperCase(),
    });
  }, []);
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
    <View style={{ flex: 1, backgroundColor: '#593714' }}>
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
      </View>
  )
}

export default UserPostDetailsScreen
