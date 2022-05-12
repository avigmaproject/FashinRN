import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import UserCard from '../../components/UserCard'
import Button from '../../components/UI/Button'
const UserPostDetailsScreen = (props) => {
  console.log(props.route)
  return (
    <View style={{ flex: 1, backgroundColor: '#593714' }}>
      <View>
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontSize: 20,
            marginVertical: 15
          }}
        >
          Title Heading
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          alignSelf: 'center',
          marginTop: 5,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <View style={{ width: 340, alignSelf: 'center', borderRadius: 10 }}>
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
            <Text style={{ color: 'black', fontSize: 20 }}>Name is here</Text>
          </View>
        </View>
        <View
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
        </View>
        <View>
          <Button
            text='Go to product'
            textColor='black'
            backgroundColor='white'
            style={{ width: 340, marginTop: 20, marginBottom: 150, height: 60 }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default UserPostDetailsScreen
