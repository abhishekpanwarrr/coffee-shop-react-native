import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../theme/theme'

const PaymentList = [
  {
    name:'Wallet',
    icon:'icon',
    isIcon:true,
  },
  {
    name:'Google pay',
    icon:require("../assets/app_images/gpay.png"),
    isIcon:false,
  },
  {
    name:'Google pay',
    icon:require("../assets/app_images/applepay.png"),
    isIcon:false,
  },
  {
    name:'Amazon pay',
    icon:require("../assets/app_images/amazonpay.png"),
    isIcon:false,
  },
]

const PaymentScreen = () => {
  const [paymentMode,setPaymentMode] = useState("Credit card")

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}
      >

      </ScrollView>
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex
  },
  ScrollViewFlex:{},
})