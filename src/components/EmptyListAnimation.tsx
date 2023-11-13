import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import LottieView from 'lottie-react-native'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
interface EmptyListAnimationProps{
    title:string
}

const EmptyListAnimation:FC<EmptyListAnimationProps> = ({title}) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView 
      style={styles.LottieStyle}
      source={require("../lottie/coffeecup.json")}
      autoPlay
      loop
      />
      <Text style={styles.LotteeText}>{title || ""}</Text>
    </View>
  )
}

export default EmptyListAnimation

const styles = StyleSheet.create({
    LottieStyle:{
        height:300,
    },
    EmptyCartContainer:{
        flex:1,
        justifyContent:'center',
    },
    LotteeText:{
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_16,
        color:COLORS.primaryOrangeHex,
        textAlign:'center'
    }
})