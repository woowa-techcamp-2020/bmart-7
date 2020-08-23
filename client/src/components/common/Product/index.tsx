import React from 'react'
import './style.scss'
import { Product as ProductType } from '@/types'
import { HeartIcon } from './HeartIcon'
import { CartIcon } from './CartIcon'
import { Price } from './Price'

const imageBaseUrl = process.env.REACT_APP_S3_URL

export type ProductProps = {
  product: ProductType
}

export const Product: React.FC<ProductProps> = (props) => {
  const {
    product: { id, title, originPrice, salePrice, salePercent, amount, mainImage },
  } = props
  const priceProps = { originPrice, salePrice, salePercent }

  return (
    <li className="product">
      <div className="image-wrapper">
        <img src={imageBaseUrl + mainImage} alt="no image" />
        <div className="icon-container">
          <HeartIcon id={id} />
          {amount ? <CartIcon id={id} /> : null}
        </div>
        {amount ? null : (
          <div className="sold-out">
            <p className="message">다 팔렸어요</p>
          </div>
        )}
      </div>
      <div className="product-wrapper">
        <div className="info-wrapper">
          <h3 className="title">{title}</h3>
          <Price {...priceProps} />
        </div>
      </div>
    </li>
  )
}
