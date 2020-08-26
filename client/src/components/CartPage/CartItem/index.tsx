import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { CartItem as CartItemType } from '@/types'
import { formatPrice } from '@/utils'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { IoIosCheckbox } from 'react-icons/io'

const imageBaseUrl = process.env.REACT_APP_S3_URL

export const CartItem: React.FC<CartItemType> = (props) => {
  const { id, count, product } = props
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
          <div className="remove-btn">삭제</div>
        </div>
        <div className="info-row">
          <Link to="/" className="product-link">
            <img src={imageUrl} alt="product" className="product-img" />
          </Link>
          <div className="info-wrapper">
            <div className="price-wrapper">
              <div className="origin-price">({formatPrice(product.originPrice)})원</div>
              <div className="sale-wrapper">
                {product.salePercent ? (
                  <div className="origin-total-price">
                    {formatPrice(product.originPrice * count)}원
                  </div>
                ) : null}
                <div className="sale-price">{formatPrice(product.salePrice * count)}원</div>
              </div>
            </div>
            <div className="count-wrapper">
              <FiMinus className="minus-btn count-btn" />
              <div className="count">{count}</div>
              <FiPlus className="plus-btn count-btn active" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
