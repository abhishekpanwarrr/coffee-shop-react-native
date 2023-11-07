import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
const HomeScreen = () => {
  const coffeeList = useStore((state: any) => state.CoffeeList)
  console.log("🚀 ~ file: HomeScreen.tsx:6 ~ HomeScreen ~ coffeeList:", coffeeList)
  const [categories, setCategories] = useState([undefined])
  const [searchText, setSearchText] = useState(undefined)
  const [categoryIndex, setCategoryIndex] = useState({ index: 0, category: categories[0] })
  const [sortedCoffee, setSortedCoffee] = useState(undefined)

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})