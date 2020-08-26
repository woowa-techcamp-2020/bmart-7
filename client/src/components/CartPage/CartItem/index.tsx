import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { CartItem as CartItemType } from '@/types'
import { IoIosCheckbox } from 'react-icons/io'
import { Price } from './Price'
import { Count } from './Count'
import { RemoveButton } from './RemoveButton'

const imageBaseUrl = process.env.REACT_APP_S3_URL

export const CartItem: React.FC<CartItemType> = (props) => {
  const { id, product } = props
  const imageUrl = imageBaseUrl + product.mainImage

  return (
    <div className="cart-item">
      <h3 className="item-title">{product.title}</h3>
      <div className="product-wrapper">
        <div className="checkbox-row">
          <div className="title-wrapper">
            <label htmlFor={`cart-${id}`}>
              <IoIosCheckbox className="checkbox-icon checked" />
              <input type="checkbox" id={`cart-${id}`} className="dp-none" />
            </label>
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
