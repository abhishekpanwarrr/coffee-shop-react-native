import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import { ScrollView } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PaymentFooter from '../components/PaymentFooter'
import CartItem from '../components/CartItem'

const CartScreen = ({ navigation, route }: any) => {
  const cartList = useStore((state: any) => state.CartList)
  const cartPrice = useStore((state: any) => state.CartPrice)
  const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity)
  const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity)
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)

  const tabBarHeight = useBottomTabBarHeight()
  // console.log("cartList", cartList);

  const buttonPressHandler = () => {
    navigation.push("Payment")
  }

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Cart' />
            {cartList.length == 0 ? <EmptyListAnimation title='Cart is empty' /> : <View style={styles.ListItemContainer}>
              {cartList.map((data: any) => (
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
                  <CartItem
                    id={data.id}
                    name={data.name}
                    imagelink_square={data.imagelink_square}
                    special_ingredient={data.special_ingredient}
                    roasted={data.roasted}
                    prices={data.prices}
                    type={data.type}
                    incrementCartItemQuantityHandler={
                      incrementCartItemQuantityHandler
                    }
                    decrementCartItemQuantityHandler={
                      decrementCartItemQuantityHandler
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>}
          </View>
          {
            cartList.length != 0 ? (<PaymentFooter buttonPressHandler={buttonPressHandler}
              buttonTitle='Pay'
              price={{ price: cartPrice, currency: "$" }} />) : (<></>)
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default CartScreen

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