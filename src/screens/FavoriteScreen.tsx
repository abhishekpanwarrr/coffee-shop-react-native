import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import CartItem from '../components/CartItem'
import FavoritesItemCard from '../components/FavoritesItemCard'

const FavoriteScreen = ({ navigation, route }: any) => {
  const FavoritesList = useStore((state: any) => state.FavoritesList)
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  const tabBarHeight = useBottomTabBarHeight()
  console.log("FavoritesList", FavoritesList);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Favourit List' />
            {FavoritesList.length == 0 ? <EmptyListAnimation title='No favourites' /> : <View style={styles.ListItemContainer}>
              {FavoritesList.map((data: any) => (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => {
                    navigation.push('Details', {
                      index: data.index,
                      id: data.id,
                      type: data.type,
                    });
                  }}
                >
                  <FavoritesItemCard
                    id={data.id}
                    name={data.name}
                    imagelink_portrait={data.imagelink_portrait}
                    type={data.type}
                    average_rating={data.average_rating}
                    ingredients={data.ingredients}
                    ratings_count={data.ratings_count}
                    roasted={data.roasted}
                    description={data.description}
                    favourite={data.favourite}
                    ToggleFavouriteItem={ToggleFavourite}
                  />
                </TouchableOpacity>
              ))}
            </View>}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20
  },
  ItemContainer: { flex: 1 },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
})