import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { CartItem } from '../CartItem'
import { FiPlus } from 'react-icons/fi'
import { CartItemsContext } from '@/pages/CartPage'

export const CartList: React.FC = () => {
  const cartItems = useContext(CartItemsContext)

  return (
    <div className="cart-list">
      <div className="cart-item-container">
        {cartItems.map((cartItem) => (
          <CartItem {...cartItem} key={cartItem.id} />
        ))}
      </div>
      <Link to="/" className="main-link">
        <FiPlus className="plus-btn" /> 더 담으러 가기
      </Link>
    </div>
  )
}
