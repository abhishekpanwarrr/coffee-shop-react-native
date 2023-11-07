import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1
    } else {
      temp[data[i].name]++
    }
  }
  let categories = Object.keys(temp)
  categories.unshift("All")
  return categories

}

const getCoffeeList = (category: string, data: any) => {
  if (category === "All") {
    return data
  } else {
    let coffeelist = data.filter((item: any) => item.name === category)
    return coffeelist
  }
}
const HomeScreen = () => {
  const coffeeList = useStore((state: any) => state.CoffeeList)
  // console.log("🚀 ~ file: HomeScreen.tsx:6 ~ HomeScreen ~ coffeeList:", coffeeList)
  const [categories, setCategories] = useState(getCategoriesFromData(coffeeList))
  const [searchText, setSearchText] = useState(undefined)
  const [categoryIndex, setCategoryIndex] = useState({ index: 0, category: categories[0] })
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, coffeeList))

  const tabBarHeight = useBottomTabBarHeight()

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
      {/* App Header */}
      <HeaderBar />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1
  }
})