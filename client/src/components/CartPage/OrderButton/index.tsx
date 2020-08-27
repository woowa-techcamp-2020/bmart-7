import React, { useContext } from 'react'
import './style.scss'
import { formatPrice } from '@/utils'
import { CartItemsContext, SetCartItemsContext } from '@/pages/CartPage'

type OrderButtonType = {
  totalPrice: number
}

export const OrderButton: React.FC<OrderButtonType> = ({ totalPrice }) => {
  const cartItems = useContext(CartItemsContext)
  const setCartItems = useContext(SetCartItemsContext)
  const count = cartItems.filter((item) => item.isSelected).length

  const orderItems = () => {
    alert('준비중인 기능입니다.')
  }

  return (
    <div className="order-button-wrapper">
      <div className="order-button" onClick={() => orderItems()}>
        <div className="count">{count}</div>
        <div className="text">{formatPrice(totalPrice)}원 배달 주문하기</div>
      </div>
      <div className="buffer"></div>
    </div>
  )
}
