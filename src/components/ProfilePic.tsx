import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'

const ProfilePic = () => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.ImageContainer} onPress={() => navigation.push('Profile')}>
            <Image source={require("../assets/app_images/avatar.png")} style={styles.Image} />
        </TouchableOpacity>
    )
}

export default ProfilePic

const styles = StyleSheet.create({
    ImageContainer: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        borderRadius: SPACING.space_12,
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    Image: {
        height: SPACING.space_36,
        width: SPACING.space_36,
    }
})