import { ImageBackground, ImageProps, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import ImageBackgroundInfo from './ImageBackgroundInfo'

interface FavoritesItemCardProps {
  id: string
  name: string
  type: string
  average_rating: number
  imagelink_portrait: ImageProps
  ingredients: string
  ratings_count: string
  roasted: string
  description: string
  favourite: boolean
  ToggleFavouriteItem: any
}
const FavoritesItemCard: FC<FavoritesItemCardProps> = ({
  id,
  name,
  type,
  average_rating,
  imagelink_portrait,
  ingredients,
  ratings_count,
  roasted,
  description,
  favourite,
  ToggleFavouriteItem
}) => {
  return (
    <View style={styles.CardContainer}>
      <ImageBackgroundInfo
        EnableBackHandler={false}
        imagelink_portrait={imagelink_portrait}
        type={type}
        id={id}
        favourite={favourite}
        name={name}
        special_ingredient={ingredients}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        //  BackHandler={BackHandler}
        ToggleFavourite={ToggleFavouriteItem}

      />
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.ContainerLinearGradient}
      >
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  )
}

export default FavoritesItemCard

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden'
  },
  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  },
  ContainerLinearGradient: {
    gap: SPACING.space_10,
    padding: SPACING.space_20
  }
})