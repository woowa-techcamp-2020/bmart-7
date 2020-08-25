import React, { useContext } from 'react'
import './style.scss'
import { GrCart } from 'react-icons/gr'
import { StoreContext } from '@/store'

export const CartFloatButton: React.FC = () => {
  const store = useContext(StoreContext)
  const allCartCount = store.cartItems.length

  return (
    <div className="cart-float-button">
      <div className="count-wrapper">
        <div className={'count' + (allCartCount ? '' : ' dp-none')}>{allCartCount}</div>
      </div>
      <GrCart className="icon" />
    </div>
  )
}
