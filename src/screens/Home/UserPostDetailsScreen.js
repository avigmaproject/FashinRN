import React from 'react'
import { View, Text, ScrollView, Image ,SafeAreaView,Linking} from 'react-native'
import UserCard from '../../components/UserCard'
import Button from '../../components/UI/Button'
const UserPostDetailsScreen = (props,{navigation}) => {
  console.log("UserPostDetailsScreen",props.route.params)
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#593714' }}>
      <ScrollView
        contentContainerStyle={{
          alignSelf: 'center',
          marginTop: 5,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <View style={{ width: 340, alignSelf: 'center', borderRadius: 10 ,marginTop:10}}>
          <Image
            style={{
              width: 340,
              height: 380,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
            source={{ uri: props.route.params.imageUri }}
          />
          <View
            style={{
              backgroundColor: 'white',
              width: 340,
              height: 60,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'black', fontSize: 20,textTransform:"capitalize" }}> {props.route.params.description}</Text>
          </View>
        </View>
        {/* <View
          style={{
            marginTop: 20,
            backgroundColor: '#EBD4BD',
            minHeight: 60,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'black', fontSize: 15 }}>
            {props.route.params.productUrl}
          </Text>
        </View> */}

{props.route.params.productUrl &&(<View>
          <Button
          onPress={()=>OpenURLButton(props.route.params.productUrl )}
            text='Go to product'
            textColor='black'
            backgroundColor='white'
            style={{ width: 340, marginTop: 20, marginBottom: 150, height: 60 }}
          />
        </View>)}
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserPostDetailsScreen
