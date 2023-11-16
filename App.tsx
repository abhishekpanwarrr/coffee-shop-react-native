import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailsScreen from './src/screens/DetailsScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import TabNavigator from './src/navigators/TabNavigator'
import ProfileScreen from './src/screens/ProfileScreen'
import SignupScreen from './src/screens/SignupScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Tabs' component={TabNavigator} options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='Details' component={DetailsScreen} options={{ animation: "fade_from_bottom", headerShown: false }} />
        <Stack.Screen name='Payment' component={PaymentScreen} options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='Profile' component={ProfileScreen} options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='Signup' component={SignupScreen} options={{ animation: "fade_from_bottom" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App