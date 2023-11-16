import { StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BlurView } from '@react-native-community/blur'
import CustomIcon from '../components/CustomIcon'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import OrderHistory from '../screens/OrderHistory'
import { COLORS } from '../theme/theme'
import AdminCoffeeScreen from './innerScreens/AdminCoffeeScreen'
import AdminBeanScreen from './innerScreens/AdminBeanScreen'
import AdminCreateCoffeeScreen from './innerScreens/AdminCreateCoffeeScreen'

const Tabs = createBottomTabNavigator()
const width = Dimensions.get("window").width
const AdminDashboardScreen = () => {
    return (
        <Tabs.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            // tabBarBackground: () => (
            //     <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles} />
            // )
            
        }}>
            <Tabs.Screen name='Coffee' component={AdminCoffeeScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name='home' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
            <Tabs.Screen name='Beans' component={AdminBeanScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name='cart' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
            <Tabs.Screen name='Create New' component={AdminCreateCoffeeScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name='like' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
        </Tabs.Navigator>
    )
}

export default AdminDashboardScreen

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: "transparent",
        width,


    }
})