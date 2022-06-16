// In App.js in a new project

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddCollectionsSpotlightScreen from '../screens/Collections/AddCollectionsSpotlight';

const NewCollection = createNativeStackNavigator();

function NewCollectionStack() {
  return (
    <NewCollection.Navigator  screenOptions={{
        headerShown:false,
      }}>
      <NewCollection.Screen
        name="AddCollectionsSpotlight"
        component={AddCollectionsSpotlightScreen}
      />
    </NewCollection.Navigator>
  );
}

export default NewCollectionStack;
