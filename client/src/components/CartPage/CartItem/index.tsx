import React, { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { CartItem as CartItemType } from '@/types'
import { IoIosCheckbox } from 'react-icons/io'
import { Price } from './Price'
import { Count } from './Count'
import { RemoveButton } from './RemoveButton'
import { SetCartItemsContext, CartItemsContext } from '@/pages/CartPage'

const imageBaseUrl = process.env.REACT_APP_S3_URL + 'product/'

export const CartItem: React.FC<CartItemType> = (props) => {
  const { id, product, isSelected } = props
  const cartItems = useContext(CartItemsContext)
  const setCartItems = useContext(SetCartItemsContext)

  const imageUrl = imageBaseUrl + product.mainImage

  const changeSelect = () => {
    const newCartItems = [...cartItems]
    const selectedIndex = newCartItems.findIndex((item) => item.id === id)
    newCartItems[selectedIndex].isSelected = !isSelected
    setCartItems(newCartItems)
  }

  return (
    <div className="cart-item">
      <h3 className="item-title">{product.title}</h3>
      <div className="product-wrapper">
        <div className="checkbox-row">
          <div className="title-wrapper">
            <IoIosCheckbox
              className={'checkbox-icon' + (isSelected ? ' checked' : '')}
              onClick={() => changeSelect()}
            />
            <h3 className="product-title">{product.title}</h3>
          </div>
          <RemoveButton id={id} />
        </div>
        <div className="info-row">
          <Link to="/" className="product-link">
            <img src={imageUrl} alt="product" className="product-img" />
          </Link>
          <div className="info-wrapper">
            <Price {...props} />
            <Count {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}
