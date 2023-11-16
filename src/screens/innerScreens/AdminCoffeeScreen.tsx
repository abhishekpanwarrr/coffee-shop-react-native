import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE, SPACING } from '../../theme/theme'
import axios from 'axios'
import CoffeeCard from '../../components/CoffeeCard'

const AdminCoffeeScreen = ({ navigation }: any) => {
  const [coffeeList, setCoffeeList] = useState([])
  useEffect(() => {
    const getAllCoffee = async () => {
      try {
        const { data } = await axios.get("http://localhost:9000/api/coffee/all")
        setCoffeeList(data)
      } catch (error) {
        setCoffeeList([])
      }
    }
    getAllCoffee()
  }, [])
  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView style={styles.FormBox}>
        <Text style={{
          textAlign: "center",
          fontSize: FONTSIZE.size_24,
          color: COLORS.primaryWhiteHex,
          marginBottom: SPACING.space_10
        }}>List of all Coffee</Text>
        <TouchableOpacity style={styles.CloseButton} onPress={() => navigation.navigate("Home")}><Text style={styles.CloseButtonText}>X</Text></TouchableOpacity>
        {coffeeList.length > 0 ? coffeeList.map((coffee: any) => (
          <View key={coffee._id} style={{
            marginVertical: SPACING.space_15,
            flexDirection: 'row',
            gap: SPACING.space_12
          }}>
            <Image source={{ uri: coffee.imagelink_square }} width={100} height={100} borderRadius={20} />
            <View style={{ flexDirection: "column", gap: SPACING.space_4, flex: 1 }}>
              <Text style={{ color: COLORS.secondaryLightGreyHex, fontSize: FONTSIZE.size_18 }}>{coffee.name}</Text>

              <Text
                style={{
                  color: COLORS.primaryLightGreyHex,
                  fontSize: FONTSIZE.size_16,
                }}
                numberOfLines={4}
                ellipsizeMode="tail">
                {coffee.description}
              </Text>
            </View>
          </View>
        )) : <Text style={{
          textAlign: "center",
          fontSize: FONTSIZE.size_24,
          color: COLORS.primaryWhiteHex,
          marginVertical: SPACING.space_15
        }}>No coffee found</Text>}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AdminCoffeeScreen

const styles = StyleSheet.create({
  CloseButtonText: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
    fontWeight: "700"
  },
  CloseButton: {
    position: "absolute",
    top: 10,
    right: 10
  },
  Container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: SPACING.space_10
  },
  FormBox: {
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_24
  },
})