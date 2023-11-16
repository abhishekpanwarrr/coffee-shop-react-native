import { Dimensions, FlatList, ImageProps, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CoffeeCard from '../components/CoffeeCard'
interface Coffee {
  id?: string
  name: string
  description: string
  roasted: string
  imagelink_square: ImageProps
  imagelink_portrait: ImageProps
  ingredients: string
  special_ingredient: string
  size: []
  price: []
  average_rating: string
  ratings_count: string
  favourite: boolean
  type: string
}
interface Beans {
  id?: string
  name: string
  description: string
  roasted: string
  imagelink_square: ImageProps
  imagelink_portrait: ImageProps
  ingredients: string
  special_ingredient: string
  price: []
  size: []
  average_rating: string
  ratings_count: string
  favourite: boolean
  type: string
}
const HomeScreen = ({ navigation }: any) => {
  const [beansList, setBeansList] = useState<Array<Beans>>([])
  const [coffeeList, setCoffeeList] = useState<Array<Beans>>([])
  const tabBarHeight = useBottomTabBarHeight()

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:9000/api/coffee/all", {
        method: "GET"
      })
      const data = await response.json()
      setCoffeeList(data)
    })()
  }, [])
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />
        <Text style={styles.ScreenTitle}>Find the best {'\n'} coffee for you</Text>
        {/* Search Input */}
        {/* <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => {
            searchCoffee(searchText)
          }}>
            <CustomIcon style={styles.InputIcon} name='search' size={FONTSIZE.size_18} color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          </TouchableOpacity>
          <TextInput placeholder='Search coffee' value={searchText} onChangeText={(e) => setSearchText(e)} placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer} />
          {searchText.length > 0 ? <TouchableOpacity onPress={() => resetSearchCoffee()}>
            <CustomIcon style={styles.InputIcon} name='close' size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex} />
          </TouchableOpacity> : null}
        </View> */}

        {/* Category */}
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.CategoryScrollViewStyles}>
          {categories?.map((data, index) => (
            <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity onPress={() => {
                ListRef?.current?.scrollToOffset({
                  animated: true,
                  offset: 0
                })
                setCategoryIndex({ index: index, category: categories[index] })
                setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)])
              }} style={styles.CategoryScrollViewItem}>
                <Text style={[styles.CategoryText, categoryIndex.index === index ? { color: COLORS.primaryOrangeHex, } : {}]}>{data}</Text>
                {categoryIndex.index === index ? <View style={styles.ActiveCategory} /> : null}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView> */}

        {/* Coffe flatlist */}
        <FlatList
          ListEmptyComponent={<View style={styles.EmptyListContainer}>
            <Text style={styles.CategoryText}>No coffee found!</Text>
          </View>}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={coffeeList}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => { navigation.push('Details', { item }) }}>
              <CoffeeCard
                name={item.name}
                id={item.id}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.price}
                size={item.size}
                buttonPressHandler={() => { }} />
            </TouchableOpacity>
          }}
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

        {/* Beans FlatList */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={coffeeList}
          contentContainerStyle={[styles.FlatListContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => { navigation.push('Details', { item }) }}>
              <CoffeeCard
                name={item.name}
                id={item.id}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.price}
                size={item.size}
                buttonPressHandler={() => { }} />
            </TouchableOpacity>
          }}
        />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  EmptyListContainer: {
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: "center",
    paddingVertical: SPACING.space_36
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    color: COLORS.secondaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_medium
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30
  },
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