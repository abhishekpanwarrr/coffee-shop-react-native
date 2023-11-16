import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

interface PaymentFooterProps {
    price?: string
    buttonTitle: string
    buttonPressHandler: any
}

const PaymentFooter: FC<PaymentFooterProps> = ({
    buttonPressHandler, price, buttonTitle
}) => {
    return (
        <View style={styles.PriceFooter}>
            <View style={styles.PriceContainer}>
                <Text style={styles.PriceTitle}>Price </Text>
                <Text style={styles.PriceText}>₹ <Text style={styles.Price}>
                    {price}
                
                    </Text></Text>
            </View>
            <TouchableOpacity style={styles.PayButton} onPress={() => buttonPressHandler()}>
                <Text style={styles.ButtonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PaymentFooter

const styles = StyleSheet.create({
    PriceFooter: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_20,
        padding: SPACING.space_20
    },
    PriceContainer: {
        alignItems: 'center',
        width: 100,
    },
    PriceTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.secondaryLightGreyHex
    },
    PriceText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryOrangeHex
    },
    Price: {
        color: COLORS.primaryWhiteHex
    },
    PayButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        height: SPACING.space_36 * 2,
        borderRadius: BORDERRADIUS.radius_25
    },
    ButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    }
})