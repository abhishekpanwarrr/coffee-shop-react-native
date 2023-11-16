import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcon from './CustomIcon'
import BGIcon from './BGIcon'

interface CoffeeCardProps {
    name: string
    id?: string
    index?: number
    type: string
    roasted: string
    imagelink_square: ImageProps
    special_ingredient: string
    average_rating: string
    price: any
    size?: any
    buttonPressHandler: any
}
const CARD_WIDTH = Dimensions.get("window").width * 0.32;

const CoffeeCard: FC<CoffeeCardProps> = ({
    name,
    id,
    index,
    type,
    roasted,
    imagelink_square,
    special_ingredient,
    average_rating,
    price,
    size,
    buttonPressHandler
}) => {


    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradient}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        >
            <ImageBackground
                source={{
                    uri: String(imagelink_square)
                }}
                style={styles.CardImageBackground}
                resizeMode='cover'>
                <View style={styles.CardRatingContainer}>
                    <CustomIcon name='star' color={COLORS.primaryOrangeHex} size={FONTSIZE.size_16} />
                    <Text style={styles.CardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.CardTitle}>{name}</Text>
            <Text style={styles.CardSubTitle}>{special_ingredient}</Text>
            <View style={styles.CardFooterRow}>
                <Text style={styles.CardPriceCurrency}>
                    $ <Text style={styles.CardPrice}>{price && price[0]} / {size && size[0]}</Text>
                </Text>
                <TouchableOpacity onPress={() => buttonPressHandler({
                    id,
                    index,
                    type,
                    imagelink_square,
                    name,
                    special_ingredient,
                    prices: [{ ...price, quantity: 1 }],
                    roasted
                })}>
                    <BGIcon color={COLORS.primaryWhiteHex} name='add' size={FONTSIZE.size_8} BGColor={COLORS.primaryOrangeHex} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default CoffeeCard

const styles = StyleSheet.create({
    CardPrice: {
        color: COLORS.primaryWhiteHex,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },

    CardSubTitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardFooterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: SPACING.space_15
    },
    CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        lineHeight: 22,
    },
    CardRatingContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: "absolute",
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0
    },
    CardImageBackground: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: "hidden"
    },
    CardLinearGradient: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25
    }
})