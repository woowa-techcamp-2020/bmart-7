import React, { useContext } from 'react'
import './style.scss'
import { GrCart } from 'react-icons/gr'
import { StoreContext } from '@/store'
import { Link } from 'react-router-dom'

interface IProps {
  isLoading?: boolean
}
export const CartFloatButton: React.FC<IProps> = ({ isLoading }) => {
  const store = useContext(StoreContext)
  const allCartCount = store.cartItems.length

  const isHidden = isLoading ? 'display-none' : ''
  return (
    <Link to="/cart" className={`cart-float-button-wrapper ${isHidden}`}>
      <div className="cart-float-button">
        <div className="count-wrapper">
          <div className={'count' + (allCartCount ? '' : ' dp-none')}>{allCartCount}</div>
        </div>
        <GrCart className="icon" />
      </div>
      <div className="buffer"></div>
    </Link>
  )
}
