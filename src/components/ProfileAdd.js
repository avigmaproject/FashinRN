import React from 'react';
import {View, Text, Image} from 'react-native';
const ProfileAdd = props => {
const [isLoading, setisLoading] = React.useState(false)
const _onLoadEnd = () => {
   setisLoading(false)
  }
const _onLoadStart = () => {
setisLoading(true)
   
  }
  return (
<>
    <View
      style={{
        // display: 'flex',
        flexDirection: 'row',
        width: '100%',
        // borderColor: '#D7C7B6',
        // borderWidth: 1,
        height: 70,
        // borderRadius: 8,
        alignItems: 'center',
        justifyContent: "center",
        // backgroundColor: '#593714',
      }}>
      <View
        style={{
          width: '20%',
          height: '100%',
          backgroundColor: '#593714',justifyContent:"center",alignItems:"center"
        }}>
          {/* {isLoading &&  <View style={{ position:"absolute",height: 300,width:"100%",zIndex:111}}>
          <View style={{ height: 300,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator color={"#593714"} /></View>
         </View> } */}
        <Image
            onLoadStart={() =>_onLoadStart()}
            onLoadEnd={() => _onLoadEnd()}
          style={{
            width: '80%',
            height: '80%',            
            borderRadius: 3,
          }}
          source={{uri :props.photo ?props.photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"}}
          alt="logo"
        />
       
      </View>
       <View style={{backgroundColor:"#AB8560", width: '70%',justifyContent:"center",alignItems:"center",
          height: '60%',}}><Text style={{alignSelf: 'center', color: '#D7C7B6',textTransform:"capitalize",fontSize:25}}>
          {props.name}
        </Text></View>
    </View>
    
</>
  );
};

export default ProfileAdd;
