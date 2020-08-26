import React, { useContext } from 'react'
import { RouteProps } from 'react-router'
import { Header, Divider } from '@/components/common'
import { StoreContext } from '@/store'
import { CartList } from '@/components/CartPage/CartList'
import { CartSummary } from '@/components/CartPage/CartSummary'

export const CartPage: React.FC<RouteProps> = ({ history }) => {
  const { cartItems } = useContext(StoreContext)
  const totalPrice = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.product.salePrice * item.count,
    0
  )

  return (
    <div id="cart-page">
      <Header title={<h1>장바구니</h1>} isShowSearch={false} isShowMenu={false} history={history} />
      <Divider />
      <CartList cartItems={cartItems} />
      <Divider />
      <CartSummary totalPrice={totalPrice} />
    </div>
  )
}
