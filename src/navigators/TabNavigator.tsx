import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BlurView } from '@react-native-community/blur'
import CustomIcon from '../components/CustomIcon'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import OrderHistory from '../screens/OrderHistory'
import { COLORS } from '../theme/theme'

const Tabs = createBottomTabNavigator()
const TabNavigator = () => {
    return (
        <Tabs.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarBackground: () => (
                <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles} />
            )
        }}>
            <Tabs.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name='home' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
            <Tabs.Screen name='Cart' component={CartScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name='cart' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
            <Tabs.Screen name='Favorite' component={FavoriteScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name='like' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
            <Tabs.Screen name='History' component={OrderHistory} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name='bell' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
        </Tabs.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: "absolute",
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: "transparent"
    },
    BlurViewStyles: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})