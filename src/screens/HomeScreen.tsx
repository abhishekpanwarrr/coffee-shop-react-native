import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcon from '../components/CustomIcon'

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
  const [categories, setCategories] = useState(getCategoriesFromData(coffeeList))
  const [searchText, setSearchText] = useState(" ")
  const [categoryIndex, setCategoryIndex] = useState({ index: 0, category: categories[0] })
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, coffeeList))

  const tabBarHeight = useBottomTabBarHeight()
  // console.log("sortedCoffee", sortedCoffee.length);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />
        <Text style={styles.ScreenTitle}>Find the best {'\n'} coffee for you</Text>
        {/* Search Input */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => { }}>
            <CustomIcon style={styles.InputIcon} name='search' size={FONTSIZE.size_18} color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          </TouchableOpacity>
          <TextInput placeholder='Search coffee' value={searchText} onChangeText={(e) => setSearchText(e)} placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer} />
        </View>

        {/* Category */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.CategoryScrollViewStyles}>
          {categories?.map((data, index) => (
            <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity onPress={() => {
                setCategoryIndex({ index: index, category: categories[index] })
                setSortedCoffee([...getCoffeeList(categories[index], coffeeList)])
              }} style={styles.CategoryScrollViewItem}>
                <Text style={[styles.CategoryText, categoryIndex.index === index ? { color: COLORS.primaryOrangeHex, } : {}]}>{data}</Text>
                {categoryIndex.index === index ? <View style={styles.ActiveCategory} /> : null}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffe flatlist */}
        

        {/* Beans FlatList */}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  CategoryScrollViewItem: {
    alignItems: "center"
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryOrangeHex
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1
  },
  ScreenTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    paddingLeft: SPACING.space_30
  },
  InputContainerComponent: {
    flexDirection: "row",
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 2.5,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  },
  CategoryScrollViewStyles: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20
  }
})