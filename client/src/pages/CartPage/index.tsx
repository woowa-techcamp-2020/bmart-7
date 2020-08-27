import React, { useContext, useState, createContext, useEffect } from 'react'
import { RouteProps } from 'react-router'
import { CartItem as CartItemType } from '@/types'
import { Header, Divider } from '@/components/common'
import { StoreContext } from '@/store'
import { CartList } from '@/components/CartPage/CartList'
import { CartSummary } from '@/components/CartPage/CartSummary'
import { EmptyCart } from '@/components/CartPage/EmptyCart'
import { CartSelectBar } from '@/components/CartPage/CartSelectBar'
import { OrderButton } from '@/components/CartPage/OrderButton'

export const CartItemsContext = createContext<CartItemType[]>(undefined)
export const SetCartItemsContext = createContext<
  React.Dispatch<React.SetStateAction<CartItemType[]>>
>(undefined)

export const CartPage: React.FC<RouteProps> = ({ history }) => {
  const store = useContext(StoreContext)

  const cartItemList = store.cartItems.map((cartItem) => {
    if (cartItem.isSelected === undefined) cartItem.isSelected = true
    return cartItem
  })

  const [cartItems, setCartItems] = useState<CartItemType[]>(cartItemList)

  const totalPrice = cartItems.reduce((totalPrice, item) => {
    if (item.isSelected) totalPrice += item.product.salePrice * item.count
    return totalPrice
  }, 0)

  return (
    <div id="cart-page">
      <CartItemsContext.Provider value={cartItems}>
        <SetCartItemsContext.Provider value={setCartItems}>
          <Header
            title={<h1>장바구니</h1>}
            isShowSearch={false}
            isShowMenu={false}
            history={history}
          />
          {cartItems.length ? (
            <>
              <CartSelectBar />
              <Divider />
              <CartList />
              <Divider />
              <CartSummary totalPrice={totalPrice} />
              <OrderButton totalPrice={totalPrice} />
            </>
          ) : (
            <EmptyCart />
          )}
        </SetCartItemsContext.Provider>
      </CartItemsContext.Provider>
    </div>
  )
}
