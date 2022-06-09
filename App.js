/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { View, StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NativeBaseProvider, Box } from 'native-base'
import AppLogo from './src/components/AppLogo'
import AuthNavigation from './src/navigation/LoginNavigator'
import MyTabs from './src/navigation/BottomTabNavigator'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import reduxStore from './src/store/configureStore'
import { useSelector } from 'react-redux'
import { Text, SafeAreaView } from 'react-native'
import Logout from './src/components/Logout'
import { NavigationContainer } from '@react-navigation/native'

const { store, persistor } = reduxStore()

const App = () => {
  let isSignOut = useSelector((state) => state.auth.isSignout)
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
      {/* <SafeAreaView> */}
        <NativeBaseProvider>
          <StatusBar animated={true} backgroundColor='#593714' />
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#fff',
              alignItems: 'center'
            }}
          >
            {isSignOut &&<SafeAreaView><AppLogo /></SafeAreaView>}
          </View>

          {!isSignOut ? <MyTabs /> : <AuthNavigation />}
          {/* <AuthNavigation /> */}
        </NativeBaseProvider>
      {/* </SafeAreaView> */}
    </NavigationContainer>
  )
}

const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

export default AppWrapper
